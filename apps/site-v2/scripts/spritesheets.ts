/**
 * USING TEXTURE PACKER...
 */
export default {};

// import spritesmith from "spritesmith";
// import glob from "glob";
// import fs from "fs";
// import path from "path";

// const exportSprites = async (inputs: string[], outputPath: string) => {
//   return new Promise(() => {
//     spritesmith.run(
//       {
//         src: inputs,
//         // engine: require('canvassmith')
//       },
//       function handleResult(err, result) {
//         // If there was an error, throw it
//         if (err) {
//           throw err;
//         }
//         console.log("okok");
//         // Output the image
//         fs.writeFileSync(path.join(outputPath, "output.png"), result.image);
//         console.log(result.coordinates, result.properties); // Coordinates and properties
//       }
//     );
//   });
// };

// const run = async () => {
//   const sprites = glob.sync("./public/data/archived-grid/source/*.jpg");
//   console.log(sprites);
//   const outPath = path.resolve("./public/data/archived-grid/");
//   await exportSprites(sprites, outPath);
// };

// run();
