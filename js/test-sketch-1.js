import {
  WebGLRenderer,
  BoxBufferGeometry,
  PlaneBufferGeometry,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  DoubleSide,
  BackSide,
  HemisphereLight,
  DirectionalLight,
  PointLight,
  MeshMatcapMaterial,
  Color,
  Scene,
  Matrix4,
  AmbientLight,
  Shape,
  ExtrudeBufferGeometry,
  Group,
  TextureLoader
} from "../_snowpack/pkg/three.js";
import * as gscSub from "../_snowpack/pkg/@thi.ng/geom-subdiv-curve.js";
import {OrbitControls} from "../_snowpack/pkg/three/examples/jsm/controls/OrbitControls.js";
import {cloneDeep} from "../_snowpack/pkg/lodash.js";
import {
  Render,
  Bodies,
  Engine,
  Runner,
  World,
  Body,
  Common
} from "../_snowpack/pkg/matter-js.js";
const renderer = new WebGLRenderer({
  logarithmicDepthBuffer: true,
  antialias: true
});
document.body.appendChild(renderer.domElement);
const loadTexture = (url) => {
  const loader = new TextureLoader();
  const texture = loader.load(url, (texture2) => {
    texture2.needsUpdate = true;
  });
  return texture;
};
const matcap1 = loadTexture("https://raw.githubusercontent.com/nidorx/matcaps/master/512/C7C0AC_2E181B_543B30_6B6270-512px.png");
const matcap2 = loadTexture("https://raw.githubusercontent.com/nidorx/matcaps/master/512/C7C7D7_4C4E5A_818393_6C6C74-512px.png");
const matcap3 = loadTexture("https://raw.githubusercontent.com/nidorx/matcaps/master/512/C8C8C8_3F3F3F_787878_5C5C5C-512px.png");
const matcap4 = loadTexture("https://raw.githubusercontent.com/nidorx/matcaps/master/512/C9C7BE_55514B_888279_7B6E5F-512px.png");
const matcap5 = loadTexture("https://raw.githubusercontent.com/nidorx/matcaps/master/512/EAEAEA_B6B6B6_CCCCCC_C4C4C4-512px.png");
const targetMatcap = matcap4;
const pgeom = new PlaneBufferGeometry(1, 1, 1);
const color = "white";
const emissive = "white";
const emissiveIntensity = 0.1;
const plane = new Mesh(pgeom, new MeshStandardMaterial({color, side: DoubleSide}));
const geom = new BoxBufferGeometry(1, 1, 1, 1, 1, 1);
geom.applyMatrix4(new Matrix4().makeTranslation(0.5, 0, -0.5));
const mesh1 = new Mesh(geom, new MeshMatcapMaterial({
  color,
  matcap: matcap5,
  side: BackSide
}));
const mesh2 = new Mesh(geom, new MeshMatcapMaterial({
  color,
  matcap: matcap5,
  side: BackSide
}));
const mesh3 = new Mesh(geom, new MeshMatcapMaterial({
  matcap: matcap5,
  color,
  side: BackSide
}));
const camera = new PerspectiveCamera(60);
const scene = new Scene();
const width = 1500;
const height = 600;
const controls = new OrbitControls(camera, renderer.domElement);
renderer.setSize(width, height);
renderer.setPixelRatio(2);
camera.aspect = width / height;
const ambLight = new AmbientLight("white", 0.8);
const hemLight = new HemisphereLight(16777215, 0, 0.6);
const dirLight = new DirectionalLight();
const pointLight1 = new PointLight("white", 0.1, 10);
const pointLight2 = new PointLight("white", 0.2, 10);
const pointLight3 = new PointLight("white", 0.3, 10);
const pointLightMain = new PointLight("white", 1.5);
scene.add(dirLight);
scene.add(pointLightMain);
scene.add(hemLight);
dirLight.position.set(0, 1, 3);
pointLight1.position.set(-10, 1, 0);
pointLight2.position.set(0, 0.1, -0.6);
pointLight3.position.set(10, 0, -0.4);
pointLightMain.position.set(0, 1, 2);
const cameraDistance = (fov, height2) => {
  const fovRad = Math.PI / 180 * fov;
  const theta = Math.PI / 180 * fov / 2;
  const h = Math.sin(theta) * height2 / 2;
  const distance2 = Math.cos(theta) * h;
  return distance2;
};
const cameraProjectedDimensions = (fov, aspect, distance2) => {
  const fovRad = Math.PI / 180 * fov;
  const height2 = Math.tan(fovRad / 2) * distance2 * 2;
  const width2 = height2 * aspect;
  return {width: width2, height: height2};
};
scene.add(mesh1, mesh2, mesh3);
scene.add(camera);
const distance = cameraDistance(camera.fov, height);
const projDims = cameraProjectedDimensions(camera.fov, camera.aspect, 10);
const boxDims = {width: projDims.width / 3, height: projDims.height};
const boxMinX = -projDims.width / 2;
const boxDepth = 2;
const extrudeDepth = 0.5;
const bevelThickness = 0.05;
mesh1.scale.y = mesh2.scale.y = mesh3.scale.y = boxDims.height;
mesh1.scale.z = mesh2.scale.z = mesh3.scale.z = boxDepth;
mesh1.scale.x = mesh2.scale.x = mesh3.scale.x = boxDims.width * 0.99999;
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
    runner
  };
};
const createMatterRender = (element, engine, options = {}) => {
  const {width: width2 = 800, height: height2 = 600} = options;
  const render = Render.create({
    element,
    engine,
    options: {
      showAxes: true,
      ...options,
      width: width2,
      height: height2
    }
  });
  Render.run(render);
  Render.lookAt(render, {
    min: {x: 0, y: 0},
    max: {x: width2, y: height2}
  });
  return render;
};
const createWalls = (world, options) => {
  const {width: width2, height: height2, thickness = 10} = options;
  const w2 = width2 / 2;
  const h2 = height2 / 2;
  const t2 = thickness / 2;
  World.add(world, [
    Bodies.rectangle(w2, t2, width2, thickness, {isStatic: true}),
    Bodies.rectangle(w2, height2 - t2, width2, thickness, {isStatic: true}),
    Bodies.rectangle(t2, h2, thickness, height2, {isStatic: true}),
    Bodies.rectangle(width2 - t2, h2, thickness, height2, {isStatic: true})
  ]);
};
const createBodyTypes = () => {
  const s = 0.8;
  return [
    Bodies.rectangle(0, 0, 100 * s, 100 * s, {
      chamfer: {radius: 20 * s}
    }),
    Bodies.rectangle(0, 0, 100 * s, 100 * s, {
      chamfer: {radius: [90, 0, 0, 0]}
    }),
    Bodies.rectangle(0, 0, 200 * s, 200 * s, {
      chamfer: {radius: [150, 20, 40, 20]}
    }),
    Bodies.rectangle(0, 0, 200 * s, 200 * s, {
      chamfer: {radius: [150, 20, 150, 20]}
    }),
    Bodies.rectangle(0, 0, 200 * s, 50 * s, {
      chamfer: {radius: [25, 25, 0, 0]}
    }),
    Bodies.rectangle(0, 0, 40 * s, 40 * s, {
      chamfer: {radius: [25, 25, 0, 0]}
    }),
    Bodies.polygon(0, 0, 8 * s, 80 * s, {
      chamfer: {radius: 30}
    }),
    Bodies.polygon(0, 0, 5 * s, 80 * s, {
      chamfer: {radius: [10, 40, 20, 40, 10]}
    }),
    Bodies.polygon(0, 0, 3 * s, 50 * s, {
      chamfer: {radius: [20, 0, 20]}
    })
  ];
};
const addBodies = (world, bodyTypes2, count) => {
  const bodies = new Array(count).fill(0).map(() => {
    const type = Math.round(Math.random() * (bodyTypes2.length - 1));
    const body = bodyTypes2[type];
    body.label = type.toString();
    const clone = cloneDeep(body);
    clone.id = Common.nextId();
    Body.setPosition(clone, {x: 200, y: 200});
    return clone;
  });
  World.add(world, bodies);
  return bodies;
};
const matterBodyToGeometry = (body) => {
  const shape = new Shape();
  const points = body.vertices.map((v) => [v.x, v.y]);
  const subdiv = gscSub.subdivide(points, gscSub.SUBDIV_CHAIKIN_CLOSED, 4);
  const vectors = subdiv.map(([x, y]) => ({x, y}));
  shape.setFromPoints(vectors);
  const width2 = body.bounds.max.x - body.bounds.min.y;
  const height2 = body.bounds.max.y - body.bounds.min.y;
  const bevel = Math.min(width2, height2) * 0.05;
  const geometry = new ExtrudeBufferGeometry(shape, {
    steps: 1,
    depth: extrudeDepth,
    bevelEnabled: false,
    bevelThickness,
    bevelSize: bevel,
    bevelOffset: -bevel,
    bevelSegments: 5
  });
  console.log("VERT COUNT", geometry.getAttribute("position").array.length / 3);
  return geometry;
};
const createMeshFromBody = (body, bodyGeometries2, color2) => {
  const type = parseInt(body.label);
  const geometry = bodyGeometries2[type];
  const col = new Color(color2);
  col.offsetHSL(0, 0, 0.4);
  return new Mesh(geometry, new MeshMatcapMaterial({
    matcap: targetMatcap,
    color: "white"
  }));
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
  "crimson"
];
const createMatterScene = (width2, height2, bodyTypes2, bodyGeometries2) => {
  const {runner, world, engine} = createMatterEngine();
  const render = createMatterRender(document.body, engine, {
    width: width2,
    height: height2
  });
  createWalls(world, {
    width: width2,
    height: height2,
    thickness: 10
  });
  const bodies = addBodies(world, bodyTypes2, 5);
  const meshes = bodies.map((body, i) => createMeshFromBody(body, bodyGeometries2, colors[i % (colors.length - 1)]));
  const group = new Group();
  group.add.apply(group, meshes);
  let frame = void 0;
  const update2 = () => {
    meshes.forEach((mesh, i) => {
      const body = bodies[i];
      mesh.position.x = body.position.x;
      mesh.position.y = body.position.y;
      mesh.rotation.z = body.angle;
    });
    frame = requestAnimationFrame(update2);
  };
  update2();
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
    }
  };
};
const bodyTypes = createBodyTypes();
const bodyGeometries = bodyTypes.map(matterBodyToGeometry);
const world1 = createMatterScene(width / 3, height, bodyTypes, bodyGeometries);
const world2 = createMatterScene(width / 3, height, bodyTypes, bodyGeometries);
const world3 = createMatterScene(width / 3, height, bodyTypes, bodyGeometries);
const scale = projDims.height / height;
world1.group.scale.set(scale, -scale, 1);
world2.group.scale.set(scale, -scale, 1);
world3.group.scale.set(scale, -scale, 1);
const gz = -boxDepth + bevelThickness;
const gy = boxDims.height / 2;
world1.group.position.set(boxMinX, gy, gz);
world2.group.position.set(boxMinX + boxDims.width, gy, gz);
world3.group.position.set(boxMinX + boxDims.width * 2, gy, gz);
scene.add(world1.group);
scene.add(world2.group);
scene.add(world3.group);
camera.position.z = 10;
camera.position.y = 0;
camera.updateProjectionMatrix();
let time = 0;
const update = () => {
  time += 100;
  requestAnimationFrame(update);
};
update();
const tick = () => {
  const grav = Math.sin(time * 1e-4);
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
