const path = require("path");
const res = path.resolve("../../src");
const withTM = require("next-transpile-modules")([res]);
module.exports = withTM();
