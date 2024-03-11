import { lazy } from "preact-iso"

const pages:[string,preact.FunctionComponent][] =
	Object.entries(import.meta.glob<preact.FunctionComponent>("./routes/**/page.tsx",{import:"default"}))
	.map(([path,comp])=>[`/src/${path.slice(2,-9)}`,lazy(comp)])

const layouts:[string,preact.FunctionComponent][] = 
	Object.entries(import.meta.glob<preact.FunctionComponent>("./routes/**/layout.tsx",{import:"default"}))
	.map(([path,comp])=>[`/src/${path.slice(2,-11)}`,lazy(comp)])
	.sort((a,b)=>b[0].length-a[0].length)

function layer(components:(preact.FunctionComponent|null)[]){
	const NComponent = components.pop()
	if (!NComponent) return null 
	if (!components.length) return <NComponent/>
	return <NComponent>{layer(components)}</NComponent>
}
export default pages.map(([path,page])=>{
	const layers = [page]
	for (const [layoutPath,layout] of layouts){
		
		if (path.includes(layoutPath)) layers.push(layout)
	}
	console.error(layers)
	const component = layer(layers)
	return{
	path:path.replace("/src/routes/",""),
	component,
	}
})
