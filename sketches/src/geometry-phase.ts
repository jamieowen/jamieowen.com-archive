import {
  createGeometryFactory,
  sketch,
  renderViewportGrid,
  timerStream,
  timerStreamRandomFrequency,
} from "@jamieowen/three-toolkit";
import { MeshBasicMaterial, Scene, Mesh, Color } from "three";
import { repeat } from "@thi.ng/transducers";

sketch(({ render, renderer, camera, configure }) => {
  const geometries = createGeometryFactory();
  const gw = 4;
  const gh = 3;
  const scenes = [...repeat(0, gw * gh)].map(() => {
    const geom = geometries.create("sphere");
    const material = new MeshBasicMaterial({ color: "white" });
    const mesh = new Mesh(geom, material);
    const scene = new Scene();
    scene.background = new Color("blue");
    scene.add(mesh);
    return scene;
  });

  timerStream({
    repeat: 3,
    frequency: timerStreamRandomFrequency({
      step: 20,
    }),
  }).subscribe({
    next: (ev) => {
      console.log("Time::", ev.delta, ev.time, ev.next, ev.last);
    },
  });

  configure({
    width: "1024px",
    height: "768px",
  });

  render(() => {
    renderViewportGrid(renderer, {
      grid: [gw, gh],
      render: (i, [x, y], [w, h]) => {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scenes[i], camera);
      },
    });
    return false;
  });
});
