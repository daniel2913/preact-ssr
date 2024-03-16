import fs from 'node:fs/promises'
import Fastify, { FastifyReply } from "fastify"
import * as React from "preact"
import * as http from "node:http"
import path, { resolve } from 'node:path'
import { createServer, createViteRuntime } from "vite"
import { Serializable } from 'node:child_process'
import { prerender } from 'preact-iso'
import fastify from 'fastify'


const isProduction = process.env.NODE_ENV === 'production'

const server = Fastify()

const base = process.env.BASE || '/'
// await server.register(FastifyVite, {
//   root: import.meta.url,
// 	dev:true,
// 	clientModule:resolve("/users/user/desktop/personal/vite-project/client/index.ts"),
// 	renderer
// })


// await server.vite.ready()


const ssrManifest = isProduction
	? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
	: undefined

const vite = await createServer({
	server: { middlewareMode: true },
	appType: "custom",
	base:process.env.BASE || "/	"
})


const __dirname = path.resolve(path.dirname(""))

export async function router(pathname: string) {
	let cur = path.resolve(__dirname, "./src/routes", pathname.slice(1))
	const page = path.resolve(cur, "page.tsx")
	const paths: string[] = []
	while (path.basename(cur) !== "src") {
		paths.push(cur)
		cur = path.resolve(cur, "../")
	}
	const layouts = (await Promise.all(paths.map(curpath =>
		fs.readdir(curpath)
			.then(names =>
				names.filter(name => name.match(/layout\.tsx/))
					.map(name => path.resolve(curpath, name))[0]
			)

	))).filter(Boolean)
	layouts.unshift(page)
	return layouts as string[]
}

async function LoadPaths(paths: string[]): Promise<LayoutProps[]> {
	const modules = await Promise.all(paths.map(layout => vite.ssrLoadModule(layout)))
	return modules.filter(Boolean).map(module => ({ component: module.default, getServerSideProps: module.getServerSideProps }))
}

type LayoutProps = {
	component: preact.FunctionComponent
	getServerSideProps: () => Promise<Record<string, Serializable>>
}

async function stuffWithinStuff(Component: LayoutProps, components: LayoutProps[]) {
	let serverSideProps = {}
	if (Component.getServerSideProps)
		serverSideProps = await Component.getServerSideProps()
	const NComponent = components.pop()
	if (!NComponent) return <Component.component {...{ serverSideProps }} />
	return <Component.component {...{ serverSideProps }}>{await stuffWithinStuff(NComponent, components)}</Component.component>
}

async function render(layouts: LayoutProps[], url: string) {
	let template = await fs.readFile(path.resolve(__dirname, './src/index.html'), 'utf-8')
	template = await vite.transformIndexHtml(url, template)
	const outer = layouts.pop()
	if (!outer) throw 505
	const { html } = await prerender(await stuffWithinStuff(outer, layouts))
	const res = template.replace("<!-- element -->", html)
	return res
}

await server.register(import("@fastify/middie"))
server.use(vite.middlewares)
server.addHook('preHandler',async (req,res)=>{
	//const paths = await router(req.url)
	//const modules = await LoadPaths(paths)
	const getSSPs = await vite.ssrLoadModule("/src/serverRoutes").then(r=>r.default)
	const props = await Promise.all(Object.entries(getSSPs)
		.filter(([path])=>req.url.includes(path.split("/").slice(0,-1).join("/")))
		.reverse()
		.map(([path,f])=>f?.(req) || {})
	)
	const render = (await vite.ssrLoadModule("/src/serverEntry")).render
	let {html} =await render(req.url,{[req.url]:props})
	let template = await fs.readFile(path.resolve(__dirname, './src/index.html'), 'utf-8')
	template = await vite.transformIndexHtml(req.url, template)
	html = template.replace("<!-- element -->", html)

	res.status(200).type("text/html").send(html)
	return res
})


await server.listen({ port: 3000 })

// const port = process.env.PORT || 5173

// Cached production assets
// const templateHtml = isProduction
//   ? await fs.readFile('./dist/client/index.html', 'utf-8')
//   : ''
// const url = req.originalUrl.replace(base, '')
// let template = await fs.readFile('./index.html', 'utf-8')
// template = await vite.transformIndexHtml(url, template)
// const render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
// const rendered = await render(url, ssrManifest)
//
// const html = template
//   .replace(`<!--app-head-->`, rendered.head ?? '')
//   .replace(`<!--app-html-->`, rendered.html ?? '')
//
// res.status(200).header('Content-Type', 'text/html').send(html)
