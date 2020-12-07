// import { start } from "@thi.ng/hdom";
import * as hdom from '@thi.ng/hdom';
import { derefContext } from "@thi.ng/hiccup";
// import { DEFAULT_IMPL } from "./default";
import { DEFAULT_IMPL } from '@thi.ng/hdom';

console.log( DEFAULT_IMPL );

// stateless component w/ params
// the first arg is an auto-injected context object
// (not used here, see `hdom-context-basics` example for details)
const greeter = (_: any, name: string) => ["h1.title", "hello ", name];

// component w/ local state
const counter = (i = 0) => {
    return () => ["button", { onclick: () => i++ }, `clicks: ${i}`];
};

const app = () => {
    // initialization steps
    // ...
    // root component is just a static array
    return ["div#app", [greeter, "world"], counter(), counter(100)];
};

// start update loop (browser only, see diagram below)

const tree = app();

console.log( 'APP TREE :', tree );
const norm = hdom.normalizeTree({},tree);
console.log( 'NORM:', norm );


export const start = (tree, opts = {}, impl = DEFAULT_IMPL) => {
    const _opts = Object.assign({ root: "app" }, opts);
    let prev = [];
    let isActive = true;
    const root = hdom.resolveRoot(_opts.root, impl);
    console.log( 'ROOT', root );
    const update = () => {
        if (isActive) {
            _opts.ctx = derefContext(opts.ctx, _opts.autoDerefKeys);
            const curr = impl.normalizeTree(_opts, tree);
            if (curr != null) {
                if (_opts.hydrate) {
                    impl.hydrateTree(_opts, root, curr);
                    _opts.hydrate = false;
                }
                else {
                    impl.diffTree(_opts, root, prev, curr);
                }
                prev = curr;
            }
            // check again in case one of the components called cancel
            isActive && requestAnimationFrame(update);
        }
    };
    requestAnimationFrame(update);
    return () => (isActive = false);
};

const root = document.createElement('div');
root.id = 'app';
document.body.appendChild(root);

start(tree);

// alternatively apply DOM tree only once
// (stateful components won't update though)
// hdom.createDOM(document.body, hdom.normalizeTree(app()));