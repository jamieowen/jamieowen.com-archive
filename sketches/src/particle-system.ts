import {
  sketch,
  // ParticleSystem,
  createGeometryFactory,
  // emitter as createEmitter,
} from "@jamieowen/three";
import {
  InstancedMesh,
  MeshBasicMaterial,
  Object3D,
  DynamicDrawUsage,
} from "three";

sketch(({ render, scene, configure }) => {
  configure({
    width: "1024px",
    height: "768px",
  });

  // Create System & Emitters
  const count = 100;
  // const system = new ParticleSystem();
  // const emitter = createEmitter({
  //   id: "",
  //   behaviours: [],
  //   // style - an additional custom flag to seperate renderers for styling purposes ( i.e. differennt render geometry )
  //   signature: "",
  //   // spawn: {},
  // });
  // system.add(emitter);

  // emitter.emit();

  // attach renderers
  // either listening to cpu, based or gpu based type emitters/ styles / etc.

  // system.attach(type, (signature, emitters: []) => {});
  // {
  //   create:()=>{

  //   },
  //   update:()=>{

  //   }
  // }
  const geom = createGeometryFactory();
  const mesh = new InstancedMesh(
    geom.create("sphere"),
    new MeshBasicMaterial(),
    count
  );
  mesh.instanceMatrix.setUsage(DynamicDrawUsage);
  // mesh.count = 3;
  scene.add(mesh);

  const obj3d = new Object3D();
  obj3d.scale.multiplyScalar(0.1);

  // console.log(psystem.main);
  render(() => {
    // psystem.update();
    // psystem.main.forEach(({ position }, i) => {
    //   obj3d.position.fromArray(position);

    //   obj3d.updateMatrix();
    //   mesh.setMatrixAt(i, obj3d.matrix);
    // });

    // mesh.count = psystem.main.n;
    mesh.instanceMatrix.needsUpdate = true;
  });
});

// meshinstnac
