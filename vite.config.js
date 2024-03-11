import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const path = fileURLToPath(import.meta.url)



export default defineConfig({
	resolve:{
		extensions:[".ts",".js",".jsx",".tsx"],
		alias:{
			"/src":fileURLToPath(new URL("src",import.meta.url))
		}
	},
	root: resolve(dirname(path),"src"),
  plugins: [
    preact({
			//prefreshEnabled:false,
			// prerender:{
			// 	enabled:true,
			// 	renderTarget:"#app"
			// },
			babel:{
				cwd:createRequire(import.meta.url).resolve("@preact/preset-vite")	
			}
		}),
  ],
})
