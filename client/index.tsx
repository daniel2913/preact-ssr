import { signal, useSignal } from "@preact/signals";
import {
  Router,
  LocationProvider,
  ErrorBoundary,
	lazy,
} from "preact-iso";
//import _Hydra from "./hydra"

//const Hydra = lazy(_Hydra);

export function App({test}:{test:string}) {
	if(typeof window === "undefined")
		globalThis.location = {
		href:"http://localhost:3000",
		pathname:"/",
		origin:"http://localhost:3000",
	}
  return (
    <main>
			<h1>this is test <span>{test}</span> </h1>
			<button onClick={()=>console.log("test")}>test</button>
			<h2>{test}</h2>
    </main>
  );
}

