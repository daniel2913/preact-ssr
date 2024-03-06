import dehydrator from "../exp/dehydrator"
import {App} from "./index"

export async function createApp() {
	const test:string = await new Promise(t=>setTimeout(()=>t("she waiteded"),3000))
	const {html} = await dehydrator(<App/>,{props:{test}});
	return {
		html,
		head: {
			lang: "en",
			title: "Prerendered Preact App",
			elements: new Set([
				{
					type: "meta",
					props: {
						name: "description",
						content: "This is a prerendered Preact app",
					},
				},
			]),
		},
	};
}
