import {
  createGeometryFactory,
  sketch,
  renderViewportGrid
} from "../_snowpack/pkg/@jamieowen/three.js";
import {timerStream, timerStreamRandomFrequency} from "../_snowpack/pkg/@jamieowen/browser.js";
import {
  paletteCssNames,
  paletteComplement,
  filterContrastRatio2
} from "../_snowpack/pkg/@jamieowen/color.js";
import {
  MeshStandardMaterial,
  Scene,
  Mesh,
  PointLight,
  SpotLight,
  DirectionalLight,
  AmbientLight,
  HemisphereLight
} from "../_snowpack/pkg/three.js";
import {repeat} from "../_snowpack/pkg/@thi.ng/transducers.js";
import {reactive} from "../_snowpack/pkg/@thi.ng/rstream.js";
const geometries = createGeometryFactory();
const colors = filterContrastRatio2(paletteComplement(paletteCssNames()), 1.9, 2.5);
const createObject = (scene, color1, color2) => {
  const colorStream = reactive({color1, color2});
  const geometryStream = reactive(geometries.create("sphere"));
  const object = new Mesh(geometryStream.deref(), new MeshStandardMaterial({
    flatShading: true
  }));
  object.rotation.z = Math.PI * 0.25;
  object.castShadow = true;
  const plane = new Mesh(geometries.create("plane"), new MeshStandardMaterial({
    metalness: 0.3,
    roughness: 1
  }));
  plane.receiveShadow = true;
  plane.material.emissiveIntensity = 0.5;
  plane.material.emissive.fromArray(color2);
  plane.scale.multiplyScalar(10);
  colorStream.subscribe({
    next: ({color1: color12, color2: color22}) => {
      object.material.color.fromArray(color12);
      plane.material.color.fromArray(color22);
    }
  });
  scene.add(plane);
  scene.add(object);
  return {
    object,
    plane,
    colorStream,
    geometryStream
  };
};
const createLighting = (scene, lights, gw, gh, i) => {
  const amb = new AmbientLight(16777215, 0.4);
  const hem = new HemisphereLight();
  hem.intensity = 0.3;
  scene.add(hem);
  const light = lights[i % (lights.length - 1)].clone();
  light.castShadow = true;
  light.intensity = 0.8;
  scene.add(light);
  const len = gw * gh;
  const theta = len - Math.PI * 2 / len * i;
  const dist = 5;
  light.position.set(Math.cos(theta) * dist, Math.sin(theta) * dist, 1);
  light.lookAt(0, 0, 0);
  return {
    light,
    hemLight: hem
  };
};
sketch(({render, renderer, camera, configure}) => {
  const gw = 4;
  const gh = 3;
  renderer.shadowMap.enabled = true;
  const lights = [
    new PointLight(),
    new SpotLight("white", 0.6, 14),
    new DirectionalLight("white", 0.6),
    new DirectionalLight("white", 0.6)
  ];
  const scenes = [...repeat(0, gw * gh)].map((_x, i) => {
    const scene = new Scene();
    const color1 = colors[i][0];
    const color2 = colors[i][1];
    const objectDeps = createObject(scene, color1, color2);
    const lightDeps = createLighting(scene, lights, gw, gh, i);
    return {
      scene,
      ...objectDeps,
      ...lightDeps
    };
  });
  timerStream({
    frequency: timerStreamRandomFrequency({
      step: 50,
      min: 200,
      max: 600
    })
  }).subscribe({
    next: (_ev) => {
    }
  });
  configure({
    width: "1024px",
    height: "768px"
  });
  render(() => {
    renderViewportGrid(renderer, {
      grid: [gw, gh],
      render: (i, [x, y], [w, h]) => {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scenes[i].scene, camera);
      }
    });
    return false;
  });
});
