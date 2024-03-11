import React from "preact"
type Props = {
	children:preact.FunctionComponent
}
export default function Layout(props:Props){
	return(
		<>
			This is first layout
			{props.children}
		</>
	)
}
