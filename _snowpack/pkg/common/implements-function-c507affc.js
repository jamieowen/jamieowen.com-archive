const implementsFunction = (x, fn) => x != null && typeof x[fn] === "function";

export { implementsFunction as i };
