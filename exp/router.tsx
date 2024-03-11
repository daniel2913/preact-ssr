import preact from "preact"
import { useContext } from "preact/hooks"

type RouterContextProps = {
	path?:string
	onStartLoading?:(path:string)=>void
	canLoad?:(path:string)=>Promise<boolean>
	endLoading?: (path:string)=>void
}

export const RouterContext = preact.createContext<RouterContextProps>({})

type RouterProps = {
	children:preact.ComponentChildren
}

export function Router(props:Props){
	const test=1
}

type RouteProps = {
	component:preact.VNode
	path:string
}

export function Route(props:RouteProps){
	const route = useContext(RouterContext)
	if (route.path !== props.path) return null
	return props.component
}

