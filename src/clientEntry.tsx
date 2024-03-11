import { hydrate } from 'preact-iso'
import  Base  from './base'

hydrate(<Base />, document.getElementById('app') as HTMLElement)
