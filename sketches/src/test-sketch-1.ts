import {
  WebGLRenderer,
  BoxBufferGeometry,
  PlaneBufferGeometry,
  CylinderBufferGeometry,
  BufferGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  DoubleSide,
  BackSide,
  HemisphereLight,
  DirectionalLight,
  SpotLight,
  PointLight,
  MeshMatcapMaterial,
  Color,
  Scene,
  Matrix4,
  AmbientLight,
  Shape,
  Vector2,
  Vector3,
  ExtrudeBufferGeometry,
  Group,
  Path,
  TextureLoader,
} from "three";

import * as gscSub from "@thi.ng/geom-subdiv-curve";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { cloneDeep } from "lodash";
import { resizeObserverStream } from "@jamieowen/three-toolkit";

import {
  Render,
  Bodies,
  Engine,
  Runner,
  World,
  Mouse,
  Body,
  Common,
  Vector,
  IRendererOptions,
} from "matter-js";

const renderer = new WebGLRenderer({
  logarithmicDepthBuffer: true,
  antialias: true,
});

document.body.appendChild(renderer.domElement);

const loadTexture = (url: string) => {
  const loader = new TextureLoader();
  const texture = loader.load(url, (texture) => {
    texture.needsUpdate = true;
  });
  return texture;
};

const matcap1 = loadTexture(
  "https://raw.githubusercontent.com/nidorx/matcaps/master/512/C7C0AC_2E181B_543B30_6B6270-512px.png"
);
const matcap2 = loadTexture(
  "https://raw.githubusercontent.com/nidorx/matcaps/master/512/C7C7D7_4C4E5A_818393_6C6C74-512px.png"
);

const matcap3 = loadTexture(
  "https://raw.githubusercontent.com/nidorx/matcaps/master/512/C8C8C8_3F3F3F_787878_5C5C5C-512px.png"
);

const matcap4 = loadTexture(
  "https://raw.githubusercontent.com/nidorx/matcaps/master/512/C9C7BE_55514B_888279_7B6E5F-512px.png"
);

const matcap5 = loadTexture(
  "https://raw.githubusercontent.com/nidorx/matcaps/master/512/EAEAEA_B6B6B6_CCCCCC_C4C4C4-512px.png"
);

const targetMatcap = matcap4;

const pgeom = new PlaneBufferGeometry(1, 1, 1);

// const color = "#FEFF00";
const color = "white";
const emissive = "white";
const emissiveIntensity = 0.1;
const plane = new Mesh(
  pgeom,
  new MeshStandardMaterial({ color, side: DoubleSide })
);
const geom = new BoxBufferGeometry(1, 1, 1, 1, 1, 1);
geom.applyMatrix4(new Matrix4().makeTranslation(0.5, 0, -0.5));
const mesh1 = new Mesh(
  geom,
  new MeshMatcapMaterial({
    color,
    matcap: matcap5,
    // emissive,
    // emissiveIntensity,
    side: BackSide,
  })
);
const mesh2 = new Mesh(
  geom,
  new MeshMatcapMaterial({
    color,
    matcap: matcap5,
    // emissive,
    // emissiveIntensity,
    side: BackSide,
  })
);
const mesh3 = new Mesh(
  geom,
  new MeshMatcapMaterial({
    matcap: matcap5,
    color,
    side: BackSide,
  })
);

const camera = new PerspectiveCamera(60);
const scene = new Scene();
const width = 1500;
const height = 600;

const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(width, height);
renderer.setPixelRatio(2);
camera.aspect = width / height;

const ambLight = new AmbientLight("white", 0.8);
const hemLight = new HemisphereLight(0xffffff, 0x000000, 0.6);
const dirLight = new DirectionalLight();
const pointLight1 = new PointLight("white", 0.1, 10);
const pointLight2 = new PointLight("white", 0.2, 10);
const pointLight3 = new PointLight("white", 0.3, 10);

const pointLightMain = new PointLight("white", 1.5);
// scene.add(ambLight);
scene.add(dirLight);
// scene.add(pointLight1);
// scene.add(pointLight2);
// scene.add(pointLight3);
scene.add(pointLightMain);
scene.add(hemLight);

dirLight.position.set(0, 1, 3);

pointLight1.position.set(-10, 1, 0);
pointLight2.position.set(0, 0.1, -0.6);
pointLight3.position.set(10, 0, -0.4);

pointLightMain.position.set(0, 1, 2);

// S  = O/H, C = A/H, T = O/A -
// Given we know theta which is the field of view / 2.
// We know the opposite angle which is the height / 2.
// SO = H, gives us the hypotenuse..
// IN this case to find the distance from the camera, we need the adjacent side
// CH = A;
// We don't have the hypotenuse so we need to calculate it first

const cameraDistance = (fov: number, height: number) => {
  const fovRad = (Math.PI / 180) * fov;
  const theta = ((Math.PI / 180) * fov) / 2;
  const h = (Math.sin(theta) * height) / 2;
  const distance = Math.cos(theta) * h;
  return distance;
};

const cameraProjectedDimensions = (
  fov: number,
  aspect: number,
  distance: number
) => {
  const fovRad = (Math.PI / 180) * fov;
  // TA =
  const height = Math.tan(fovRad / 2) * distance * 2;
  const width = height * aspect;
  return { width, height };
};

scene.add(mesh1, mesh2, mesh3);
scene.add(camera);

const distance = cameraDistance(camera.fov, height);
const projDims = cameraProjectedDimensions(camera.fov, camera.aspect, 10);
const boxDims = { width: projDims.width / 3, height: projDims.height };
const boxMinX = -projDims.width / 2;
const boxDepth = 2;
const extrudeDepth = 0.5;
const bevelThickness = 0.05; // adds x2 of this. ( on each end )

mesh1.scale.y = mesh2.scale.y = mesh3.scale.y = boxDims.height;
mesh1.scale.z = mesh2.scale.z = mesh3.scale.z = boxDepth;
mesh1.scale.x = mesh2.scale.x = mesh3.scale.x = boxDims.width * 0.99999; // log depth to prevent

mesh1.position.x = boxMinX;
mesh2.position.x = boxMinX + boxDims.width;
mesh3.position.x = boxMinX + boxDims.width * 2;

console.log(projDims);
console.log(distance);

const createMatterEngine = () => {
  const engine = Engine.create();
  const world = engine.world;
  const runner = Runner.create();
  Runner.run(runner, engine);
  return {
    engine,
    world,
    runner,
  };
};

const createMatterRender = (
  element: HTMLElement,
  engine: Engine,
  options: IRendererOptions = {}
) => {
  const { width = 800, height = 600 } = options;
  const render = Render.create({
    element,
    engine,
    options: {
      // @ts-ignore // types aren't right
      showAxes: true,
      ...options,
      width,
      height,
    },
  });
  Render.run(render);
  // @ts-ignore // types aren't right
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: width, y: height },
  });

  return render;
};

const createWalls = (
  world: World,
  options: {
    width: number;
    height: number;
    thickness: number;
  }
) => {
  const { width, height, thickness = 10 } = options;
  const w2 = width / 2;
  const h2 = height / 2;
  const t2 = thickness / 2;
  World.add(world, [
    // top & bottom
    Bodies.rectangle(w2, t2, width, thickness, { isStatic: true }),
    Bodies.rectangle(w2, height - t2, width, thickness, { isStatic: true }),
    // left & right
    Bodies.rectangle(t2, h2, thickness, height, { isStatic: true }),
    Bodies.rectangle(width - t2, h2, thickness, height, { isStatic: true }),
  ]);
};

const createBodyTypes = () => {
  const s = 0.8;
  return [
    Bodies.rectangle(0, 0, 100 * s, 100 * s, {
      chamfer: { radius: 20 * s },
    }),

    Bodies.rectangle(0, 0, 100 * s, 100 * s, {
      chamfer: { radius: [90, 0, 0, 0] },
    }),

    Bodies.rectangle(0, 0, 200 * s, 200 * s, {
      chamfer: { radius: [150, 20, 40, 20] },
    }),

    Bodies.rectangle(0, 0, 200 * s, 200 * s, {
      chamfer: { radius: [150, 20, 150, 20] },
    }),

    Bodies.rectangle(0, 0, 200 * s, 50 * s, {
      chamfer: { radius: [25, 25, 0, 0] },
    }),

    Bodies.rectangle(0, 0, 40 * s, 40 * s, {
      chamfer: { radius: [25, 25, 0, 0] },
    }),

    Bodies.polygon(0, 0, 8 * s, 80 * s, {
      chamfer: { radius: 30 },
    }),

    Bodies.polygon(0, 0, 5 * s, 80 * s, {
      chamfer: { radius: [10, 40, 20, 40, 10] },
    }),

    Bodies.polygon(0, 0, 3 * s, 50 * s, {
      chamfer: { radius: [20, 0, 20] },
    }),
  ];
};

const addBodies = (world: World, bodyTypes: Body[], count: number) => {
  const bodies = new Array(count).fill(0).map(() => {
    const type = Math.round(Math.random() * (bodyTypes.length - 1));
    const body = bodyTypes[type];
    body.label = type.toString();
    const clone = cloneDeep(body);

    clone.id = Common.nextId();
    Body.setPosition(clone, { x: 200, y: 200 });
    return clone;
  });
  World.add(world, bodies);
  return bodies;
};

const matterBodyToGeometry = (body: Body) => {
  const shape = new Shape();

  const points = body.vertices.map((v) => [v.x, v.y]);
  const subdiv = gscSub.subdivide(points, gscSub.SUBDIV_CHAIKIN_CLOSED, 4);
  const vectors = subdiv.map(([x, y]) => ({ x, y }));

  shape.setFromPoints(vectors as Vector2[]); // signature compatible with three Vector2
  const width = body.bounds.max.x - body.bounds.min.y;
  const height = body.bounds.max.y - body.bounds.min.y;
  const bevel = Math.min(width, height) * 0.05; // calc bevel from shape dimensions

  const geometry = new ExtrudeBufferGeometry(shape, {
    steps: 1,
    depth: extrudeDepth,
    bevelEnabled: false,
    bevelThickness: bevelThickness, //boxDepth * 0.6,
    bevelSize: bevel,
    bevelOffset: -bevel,
    bevelSegments: 5,
  }) as BufferGeometry;

  console.log("VERT COUNT", geometry.getAttribute("position").array.length / 3);
  return geometry;
};

const createMeshFromBody = (
  body: Body,
  bodyGeometries: BufferGeometry[],
  color: string
) => {
  const type = parseInt(body.label);
  const geometry = bodyGeometries[type];
  const col = new Color(color);
  col.offsetHSL(0, 0, 0.4);
  return new Mesh(
    geometry,
    new MeshMatcapMaterial({
      matcap: targetMatcap,
      // new MeshStandardMaterial({
      // color: col,
      color: "white",
      // toneMapped: true,
      // flatShading: true,
      // wireframe: true,
      // emissive: color,
      // emissiveIntensity: 0.1,
      // side: DoubleSide,
    })
  );
};

const colors = [
  "red",
  "pink",
  "yellow",
  "blue",
  "green",
  "white",
  "hotpink",
  "chartreuse",
  "crimson",
];

const createMatterScene = (
  width: number,
  height: number,
  bodyTypes: Body[],
  bodyGeometries: BufferGeometry[]
) => {
  const { runner, world, engine } = createMatterEngine();
  const render = createMatterRender(document.body, engine, {
    width,
    height,
  });
  createWalls(world, {
    width,
    height,
    thickness: 10,
  });
  const bodies = addBodies(world, bodyTypes, 5);
  const meshes = bodies.map((body, i) =>
    createMeshFromBody(body, bodyGeometries, colors[i % (colors.length - 1)])
  );
  const group = new Group();
  group.add.apply(group, meshes);

  let frame: any = undefined;
  const update = () => {
    meshes.forEach((mesh, i) => {
      const body = bodies[i];
      mesh.position.x = body.position.x;
      mesh.position.y = body.position.y;
      mesh.rotation.z = body.angle;
    });
    frame = requestAnimationFrame(update);
  };
  update();

  return {
    render,
    runner,
    world,
    engine,
    group,
    stop: () => {
      cancelAnimationFrame(frame);
      Runner.stop(runner);
    },
    start: () => {
      Runner.start(runner, engine);
    },
  };
};

/**
 * Setup
 */
const bodyTypes = createBodyTypes();
const bodyGeometries = bodyTypes.map(matterBodyToGeometry);

const world1 = createMatterScene(width / 3, height, bodyTypes, bodyGeometries);
const world2 = createMatterScene(width / 3, height, bodyTypes, bodyGeometries);
const world3 = createMatterScene(width / 3, height, bodyTypes, bodyGeometries);

const scale = projDims.height / height;
// console.log(scale, , projDims.width / width);

world1.group.scale.set(scale, -scale, 1);
world2.group.scale.set(scale, -scale, 1);
world3.group.scale.set(scale, -scale, 1);

const gz = -boxDepth + bevelThickness; // geometry extrusion goes +z
const gy = boxDims.height / 2;
world1.group.position.set(boxMinX, gy, gz);
world2.group.position.set(boxMinX + boxDims.width, gy, gz);
world3.group.position.set(boxMinX + boxDims.width * 2, gy, gz);

scene.add(world1.group);
scene.add(world2.group);
scene.add(world3.group);

// offset camera for scroll

camera.position.z = 10;
camera.position.y = 0;
// camera.near = 10.0001;

camera.updateProjectionMatrix();

let time = 0;

const update = () => {
  time += 100;
  requestAnimationFrame(update);
};
update();
const tick = () => {
  const grav = Math.sin(time * 0.0001);
  // console.log(grav);
  world1.world.gravity.y = grav;
  setTimeout(tick, 100);
};

tick();

const button = document.createElement("button");
button.innerText = "debug";
document.body.appendChild(button);
button.onclick = () => {
  console.log(world1.world.bodies);
};

const renderThree = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(renderThree);
};

renderThree();
