import {Mesh, MeshBasicMaterial} from "../_snowpack/pkg/three.js";
import {sketch, createGeometryFactory} from "../_snowpack/pkg/@jamieowen/three.js";
import {sync, fromRAF} from "../_snowpack/pkg/@thi.ng/rstream.js";
import {map, comp} from "../_snowpack/pkg/@thi.ng/transducers.js";
import {threeRaycastPlane, gestureStream3d} from "./lib/gestures-fn-style.js";
import {ease} from "./lib/easing.js";
sketch(({scene, configure, camera, domElement, resize, render}) => {
  const gest = gestureStream3d(domElement, resize, [threeRaycastPlane(camera)]);
  const geom = createGeometryFactory();
  const mesh = new Mesh(geom.create("plane"), new MeshBasicMaterial({color: "white"}));
  scene.add(mesh);
  sync({
    src: {
      raf: fromRAF(),
      position: gest.transform(map((ev) => ev.position))
    },
    xform: comp(map(({position}) => position), map(ease(0.2)))
  }).subscribe({
    next: (position) => {
      mesh.position.fromArray(position);
    }
  });
  configure({
    width: "50%",
    height: "50%"
  });
  render(() => {
  });
});
