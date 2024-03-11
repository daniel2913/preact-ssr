import { uneval } from 'devalue';
import preact,{ h, options, cloneElement } from 'preact';
import renderToString from 'preact-render-to-string';

let vnodeHook;

const old = options.vnode;
options.vnode = vnode => {
	if (old) old(vnode);
	if (vnodeHook) vnodeHook(vnode);
};

type Res = {
	html:string
	links:string[]
}

export default async function dehydrator(vnode, options):Promise<Res>|Res {
	options = options || {};

	const maxDepth = options.maxDepth || 10;
	const props = options.props;
	let tries = 0;

	if (typeof vnode === 'function') {
		vnode = h(vnode, props);
	} else if (props) {
		vnode = cloneElement(vnode, props);
	}

	const render = () => {
		if (++tries > maxDepth) return;
		try {
			return renderToString(vnode);
		} catch (e) {
			if (e && e.then) return e.then(render);
			throw e;
		}
	};

	let links = new Set();
	vnodeHook = ({ type, props }) => {
		if (type === 'a' && props && props.href && (!props.target || props.target === '_self')) {
			links.add(props.href);
		}
	};

	try {
		let html = await render();
		html += `<script type="isodata">window.hydration = ${uneval({serverSideProps:props})}</script>`;
		return { html, links };
	} finally {
		vnodeHook = null;
	}
}
