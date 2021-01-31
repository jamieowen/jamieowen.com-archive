import Jimp from "jimp";
import glob from "glob";
import path from "path";
import rimraf from "rimraf";

const count = () => {
  const map = new Map();
  return {
    map,
    set: (w: number, h: number) => {
      const str = w + "x" + h;
      if (!map.has(str)) {
        map.set(str, 1);
        return 1;
      } else {
        const count = map.get(str) + 1;
        map.set(str, count);
        return count;
      }
    },
  };
};

interface ResizeOpts {
  type: "cover" | "fit";
  output: {
    width: number;
    height: number;
  };
  dryRun: boolean;
  outputPath: (filename: string, idx: number) => string;
}

const outputRelativeToFolder = (to: string, subFolders: number = 1) => {
  return (filename: string, idx: number) => {
    // const rel = path.relative(filename, to);
    const basename = path.basename(filename).slice(0, -4) + ".jpg"; // enforce jpg
    const dirname = path.dirname(filename);
    // Take a number of nested folders up from the source.
    const relativeFolder =
      subFolders <= 0
        ? ""
        : dirname.split(path.sep).slice(-subFolders).join(path.sep);

    return path.resolve(to, relativeFolder, basename);
  };
};

const resizeImages = async (globMatch: string, opts: ResizeOpts) => {
  const matched = glob.sync(globMatch);
  console.log("Matched", matched);
  const counter = count();

  let i = 0;
  for (let p of matched) {
    const output = p.split(path.sep).slice(-1)[0].slice(0, -4) + ".jpg";
    const image = await Jimp.read(p);
    const w = image.getWidth();
    const h = image.getHeight();

    const outputPath = opts.outputPath(p, i++);

    if (!opts.dryRun) {
      if (opts.type === "cover") {
        image.cover(opts.output.width, opts.output.height);
      } else if (opts.type === "fit") {
        image.scaleToFit(opts.output.width, opts.output.height);
      }
      image.quality(100);
      console.log("Write:", outputPath);
      //path.join(outputPath, output.toLowerCase())
      await image.writeAsync(outputPath);
    } else {
      console.log("(Dry run) Write : ", outputPath);
    }
    // image.save
    counter.set(w, h);
    // console.log(image.getWidth(), image.getHeight());
  }
  console.log(counter.map.entries());
};

const run = async () => {
  // await rimraf()
  await resizeImages("./public-src/raw/archived-work/**/*.{png,jpg}", {
    type: "cover",
    output: {
      width: 640 * 0.8,
      height: 425 * 0.8,
    },
    dryRun: true,
    outputPath: outputRelativeToFolder("./public-src/resized/archived-work", 0),
  });

  // Export selected work images.
  // They sit in their own folders.
  await resizeImages("./public-src/raw/selected-work/**/*.{png,jpg}", {
    type: "fit",
    output: {
      width: 1024,
      height: 5000,
    },
    dryRun: false,
    outputPath: outputRelativeToFolder("./public-src/resized", 1),
  });
};

run();
