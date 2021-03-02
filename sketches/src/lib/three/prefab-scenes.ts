import {
  Group,
  Object3D,
  BackSide,
  DoubleSide,
  SphereBufferGeometry,
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  FrontSide,
  Matrix4,
  BufferGeometryUtils,
  CameraHelper,
  MeshLambertMaterialParameters,
  Color,
  MeshLambertMaterial,
} from "three";
import { createLightHelpers } from "@jamieowen/three";
import { createMeshFactory } from "./mesh-factory";
import { reactiveOptsFactory } from "../core";

const mf = createMeshFactory();

/**
 * Simplified dome setup..
 * @param parent
 */
export const createDomeScene = (parent?: Object3D) => {
  const group = new Group();
  if (parent) {
    parent.add(group);
  }

  // Reset
  mf.scale.set(1, 1, 1);
  mf.scale.multiplyScalar(30);

  // Dome
  mf.lambertMaterial({
    color: "crimson",
    side: BackSide,
  });

  const geom = new SphereBufferGeometry(1, 20, 20);
  mf.setGeometry(geom);
  const dome = mf.mesh(group);

  // Floor
  mf.lambertMaterial({
    // mf.standardMaterial({
    color: "crimson",
    side: DoubleSide,
    emissive: "crimson",
    emissiveIntensity: 0.6,
  });
  mf.scale.multiplyScalar(10);
  mf.plane();
  const floor = mf.mesh(group);
  floor.rotation.x = Math.PI * -0.5;

  return {
    group,
    dome,
    floor,
  };
};

const createDome = (parent: Object3D) => {
  const dome = new SphereBufferGeometry(1, 20, 30).applyMatrix4(
    new Matrix4().makeRotationX(Math.PI * -0.5)
  );
  mf.setGeometry(dome);
  mf.lambertMaterial({
    color: "crimson",
    emissive: "red",
    emissiveIntensity: 0.2,
    side: BackSide,
  });
  return mf.mesh(parent);
};

const createFloor = (parent: Object3D, color: string = "crimson") => {
  // Floor
  mf.lambertMaterial({
    color: "crimson",
    emissive: "crimson",
    emissiveIntensity: 0.2,
  });
  mf.scale.multiplyScalar(10);
  mf.plane();
  const floor = mf.mesh(parent);
  floor.rotation.x = Math.PI * -0.5;
  return floor;
};

interface DomeSimpleLightOpts {
  color: string | number;
}

export const createDomeOpts = reactiveOptsFactory<DomeSimpleLightOpts>({
  color: "crimson",
});

export const createDomeSimpleLight = (
  parent: Object3D,
  opts: ReturnType<typeof createDomeOpts> = createDomeOpts({
    color: "green",
  })
) => {
  mf.scale.set(1, 1, 1);
  const dome = createDome(parent);
  dome.scale.multiplyScalar(30);
  const floor = createFloor(parent);
  floor.scale.multiplyScalar(10);
  floor.position.y = -5;
  floor.receiveShadow = true;
  const amb = new AmbientLight("white", 0.4);
  const dir = new DirectionalLight("white", 0.4);

  const hem = new HemisphereLight(0xffffff, 0x333333, 0.5);
  const lights = [amb, dir, hem];
  parent.add(amb, hem, dir);

  dir.castShadow = true;
  dir.shadow.camera.far = 50;
  dir.shadow.camera.near = 5;
  dir.shadow.camera.left = -10;
  dir.shadow.camera.right = 10;
  dir.shadow.camera.top = 10;
  dir.shadow.camera.bottom = -10;

  const shadowHelper = new CameraHelper(dir.shadow.camera);

  parent.add(shadowHelper);
  // mf.box();
  // const m = mf.mesh(parent);
  // m.castShadow = true;

  dir.position.set(2, 4, 5).multiplyScalar(4);
  // dir.

  opts.subscribe({
    next: ({ color }) => {
      // Apply color
      const fm = floor.material as MeshLambertMaterial;
      const dm = dome.material as MeshLambertMaterial;
      console.log("Apply Color");
      fm.color.set(color);
      fm.emissive.set(color).offsetHSL(0, 0, 0.1);
      dm.color.set(color).offsetHSL(0, 0.1, 0.1);
      dm.emissive.set(color).offsetHSL(0, 0, 0.1);
    },
  });

  const helpers = createLightHelpers(parent);
  parent.add(helpers);

  return {
    dome,
    lights,
    floor,
    helpers,
  };
};
