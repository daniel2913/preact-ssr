import Base from "./base"
import { renderToStringAsync } from "preact-render-to-string"

export async function render(url:string, props:any) {
  const {html} = await prerender(<Base ssp={props} url={url} />)
  return { html }
}
