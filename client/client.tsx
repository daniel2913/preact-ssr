import { App } from "./index";
import hydrator from "../exp/hydrator"

if (typeof window !== "undefined") {
  hydrator(<App/>, document.getElementById("app"));
}
