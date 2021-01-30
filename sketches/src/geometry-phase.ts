import {
  createGeometryFactory,
  sketch,
  renderViewportGrid,
} from "@jamieowen/three";

import { timerStream, timerStreamRandomFrequency } from "@jamieowen/browser";

import {
  paletteCssNames,
  paletteComplement,
  filterContrastRatio2,
} from "@jamieowen/color";

import {
  MeshBasicMaterial,
  MeshStandardMaterial,
  Scene,
  Mesh,
  PointLight,
  SpotLight,
  Plane,
  DirectionalLight,
  AmbientLight,
  HemisphereLight,
  Vector3,
  Vector4,
  Light,
} from "three";
import { ShadowMesh } from "three/examples/jsm/objects/ShadowMesh";
import { repeat } from "@thi.ng/transducers";
import { reactive } from "@thi.ng/rstream";
import { CSS_NAMES, rgbaCss, Color } from "@thi.ng/color";

const geometries = createGeometryFactory();

const colors = filterContrastRatio2(
  paletteComplement(paletteCssNames()),
  1.9,
  2.5
);

const createObject = (scene: Scene, color1: Color, color2: Color) => {
  const colorStream = reactive({ color1, color2 });
  const geometryStream = reactive(geometries.create("sphere"));

  // Foreground Object
  const object = new Mesh(
    geometryStream.deref(),
    new MeshStandardMaterial({
      flatShading: true,
    })
  );
  object.rotation.z = Math.PI * 0.25;
  object.castShadow = true;

  // Background plane
  const plane = new Mesh(
    geometries.create("plane"),
    new MeshStandardMaterial({
      metalness: 0.3,
      roughness: 1,
    })
  );

  plane.receiveShadow = true;
  (plane.material as MeshStandardMaterial).emissiveIntensity = 0.5;
  (plane.material as MeshStandardMaterial).emissive.fromArray(color2 as any);
  plane.scale.multiplyScalar(10);

  colorStream.subscribe({
    next: ({ color1, color2 }) => {
      (object.material as MeshStandardMaterial).color.fromArray(color1);
      (plane.material as MeshStandardMaterial).color.fromArray(color2);
    },
  });

  scene.add(plane);
  scene.add(object);

  return {
    object,
    plane,
    colorStream,
    geometryStream,
  };
};

const createLighting = (
  scene: Scene,
  lights: Light[],
  gw: number,
  gh: number,
  i: number
) => {
  const amb = new AmbientLight(0xffffff, 0.4);
  const hem = new HemisphereLight();
  hem.intensity = 0.3;
  scene.add(hem);
  // scene.add(amb);

  const light = lights[i % (lights.length - 1)].clone();
  light.castShadow = true;
  (light as PointLight).intensity = 0.8;
  // light.shadow.camera.left = -2;
  // light.shadow.camera.lef
  scene.add(light);

  // Light Rotation
  const len = gw * gh;
  const theta = len - ((Math.PI * 2) / len) * i;
  const dist = 5;
  light.position.set(Math.cos(theta) * dist, Math.sin(theta) * dist, 1);
  light.lookAt(0, 0, 0);
  // light.color.set(color1);
  // scene.background = new Color(Object.keys(CSS_NAMES)[i]);
  // scene.add(mesh);

  return {
    light,
    hemLight: hem,
  };
};

sketch(({ render, renderer, camera, configure }) => {
  const gw = 4;
  const gh = 3;
  renderer.shadowMap.enabled = true;
  const lights = [
    new PointLight(),
    new SpotLight("white", 0.6, 14),
    new DirectionalLight("white", 0.6),
    new DirectionalLight("white", 0.6),
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
      ...lightDeps,
    };
  });

  timerStream({
    // repeat: 3,
    frequency: timerStreamRandomFrequency({
      step: 50,
      min: 200,
      max: 600,
    }),
  }).subscribe({
    next: (_ev) => {
      // const randScene = Math.round(Math.random() * (scenes.length - 1));
      // const randColor = Math.round(Math.random() * (colors.length - 1));
      // const pick = scenes[randScene];
      // const color = colors[randColor];
      // pick.colorStream.next({ color1: color[0], color2: color[1] });
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

        renderer.render(scenes[i].scene, camera);
      },
    });
    return false;
  });
});
