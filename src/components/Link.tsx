import {useLocation} from "../../exp/router"

type Props = {
	href:string
	children:preact.ComponentChildren
}

export default function Link(props:Props){
	const location = useLocation()
	return(
		<button 
			onClick={()=>location.route(props.href)}
		>
			{props.children}
		</button>
	)
}
