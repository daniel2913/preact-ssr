import { useSignal } from "@preact/signals"

type Props = {
	children:preact.ComponentChildren
}

export default function Layout(props:Props){
	return (
		<main>
			This is second layout
			{props.children}
		</main>
	)
}
