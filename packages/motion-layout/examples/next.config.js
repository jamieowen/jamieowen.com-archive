const path = require("path");
const motionLayoutPath = path.resolve("../src");
const withTM = require("next-transpile-modules")([motionLayoutPath]);
module.exports = withTM();
