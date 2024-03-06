import fs from 'node:fs/promises'
import Fastify from "fastify"
import FastifyVite from "@fastify/vite"
import { resolve } from 'node:path'



const isProduction = process.env.NODE_ENV === 'production'

const server = Fastify()

const base = process.env.BASE || '/'
await server.register(FastifyVite, {
  root: import.meta.url,
	dev:true,
	clientModule:resolve("/users/user/desktop/personal/vite-project/client/server.tsx"),
	createRenderFunction({ createApp}) {
    return async () =>{
			const html = await createApp()  
			return {element:html.html}
		}
	},
})

server.get("/", async (_, res) => {
  return res.html()
})

await server.vite.ready()

await server.listen({ port: 3000 })






const ssrManifest = isProduction
  ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
  : undefined


// server.use('*', async (req, res) => {
//   try {
//
//     let template
//     let render
//     if (!isProduction) {
//       // Always read fresh template in development
//       template = await fs.readFile('./index.html', 'utf-8')
//       template = await vite.transformIndexHtml(url, template)
//       render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
//     } else {
//       template = templateHtml
//       render = (await import('./dist/server/entry-server.js')).render
//     }
//
//     const rendered = await render(url, ssrManifest)
//
//     const html = template
//       .replace(`<!--app-head-->`, rendered.head ?? '')
//       .replace(`<!--app-html-->`, rendered.html ?? '')
//
//     res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
//   } catch (e) {
//     vite?.ssrFixStacktrace(e)
//     console.log(e.stack)
//     res.status(500).end(e.stack)
//   }
// })

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
