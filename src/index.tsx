import { useSignal } from "@preact/signals";
import {
  Router,
  LocationProvider,
  ErrorBoundary,
	lazy,
} from "preact-iso";
import _Hydra from "./hydra"

const Hydra = lazy(_Hydra);

export function App({test}:{test:string}) {
	const value = useSignal(test)
  return (
    <main>
			<h1>this is test <span>{value}</span> </h1>
			<LocationProvider>
			<Router>
			<ErrorBoundary>
			<Hydra/>
			</ErrorBoundary>
			</Router>
			</LocationProvider>
			<button onClick={()=>{value.value+=" he lied"}}>test</button>
    </main>
  );
}

