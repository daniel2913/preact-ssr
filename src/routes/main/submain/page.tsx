
import { useSignal } from "@preact/signals"

type Props = {
	test:string
}

export default function Main(props:Props){
	const test = useSignal("")
	return(
		<div>
			<h1>This is main page {props.test} <span>{test}</span></h1>
			<button onClick={()=>{test.value="And it is hydrated"}}>test</button>
		</div>
	)
}
