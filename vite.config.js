import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'


const path = fileURLToPath(import.meta.url)

export default defineConfig({
	resolve:{
		extensions:[".ts",".js",".jsx",".tsx"],
	},
	root: resolve(dirname(path),"client"),
  plugins: [
    preact({
			prefreshEnabled:false,
			prerender:{
				enabled:true,
				renderTarget:"#app"
			}
		}),
  ]
})
