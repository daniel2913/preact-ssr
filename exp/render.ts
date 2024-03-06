import {renderToString} from "preact-render-to-string"
const main = async (Comp) => {
    let tries = 0;
    const maxDepth = 10;
    const render = () => {
        if (++tries > maxDepth) return;
        try {
            return renderToString(<Comp />);
        } catch (e) {
            if (e && e.then) return e.then(render);
            throw e;
        }
    };

    const rendered = await render();
    console.log(rendered)
}
