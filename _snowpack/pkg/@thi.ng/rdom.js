import { i as implementsFunction } from '../common/implements-function-c507affc.js';
import { i as isArray } from '../common/is-array-a7fa88fb.js';
import { i as isString } from '../common/is-string-40d6c094.js';
import { i as isFunction, S as Subscription, n as nextID } from '../common/subscription-a6e19b11.js';
import { u as unsupported } from '../common/unsupported-d467609e.js';
import { i as isNumber } from '../common/is-number-dd4646bb.js';
import { i as isPlainObject } from '../common/is-plain-object-24968a48.js';
import '../common/logger-b9e6479b.js';
import '../common/map-ab3a157d.js';
import '../common/deferror-480a42fb.js';
import '../common/comp-b69ffdf6.js';

const isNotStringAndIterable = (x) => x != null &&
    typeof x !== "string" &&
    typeof x[Symbol.iterator] === "function";

const isTypedArray = (x) => x &&
    (x instanceof Float32Array ||
        x instanceof Float64Array ||
        x instanceof Uint32Array ||
        x instanceof Int32Array ||
        x instanceof Uint8Array ||
        x instanceof Int8Array ||
        x instanceof Uint16Array ||
        x instanceof Int16Array ||
        x instanceof Uint8ClampedArray);

/**
 * Returns true iff `x` implements {@link IDeref}.
 *
 * @param x
 */
const isDeref = (x) => x != null && typeof x["deref"] === "function";
/**
 * If `x` implements {@link IDeref}, returns its wrapped value, else
 * returns `x` itself.
 *
 * @param x -
 */
const deref = (x) => (isDeref(x) ? x.deref() : x);

/**
 * Converts the given key path to canonical form (array).
 *
 * ```
 * toPath("a.b.c");
 * // ["a", "b", "c"]
 *
 * toPath(0)
 * // [0]
 *
 * toPath(["a", "b", "c"])
 * // ["a", "b", "c"]
 * ```
 *
 * @param path -
 */
const toPath = (path) => isArray(path)
    ? path
    : isString(path)
        ? path.length > 0
            ? path.split(".")
            : []
        : path != null
            ? [path]
            : [];

/**
 * Composes a setter function for given nested update path. Optimized
 * fast execution paths are provided for path lengths less up to 4.
 *
 * @remarks
 * Supports both arrays and objects and creates intermediate shallow
 * copies at each level of the path. Thus provides structural sharing
 * with the original data for any branches not being updated by the
 * setter.
 *
 * The type parameter `T` can be used to indicate the type of the nested
 * value to be updated (default: `any`).
 *
 * If `path` is given as string, it will be split using `.`. Returns
 * function which accepts single object and when called, **immutably**
 * updates value at given path, i.e. produces a partial deep copy of obj
 * up until given path.
 *
 * If any intermediate key is not present in the given obj, creates a
 * plain empty object for that key and descends further.
 *
 * If `path` is an empty string or array, the returned setter will
 * simply return the new value.
 *
 * Only keys in the path will be modified, all other keys present in the
 * given object retain their original values to provide efficient
 * structural sharing / re-use.
 *
 * @example
 * ```ts
 * s = defSetterUnsafe("a.b.c");
 * // or
 * s = defSetterUnsafe(["a", "b", "c"]);
 *
 * s({ a: { b: { c: 23} } }, 24)
 * // { a: { b: { c: 24} } }
 *
 * s({ x: 23 }, 24)
 * // { x: 23, a: { b: { c: 24 } } }
 *
 * s(null, 24)
 * // { a: { b: { c: 24 } } }
 * ```
 *
 * @example
 * ```ts
 * s = defSetterUnsafe("a.b.c");
 *
 * a = { x: { y: { z: 1 } } };
 * b = s(a, 2);
 * // { x: { y: { z: 1 } }, a: { b: { c: 2 } } }
 *
 * a.x === b.x // true
 * a.x.y === b.x.y // true
 * ```
 *
 * @param path -
 */
const defSetterUnsafe = (path) => defSetter(path);
function defSetter(path) {
    const ks = toPath(path);
    const [a, b, c, d] = ks;
    switch (ks.length) {
        case 0:
            return (_, v) => v;
        case 1:
            return (s, v) => ((s = copy(s)), (s[a] = v), s);
        case 2:
            return (s, v) => {
                let x;
                s = copy(s);
                s[a] = x = copy(s[a]);
                x[b] = v;
                return s;
            };
        case 3:
            return (s, v) => {
                let x, y;
                s = copy(s);
                s[a] = x = copy(s[a]);
                x[b] = y = copy(x[b]);
                y[c] = v;
                return s;
            };
        case 4:
            return (s, v) => {
                let x, y, z;
                s = copy(s);
                s[a] = x = copy(s[a]);
                x[b] = y = copy(x[b]);
                y[c] = z = copy(y[c]);
                z[d] = v;
                return s;
            };
        default:
            let f;
            for (let i = ks.length; --i >= 0;) {
                f = compS(ks[i], f);
            }
            return f;
    }
}
/**
 * Creates a shallow copy of given array, typed array or plain object.
 *
 * @param x
 */
const copy = (x) => isArray(x) || isTypedArray(x) ? x.slice() : Object.assign({}, x);
/**
 * Helper for {@link defSetter}. Returns setter for a single step.
 *
 * @param k -
 * @param f -
 *
 * @internal
 */
const compS = (k, f) => (s, v) => ((s = copy(s)), (s[k] = f ? f(s[k], v) : v), s);

/** @internal */
/** @internal */
const ENTITIES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
};
/** @internal */
const RE_TAG = /^([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?$/;
/** @internal */
new RegExp(`[${Object.keys(ENTITIES).join("")}]`, "g");
/** @internal */
const NO_SPANS = {
    button: 1,
    option: 1,
    script: 1,
    style: 1,
    text: 1,
    textarea: 1,
    title: 1,
};
const tagMap = (tags) => tags.split(" ").reduce((acc, x) => ((acc[x] = true), acc), {});
/** @internal */
// tslint:disable-next-line
const SVG_TAGS = tagMap("animate animateColor animateMotion animateTransform circle clipPath color-profile defs desc discard ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence filter font foreignObject g image line linearGradient marker mask metadata mpath path pattern polygon polyline radialGradient rect set stop style svg switch symbol text textPath title tref tspan use view");
/** @internal */
// tslint:disable-next-line
tagMap("area base br col command embed hr img input keygen link meta param source stop track use wbr ?xml");
/** @internal */
// tslint:disable-next-line
tagMap("animate circle ellipse line path polygon polyline rect");
/** @internal */
const ATTRIB_JOIN_DELIMS = {
    accept: ",",
    sizes: ",",
    srcset: ",",
};

/**
 * Takes a space separated string of existing CSS class names and merges
 * it with `val`, which is either another string of class names, an
 * object of booleans or an `IDeref` evaluating to either. Returns
 * updated class string.
 *
 * @remarks
 * If `val` evaluates to a string, it will be appended to `existing`.
 *
 * If `val` is an object, its keys are used as class names and their
 * values indicate if the class should be added or removed from the
 * existing set.
 *
 * @example
 * ```ts
 * mergeClasses("foo bar", { foo: false, baz: true })
 * // "bar baz"
 *
 * mergeClasses("foo bar", "baz");
 * // "baz"
 * ```
 *
 * @param existing
 * @param val
 */
const mergeClasses = (existing, val) => {
    val = deref(val);
    if (val == null)
        return existing;
    if (isString(val))
        return existing + " " + val;
    const classes = new Set(existing.split(" "));
    for (let id in val) {
        deref(val[id]) ? classes.add(id) : classes.delete(id);
    }
    return [...classes].join(" ");
};
/**
 * Takes an attrib object and optional element ID and CSS class names from Emmet-style
 * hiccup tag, then transforms and merges definitions, returns attribs.
 *
 * @param attribs
 * @param id
 * @param classes
 */
const mergeEmmetAttribs = (attribs, id, classes) => {
    id && (attribs.id = id);
    let aclass = deref(attribs.class);
    if (classes) {
        classes = classes.replace(/\./g, " ");
        attribs.class = aclass ? mergeClasses(classes, aclass) : classes;
    }
    else if (aclass) {
        attribs.class = isString(aclass) ? aclass : mergeClasses("", aclass);
    }
    return attribs;
};

/**
 * Takes an object of RDF/XML prefixes and returns formatted string for
 * the RDFa `prefix` attribute.
 *
 * @example
 * ```ts
 * import { foaf, xsd } from "@thi.ng/prefixes";
 *
 * formatPrefixes({ foaf, xsd })
 * // "foaf: http://xmlns.com/foaf/0.1/ rdf: http://www.w3.org/2001/XMLSchema#"
 * ```
 *
 * @param prefixes -
 */
const formatPrefixes = (prefixes) => Object.keys(prefixes)
    .reduce((acc, k) => (acc.push(`${k}: ${prefixes[k]}`), acc), [])
    .join(" ");

const XML_SVG = "http://www.w3.org/2000/svg";
const XML_XLINK = "http://www.w3.org/1999/xlink";
const XML_XMLNS = "http://www.w3.org/2000/xmlns/";

const isSubscribable = (x) => implementsFunction(x, "subscribe");
const isComponent = (x) => implementsFunction(x, "mount");

/**
 * hdom-style DOM tree creation from hiccup format. Returns DOM element
 * of `tree` root. See {@link $el} for further details.
 *
 * @remarks
 * Supports elements given in these forms:
 *
 * - {@link IComponent} instance
 * - {@link IDeref} instance (must resolve to another supported type in
 *   this list)
 * - `["div#id.class", {...attribs}, ...children]`
 * - `[IComponent, ...mountargs]`
 * - `[function, ...args]`
 * - ES6 iterable of the above (for child values only!)
 *
 * Any other values will be cast to strings and added as spans to
 * current `parent`.
 *
 * @param tree
 * @param parent
 * @param idx
 */
const $tree = async (tree, parent, idx = -1) => isArray(tree)
    ? $treeElem(tree, parent, idx)
    : isComponent(tree)
        ? tree.mount(parent, idx)
        : isDeref(tree)
            ? $tree(tree.deref(), parent)
            : isNotStringAndIterable(tree)
                ? $treeIter(tree, parent)
                : tree != null
                    ? $el("span", null, tree, parent, idx)
                    : null;
const $treeElem = (tree, parent, idx) => {
    const tag = tree[0];
    // [tag, attribs, ...body]
    return isString(tag)
        ? $treeTag(tree, parent, idx)
        : // [icomponent, ...args]
            isComponent(tag)
                ? tag.mount(parent, idx, ...tree.slice(1))
                : // [fn, ...args]
                    isFunction(tag)
                        ? $tree(tag.apply(null, tree.slice(1)), parent)
                        : // unsupported
                            unsupported(`tag: ${tag}`);
};
const $treeTag = (tree, parent, idx) => {
    const n = tree.length;
    const { 0: tag, 1: attribs, 2: body } = tree;
    if (n === 3 && (isString(body) || isNumber(body))) {
        // emmet-free base tag
        const tmp = /^\w+/.exec(tag);
        if (tmp && NO_SPANS[tmp[0]]) {
            // don't wrap single body in <span> here
            parent = $el(tag, attribs, body, parent, idx);
            return parent;
        }
    }
    parent = $el(tag, attribs, null, parent, idx);
    for (let i = 2; i < n; i++) {
        $tree(tree[i], parent);
    }
    return parent;
};
const $treeIter = (tree, parent) => {
    for (let t of tree) {
        $tree(t, parent);
    }
    return null;
};
/**
 * Create a single DOM element and optionally attaches it to `parent`.
 *
 * @remarks
 * Supports Emmet-style tag names in this form: `tag#id.class1.class2`.
 * `attribs` is a plain object of element attributes. See
 * {@link $attribs} for further details.
 *
 * If `parent` is given, but no `idx` arg, the new element will be
 * appended as child.
 *
 * @param tag
 * @param attribs
 * @param body
 * @param parent
 * @param idx
 */
const $el = (tag, attribs, body, parent, idx = -1) => {
    const match = RE_TAG.exec(tag);
    if (match) {
        attribs = mergeEmmetAttribs(Object.assign({}, attribs), match[2], match[3]);
        tag = match[1];
    }
    let el;
    const qidx = tag.indexOf(":");
    if (qidx < 0) {
        el = SVG_TAGS[tag]
            ? document.createElementNS(XML_SVG, tag)
            : document.createElement(tag);
    }
    else {
        el = document.createElementNS(PREFIXES[tag.substr(0, qidx)], tag);
    }
    attribs && $attribs(el, attribs);
    body != null && $text(el, body);
    parent && $addChild(parent, el, idx);
    return el;
};
const $addChild = (parent, child, idx = -1) => {
    isNumber(idx)
        ? idx < 0 || idx >= parent.children.length
            ? parent.appendChild(child)
            : parent.insertBefore(child, parent.children[idx])
        : parent.insertBefore(child, idx);
};
const $remove = (el) => el.remove();
const $moveTo = (newParent, el, idx = -1) => {
    $remove(el);
    $addChild(newParent, el, idx);
};
const $clear = (el) => ((el.innerHTML = ""), el);
/**
 * Same as `el.innerText = body`, however if `body` is an
 * {@link @thi.ng/api#IDeref} it'll be automatically deref'd.
 *
 * @param el
 * @param body
 */
const $text = (el, body) => {
    el.innerText = String(deref(body));
};
/**
 * Same as `el.innerHtml = body`, use with caution! If `body` is an
 * {@link @thi.ng/api#IDeref} it'll be automatically deref'd.
 *
 * @param elß
 * @param body
 */
const $html = (el, body) => {
    el.innerHTML = String(deref(body));
};
/**
 * Takes an object of attributes and applies them to given DOM element.
 *
 * @remarks
 * The following rules & transformations are applied (in the stated
 * order):
 *
 * - {@link @thi.ng/api#IDeref} values are `deref`d
 * - attributes prefixed with `on` are considered event listeners and
 *   can either have a function value or tuple of `[listener, opts]`,
 *   where `opts` are the standard `.addEventListener()` options
 * - function values for any other attribs are first called with the
 *   entire `attribs` object and return value used
 * - array values are converted into space-delimited string
 *
 * CSS classs are to given as `class` attribute, with its value either a
 * string or an object of booleans. If the latter, the given class names
 * are either added to or removed from the current list of classes.
 *
 * CSS style rules can be defined via the `style` attrib. Please
 * {@link $style} for further details.
 *
 * Data attributes are to be given as object under the `data` attribute
 * name, with its values being merged with the element's current
 * `dataset` property.
 *
 * Depending on element type the `value` attribute will be updated
 * keeping the current cursor position / selection intact.
 *
 * @param el
 * @param attribs
 */
const $attribs = (el, attribs) => {
    for (let id in attribs) {
        setAttrib(el, id, attribs[id], attribs);
    }
};
const setAttrib = (el, id, val, attribs) => {
    implementsFunction(val, "deref") && (val = val.deref());
    const isListener = id.startsWith("on");
    if (isListener) {
        if (isString(val)) {
            el.setAttribute(id, val);
        }
        else {
            id = id.substr(2);
            isArray(val)
                ? el.addEventListener(id, val[0], val[1])
                : el.addEventListener(id, val);
        }
        return;
    }
    isFunction(val) && (val = val(attribs));
    isArray(val) && (val = val.join(ATTRIB_JOIN_DELIMS[id] || " "));
    switch (id) {
        case "class":
            el.className = isString(val)
                ? val
                : mergeClasses(el.className, val);
            break;
        case "style":
            $style(el, val);
            break;
        case "value":
            updateValueAttrib(el, val);
            break;
        case "data":
            updateDataAttribs(el, val);
            break;
        case "prefix":
            el.setAttribute(id, isString(val) ? val : formatPrefixes(val));
            break;
        case "accessKey":
        case "autocapitalize":
        case "checked":
        case "contentEditable":
        case "dir":
        case "draggable":
        case "hidden":
        case "id":
        case "indeterminate":
        case "lang":
        case "scrollLeft":
        case "scrollTop":
        case "selectionEnd":
        case "selectionStart":
        case "slot":
        case "spellcheck":
        case "tabIndex":
        case "title":
            el[id] = val;
            break;
        default: {
            const idx = id.indexOf(":");
            if (idx < 0) {
                val === false || val == null
                    ? el.removeAttribute(id)
                    : el.setAttribute(id, val);
            }
            else {
                const ns = PREFIXES[id.substr(0, idx)];
                val === false || val == null
                    ? el.removeAttributeNS(ns, id)
                    : el.setAttributeNS(ns, id, val);
            }
        }
    }
};
const updateValueAttrib = (el, value) => {
    let ev;
    switch (el.type) {
        case "text":
        case "textarea":
        case "password":
        case "search":
        case "number":
        case "email":
        case "url":
        case "tel":
        case "date":
        case "datetime-local":
        case "time":
        case "week":
        case "month":
            if ((ev = el.value) !== undefined && isString(value)) {
                const off = value.length - (ev.length - (el.selectionStart || 0));
                el.value = value;
                el.selectionStart = el.selectionEnd = off;
                break;
            }
        default:
            el.value = value;
    }
};
const updateDataAttribs = (el, attribs) => {
    const data = el.dataset;
    for (let id in attribs) {
        const v = deref(attribs[id]);
        data[id] = isFunction(v) ? v(attribs) : v;
    }
};
/**
 * Takes an object (or string) of CSS properties, compiles them into a
 * single CSS string and sets it as `style` attribute on the given
 * element.
 *
 * @remarks
 * All property values can be {@link @thi.ng/api#IDeref} values, in
 * which case they're are first `deref`d before use. If the value is a
 * function, it will be called with the entire `rules` object as arg and
 * the return value used.
 *
 * @param el
 * @param rules
 */
const $style = (el, rules) => {
    if (isString(rules)) {
        el.setAttribute("style", rules);
    }
    else {
        const style = el.style;
        for (let id in rules) {
            let v = deref(rules[id]);
            isFunction(v) && (v = v(rules));
            style[id] = v != null ? v : "";
        }
    }
};
/**
 * @internal
 */
const PREFIXES = {
    svg: XML_SVG,
    xlink: XML_XLINK,
    xmlns: XML_XMLNS,
};

class NullScheduler {
    add(_, fn) {
        fn();
    }
    cancel() { }
}
// export let SCHEDULER: IScheduler = new RAFScheduler();
let SCHEDULER = new NullScheduler();

const wrapper = (update) => (tag, attribs, body) => ({
    el: undefined,
    async mount(parent, index, state) {
        this.el = $el(tag, attribs, null, parent, index);
        update(this.el, state != null ? state : body);
        return this.el;
    },
    async unmount() {
        $remove(this.el);
        this.el = undefined;
    },
    update(body) {
        SCHEDULER.add(this, () => this.el && update(this.el, body));
    },
});
/**
 * Returns a component wrapper for a single DOM element whose TEXT body can be
 * later updated/replaced via `.update()`, similarly to setting `.innerText`.
 *
 * @param tag - element name
 * @param attribs - element attribs
 * @param body - optional initial body
 */
const $wrapText = wrapper($text);

function $sub(src, tag, attribs) {
    return isString(tag)
        ? src.subscribe(new $Sub($wrapText(tag, attribs)))
        : src.subscribe(new $Sub(tag));
}
class $Sub extends Subscription {
    constructor(inner) {
        super(undefined, { id: `rdom$sub-${nextID()}` });
        this.inner = inner;
    }
    async mount(parent, index = -1) {
        return (this.el = await this.inner.mount(parent, index, this.parent.deref()));
    }
    async unmount() {
        this.unsubscribe();
        SCHEDULER.cancel(this);
        this.el = undefined;
        await this.inner.unmount();
    }
    update(x) {
        this.next(x);
    }
    next(x) {
        SCHEDULER.add(this, () => this.el && this.inner.update(x));
    }
}
class $SubA extends Subscription {
    constructor(comp, path) {
        super(undefined, { id: `rdom$sub-${nextID()}` });
        this.comp = comp;
        this.attr = {};
        this.setter = defSetterUnsafe(path);
    }
    next(a) {
        const $ = this.comp;
        SCHEDULER.add($, () => $.el && $attribs($.el, this.setter(this.attr, a)));
    }
}

/**
 * Compiles a tree of components given in any supported format incl.
 * reactive state values into a single, nested {@link IComponent}.
 *
 * @remarks
 * Supported formats:
 *
 * - hiccup component trees, i.e. `["tag#id.class", attribs, [...]]`
 * - {@link IComponent} instances
 * - {@link @thi.ng/rstream#ISubscribable} instances
 * - {@link @thi.ng/api#IDeref} instances
 *
 * Any other value type will be wrapped in a `<span>` element. Reactive
 * `ISubscribable` values can be used as element attributes or element
 * body/children. For the former, a subscription will be added to update
 * the target attribute. If used as element body, the reactive value
 * will be wrapped using a {@link $sub} `<span>` with the value as its
 * reactive body.
 *
 * @param tree
 */
const $compile = (tree) => isArray(tree)
    ? isComplexComponent(tree)
        ? complexComponent(tree)
        : basicComponent(tree)
    : isComponent(tree)
        ? tree
        : isSubscribable(tree)
            ? $sub(tree, "span")
            : $wrapText("span", null, tree);
const walk = (f, x, path = []) => {
    if (isPlainObject(x)) {
        for (const k in x) {
            walk(f, x[k], [...path, k]);
        }
    }
    f(x, path);
};
const isComplexComponent = (x) => {
    if (isPlainObject(x)) {
        for (const k in x) {
            if (isComplexComponent(x[k]))
                return true;
        }
    }
    else if (isArray(x)) {
        for (let i = 0, n = x.length; i < n; i++) {
            if (isComplexComponent(x[i]))
                return true;
        }
    }
    return isSubscribable(x) || isComponent(x);
};
const complexComponent = (tree) => ({
    async mount(parent, index = -1) {
        this.subs = [];
        walk((x, path) => {
            isSubscribable(x) &&
                this.subs.push(x.subscribe(new $SubA(this, path)));
        }, tree[1]);
        this.children = [];
        this.el = $el(tree[0], tree[1], null, parent, index);
        for (let i = 2; i < tree.length; i++) {
            const child = $compile(tree[i]);
            child.mount(this.el, i - 2);
            this.children.push(child);
        }
        return this.el;
    },
    async unmount() {
        SCHEDULER.cancel(this);
        if (this.children) {
            for (let c of this.children) {
                await c.unmount();
            }
        }
        this.subs && this.subs.forEach((s) => s.unsubscribe());
        $remove(this.el);
        this.children = undefined;
        this.subs = undefined;
        this.el = undefined;
    },
    update() { },
});
const basicComponent = (tree) => ({
    async mount(parent, index = -1) {
        return (this.el = await $tree(tree, parent, index));
    },
    async unmount() {
        $remove(this.el);
        this.el = undefined;
    },
    update() { },
});

/**
 * Abstract base class / {@link IComponent} implementation. Provides
 * additional convenience methods for DOM element creation &
 * manipulation.
 */
class Component {
    async unmount() {
        this.$remove();
        this.el = undefined;
    }
    // @ts-ignore args
    update(state) { }
    $el(tag, attribs, body, parent = this.el, idx) {
        return $el(tag, attribs, body, parent, idx);
    }
    $clear(el = this.el) {
        return $clear(el);
    }
    $compile(tree) {
        return $compile(tree);
    }
    $tree(tree, root = this.el, index) {
        return $tree(tree, root, index);
    }
    $text(body) {
        this.el && $text(this.el, body);
    }
    $html(body) {
        this.el && $html(this.el, body);
    }
    $attribs(attribs, el = this.el) {
        $attribs(el, attribs);
    }
    $style(rules, el = this.el) {
        $style(el, rules);
    }
    $remove(el = this.el) {
        $remove(el);
    }
    $moveTo(newParent, el = this.el, idx) {
        $moveTo(newParent, el, idx);
    }
}

/**
 * Creates a generalized and dynamically updating list component from items of
 * the given `src` stream.
 *
 * @remarks
 * Only very basic key-less diffing of list items is performed (using the
 * `equiv` equality predicate arg, i.e. `equiv(prev[i], curr[i])`).
 *
 * Use this list component only for cases when the child item components do not
 * involve complex lifecycles (e.g. preloaders, intro animations etc.). Any list
 * items changing position will be first unmounted, then remounted. To avoid
 * this full lifecycle transition, consider using {@link $klist}, which employs
 * a more elaborate diffing mechanism and keying to uniquely identify list items
 * (regardless of their position in the array).
 *
 * @example
 * ```ts
 * const items = reactive([{id: "a"}, {id: "b"}, {id: "c"}]);
 *
 * $list(
 *   // data source (rstream subsribable)
 *   items,
 *   // outer list element & attribs
 *   "ul",
 *   { class: "list red" },
 *   // list item component constructor
 *   (x) => ["li", {}, x.id],
 *   // optional equality predicate (default this.ng/equiv)
 *   (a, b) => a.id === b.id
 * ).mount(document.body);
 *
 * // update list
 * items.next([{id: "b"}, {id: "d"}, {id: "c"}]);
 *
 * // removes component for item A
 * // recreates B in new position
 * // creates D
 * // keeps C
 * ```
 *
 *
 * @param src
 * @param tag
 * @param attribs
 * @param ctor
 * @param equiv
 */
const $list = (src, tag, attribs, ctor, equiv) => $sub(src, new List(tag, attribs, ctor, equiv));
class List extends Component {
    constructor(tag, attribs, ctor, equiv = (a, b) => a === b) {
        super();
        this.tag = tag;
        this.attribs = attribs;
        this.ctor = ctor;
        this.equiv = equiv;
    }
    async mount(parent, index, state) {
        this.prev = [];
        this.items = [];
        this.el = this.$el(this.tag, this.attribs, null, parent, index);
        this.update(state);
        return this.el;
    }
    async unmount() {
        this.items.forEach((c) => c.unmount());
        this.$remove();
        this.el = undefined;
        this.items = undefined;
        this.prev = undefined;
    }
    async update(curr) {
        if (!curr)
            return;
        const { ctor, equiv, items, prev, el: parent } = this;
        const nb = curr.length;
        let na = prev.length;
        let n = Math.min(na, nb);
        for (let i = 0; i < n; i++) {
            if (!equiv(prev[i], curr[i])) {
                await items[i].unmount();
                const val = curr[i];
                const child = $compile(ctor(val));
                await child.mount(parent, i);
                items[i] = child;
                prev[i] = val;
            }
        }
        if (na < nb) {
            for (; n < nb; n++) {
                const val = curr[n];
                const child = $compile(ctor(val));
                await child.mount(parent, -1);
                items[n] = child;
                prev[n] = val;
            }
        }
        else {
            while (--na >= nb) {
                await items[na].unmount();
                items.pop();
                prev.pop();
            }
        }
    }
}

export { $compile, $list };
