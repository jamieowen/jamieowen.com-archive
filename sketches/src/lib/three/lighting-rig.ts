import {
  Object3D,
  Group,
  PointLight,
  DirectionalLight,
  HemisphereLight,
  AmbientLight,
  SpotLight,
  Light,
  Spherical,
} from "three";
import { debounce, pubsub } from "@thi.ng/rstream";
import { reactiveOptsFactory } from "../core";
import { linear } from "../motion-streams/easing";
import { map, trace } from "@thi.ng/transducers";

type EasingFn = (t: number) => number;
type EasingType = "linear";
const EasingLookup: Record<EasingType, EasingFn> = {
  linear,
};

export interface LightingRigOpts {
  count: number;
  types: string;
  intensityDist: EasingFn;
  intensityMin: number;
  intensityMax: number;
  azimuthDist: EasingFn;
  azimuthAngle: number;
  azimuthVariance: number;
  polarDist: EasingFn;
  polarAngle: number;
  polarVariance: number;
}

export const createLightingRigOpts = reactiveOptsFactory<
  Partial<LightingRigOpts>
>({
  count: 3,
  types: "HPD",
  intensityDist: linear,
  intensityMin: 0.1,
  intensityMax: 1,
  azimuthAngle: 90,
  azimuthDist: linear,
  azimuthVariance: 1,
  polarAngle: 90,
  polarDist: linear,
  polarVariance: 1,
});

const parseLights = (types: string) => {
  return types.split("").map((char: string) => {
    switch (char) {
      case "A":
        return new AmbientLight();
      case "H":
        return new HemisphereLight();
      case "P":
        return new PointLight();
      case "D":
        return new DirectionalLight();
      case "S":
        return new SpotLight();
      default:
        console.warn(`Unrecognised light type '${char}'`);
        return new Light();
    }
  });
};

const distribute = (
  lights: Light[],
  ease: EasingFn,
  apply: (light: Light, value: number) => void,
  filter: (light: Light) => boolean = () => true
) => {
  const filtered = lights.filter(filter);
  filtered.forEach((light, i) => {
    const value = ease(i / (filtered.length - 1));
    apply(light, value);
  });
};

const assignIntensity = (lights: Light[], opts: LightingRigOpts) => {
  distribute(lights, opts.intensityDist, (light, value) => {
    light.intensity =
      opts.intensityMin + value * (opts.intensityMax - opts.intensityMin);
  });
};

const assignAzimuth = (
  lights: Light[],
  sph: Spherical,
  opts: LightingRigOpts
) => {
  distribute(
    lights,
    opts.azimuthDist,
    (light, value) => {
      console.log("light AZ", light, value);
    },
    (light: any) => !light.isHemisphereLight && !light.isAmbientLight
  );
};

const assignPolar = (
  lights: Light[],
  sph: Spherical,
  opts: LightingRigOpts
) => {
  distribute(
    lights,
    opts.polarDist,
    (light, value) => {
      console.log("light PL ", light, value);
    },
    (light: any) => !light.isHemisphereLight && !light.isAmbientLight
  );
};

export const createLightingRig = (
  parent: Object3D,
  opts: ReturnType<typeof createLightingRigOpts>
) => {
  const group = new Group();
  parent.add(group);
  const sphHelper = new Spherical();

  const lights = {
    types: "none",
    lights: [] as Light[],
  };
  // Would be nice to split streams across properties.
  // As some invalidation system
  // Later...
  opts
    .subscribe(debounce(10))
    .subscribe({
      next: (opts) => {
        if (lights.types !== opts.types) {
          lights.lights.forEach((l) => group.remove(l));
          lights.lights = parseLights(opts.types);
          lights.lights.forEach((l) => group.add(l));
          lights.types = opts.types;
          console.log("update lights");
        }
        assignIntensity(lights.lights, opts);
        assignPolar(lights.lights, sphHelper, opts);
        assignAzimuth(lights.lights, sphHelper, opts);
      },
      error: () => {},
    })
    .subscribe(trace("Update Opts"));

  return {
    lights: [] as any[],
    group,
  };
};
