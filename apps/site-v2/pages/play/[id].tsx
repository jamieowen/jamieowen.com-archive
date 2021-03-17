import { sketchesData } from "data/sketches-data";
import { createStaticMethods } from "services/get-packages-static-paths";
const { getStaticPaths, getStaticProps } = createStaticMethods(sketchesData);
export { getStaticPaths, getStaticProps };

import { PackageExamples } from "../packages/[id]";
export default PackageExamples;
