import {createApp as App} from "./base";
import hydrator from "../exp/hydrator"

hydrator(<App {...window.hydration}/>, document.getElementById("app"))
