import Base from "./base"
import {prerender} from "preact-iso"

export async function render(url:string) {
  const {html} = await prerender(<Base url={url} />)
  return { html }
}
