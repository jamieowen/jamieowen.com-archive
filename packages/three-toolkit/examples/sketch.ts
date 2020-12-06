import { sketch, lambertMaterial } from "../src/render/sketch";
import { Scene, PerspectiveCamera } from "three";

const scene = new Scene();
const camera = new PerspectiveCamera();

lambertMaterial();

// const cube =

sketch(({ renderer }) => {
  // console.log( 'sketch' );
});
