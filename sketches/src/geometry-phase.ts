import {
  createGeometryFactory,
  sketch,
  renderViewportGrid,
  timerStream,
  timerStreamRandomFrequency,
  paletteCssNames,
  paletteComplement,
  filterContrastRatio2,
} from "@jamieowen/three-toolkit";
import {
  MeshBasicMaterial,
  MeshStandardMaterial,
  Scene,
  Mesh,
  Color,
  PointLight,
  SpotLight,
  Plane,
  DirectionalLight,
  AmbientLight,
  HemisphereLight,
  Vector3,
  Vector4,
} from "three";
import { ShadowMesh } from "three/examples/jsm/objects/ShadowMesh";
import { repeat } from "@thi.ng/transducers";
import { CSS_NAMES, rgbaCss } from "@thi.ng/color";

const colors = filterContrastRatio2(
  paletteComplement(paletteCssNames()),
  1.4,
  2
);
console.log("Colors", colors.length, colors);
sketch(({ render, renderer, camera, configure }) => {
  const geometries = createGeometryFactory();
  const gw = 4;
  const gh = 3;
  renderer.shadowMap.enabled = true;
  const lights = [
    // new PointLight(),
    // new SpotLight("white", 0.6, 10),
    new DirectionalLight("white", 0.6),
    new DirectionalLight("white", 0.6),
  ];
  const scenes = [...repeat(0, gw * gh)].map((x, i) => {
    const color1 = rgbaCss(colors[i][0]);
    const color2 = rgbaCss(colors[i][1]);

    const geom = geometries.create("sphere");
    const material = new MeshStandardMaterial({
      // color: Object.keys(CSS_NAMES)[i * 4],
      color: color1,
      flatShading: true,
    });
    const mesh = new Mesh(geom, material);
    mesh.rotation.z = Math.PI * 0.25;
    const scene = new Scene();
    const plane = new Mesh(
      geometries.create("plane"),
      new MeshStandardMaterial({ color: color2 })
    );
    plane.receiveShadow = true;
    plane.material.emissiveIntensity = 0.5;
    plane.material.emissive.set(color2);
    scene.add(plane);
    plane.scale.multiplyScalar(10);

    // Colors..
    // Movement. all as streams. emitting a single point ( or trail )
    //  Orbit Movement, Figure of 8. Meander, Random Walk,  Noise.  Trail any movement ( stagger multiple historical positions), offs
    // Influence a position towards a mouse pointer or something? ( Attract or Repel )

    mesh.castShadow = true;
    scene.receiveShadow = true;
    const amb = new AmbientLight(0xffffff, 0.2);
    const hem = new HemisphereLight();
    hem.intensity = 0.2;
    // scene.add(hem);
    scene.add(amb);

    const light = lights[i % (lights.length - 1)].clone();
    light.castShadow = true;
    light.intensity = 0.8;
    light.shadow.camera.left = -2;
    // light.shadow.camera.lef
    scene.add(light);
    const len = gw * gh;
    const theta = len - ((Math.PI * 2) / len) * i;
    const dist = 5;
    light.position.set(Math.cos(theta) * dist, Math.sin(theta) * dist, 1);
    light.lookAt(0, 0, 0);
    // light.color.set(color1);
    scene.background = new Color(Object.keys(CSS_NAMES)[i]);
    scene.add(mesh);

    // const shadowMesh = new ShadowMesh(mesh);
    // const shadowPlane = new Plane(new Vector3(0, 0, 1), 0.011);
    // const shadowLight = new Vector4(4, 4, 4, 1);
    // shadowMesh.update(shadowPlane, shadowLight);
    // scene.add(shadowMesh);

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
