import { BoxBufferGeometry, SphereBufferGeometry } from "three";

type BoxBufferGeometryParams = Partial<{
  width: number;
  height: number;
  depth: number;
  widthSegments: number;
  heightSegments: number;
  depthSegments: number;
}>;

const defaultBoxBufferParams = (
  params: BoxBufferGeometryParams
): BoxBufferGeometryParams => {
  return {
    width: 1,
    height: 1,
    depth: 1,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
    ...params,
  };
};

export const boxGeometry = (params: BoxBufferGeometryParams = {}) => {
  const p = defaultBoxBufferParams(params);
  const a = [
    p.width,
    p.height,
    p.depth,
    p.widthSegments,
    p.heightSegments,
    p.depthSegments,
  ];
  // memoize
  return new BoxBufferGeometry(...a);
};

export const sphereGeometry = (): SphereBufferGeometry => {
  return new SphereBufferGeometry();
};
