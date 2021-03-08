import { p as process } from './_node-resolve:empty-5550de3c.js';

const isNode = () => typeof process === "object" &&
    typeof process.versions === "object" &&
    typeof process.versions.node !== "undefined";

export { isNode as i };
