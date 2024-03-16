import { ErrorBoundary} from "preact-iso";
import { Route, Router, LocationProvider } from "preact-iso"
import routes from "./routes"
import { useSignal } from "@preact/signals";
import renderToString from "preact-render-to-string";


type Props = {
	serverSideProps?: {
		test: string
		req?: Request
	}
	url?:string
	ssp:any
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
	return (
		<LocationProvider>
			{state}
			<button onClick={()=>state.value++}>+</button>
			<ErrorBoundary>
				<Router> 
					{routes.map(route =>
						<Route path={route.path} component={route.component(props.ssp[route.path] || [])
					}/>
					)}
				</Router>
			</ErrorBoundary>
		</LocationProvider>
	)
}
