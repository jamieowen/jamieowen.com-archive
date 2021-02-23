// import glob from "glob";
// import path from "path";
// import fs from "fs";
const glob = require("glob");
const path = require("path");
const fs = require("fs");
const rimraf = require("rimraf");

const src = path.join(__dirname, "../src");
const out = path.join(__dirname, "../public");
const tsFiles = glob.sync("*.ts", { cwd: src });

const sketchHTML = (file: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Starter Snowpack App" />
    <title>Starter Snowpack App</title>
  </head>
  <body style="margin:0px">
    <script type="module" src="/js/${file.replace(".ts", ".js")}"></script>
  </body>
</html>
`;

rimraf.sync(out);
fs.mkdirSync(out);

for (let file of tsFiles) {
  fs.writeFileSync(
    path.join(out, file.replace(".ts", ".html")),
    sketchHTML(file)
  );
}

const indexHTML = (links: string[]) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Starter Snowpack App" />
    <title>Starter Snowpack App</title>
  </head>
  <body>
    <div>
    ${links.map((link) => {
      return `<a href="${link}" target="sketch-frame">${link}</a>"`;
    })}
    </div>
    <iframe src="" style="position:absolute" name="sketch-frame" width="80%" height="80%"></iframe>
  </body>
</html>
`;

const links = tsFiles.map((file: string) => "/" + file.replace(".ts", ".html"));
fs.writeFileSync(path.join(out, "index.html"), indexHTML(links));
