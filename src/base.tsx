import { ErrorBoundary} from "preact-iso";
import { Route, Router, LocationProvider } from "preact-iso"
import routes from "./routes"
import { useSignal } from "@preact/signals";



type Props = {
	serverSideProps?: {
		test: string
		req?: Request
	}
	url?:string
}

export default function Base(props?: Props) {
	const state = useSignal(0)
	if (typeof window === "undefined") {
		if (!props) throw "WTF!?"
		globalThis.location = {
			ancestorOrigins: {},
			href: `http://localhost:3000${props.url}`,
			origin: "http://localhost:3000",
			protocol: "http:",
			host: "localhost:3000",
			hostname: "localhost",
			port: "3000",
			pathname: props.url,
			search: "",
			hash: ""
		} as Location
	}

	// async function onNavStart(path: string) {
	// 	if (typeof window === "undefined" || propsStore[path]) return
	// 	setLoading(true)
	// 	const res = await fetch(`/json${path.split(".").shift()}`, { method: "GET" })
	// 	if (!res.ok) {
	// 		setLoading(false)
	// 		return
	// 	}
	// 	const props = await res.json()
	// 	setPropsStore(old => ({ ...old, [path]: props }))
	// 	setLoading(false)
	// 	return true
	// }
	return (
		<LocationProvider>
			{state}
			<button onClick={()=>state.value++}>+</button>
			<ErrorBoundary>
				<Router> 
					{routes.map(route =>
						<Route path={route.path} component={()=>route.component} />
					)}
				</Router>
			</ErrorBoundary>
		</LocationProvider>
	)
}
