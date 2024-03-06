import {signal} from "@preact/signals"

const world = signal("")

export default async function Hydra(){
	await new Promise(p=>setTimeout(p,5000))
	return (
	()=>
		<div>
			<h1>Hello <span>{world}</span></h1>
			<button type="button" onClick={()=>{world.value="World!"}}>TEST</button>
		</div>
	)
}
