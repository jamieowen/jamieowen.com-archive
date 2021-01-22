import { PlaneBufferGeometry, Matrix4 } from "three";

const sourceGeometry = (() => {
  const geom = new PlaneBufferGeometry(1, 1, 1, 1);
  geom.applyMatrix4(new Matrix4().makeTranslation(-0.5, -0.5, 0));
  return () => {
    return geom;
  };
})();
export const createGeometry = () => {
  const geom = sourceGeometry().clone();
  console.log("ADD Geometry", geom.getAttribute("uv"));
  return geom;
};

export const updateUV = (geom: PlaneBufferGeometry) => {
  return geom;
};
