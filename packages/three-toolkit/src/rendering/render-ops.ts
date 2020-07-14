// export const renderScene = (scene) => tx.map( r=>r.renderer.render(sce))
import * as tx from '@thi.ng/transducers';

export const setup = (fn, l = false) => tx.sideEffect((x) => {
  if (!l) {
    fn(x);
    l = !l;
  }
});

export const update = (fn) => tx.sideEffect(fn);

export const render = (
  scene?,camera?
) => tx.sideEffect((e: any) => {
  scene = scene ? scene : e.scene;
  camera = camera ? camera : e.camera;
  e.renderer.render(scene, camera)
});

export const addToDom = () => setup((e) => {
  e.resize.domElement.appendChild(e.renderer.domElement);
});

// export const resize = (fn) => ( state:any={} ) => tx.sideEffect((e:any)=>{
export const resize = (fn) => (state: any = {}) => tx.sideEffect((e: any) => {
  const { width, height } = e.resize;
  if (width !== state.width || height !== state.height) {
    state.width = width; state.height = height;
    fn(e, width, height);
  }
})

export const resizeRenderer = resize((e, w, h) => e.renderer.setSize(w, h));

export const resizeCamera = (cam?) => resize(({camera}, w, h) => {
  cam = cam ? cam : camera;
  cam.aspect = w / h;
  cam.updateProjectionMatrix();
})();
