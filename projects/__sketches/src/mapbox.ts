import { 
  createDomElement,
  rendererStream,
  resizeObserverStream,
  tickStream
} from '@jamieowen/three-toolkit'
import { take, sideEffect, comp } from '@thi.ng/transducers';
import { sync } from '@thi.ng/rstream';

import mapboxgl, { CustomLayerInterface, Map }  from 'mapbox-gl';

import { 
  BoxGeometry, 
  MeshPhongMaterial,
  DirectionalLight,
  Mesh,
  Camera,
  Scene,
  WebGLRenderer,
  Matrix4,
  Vector3,
  WebGLRenderTarget,
  PerspectiveCamera,
  BoxBufferGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  LinearFilter
} from 'three';

import { AmbientLight } from 'three';
import { CanvasTexture } from 'three';
import { PlaneBufferGeometry } from 'three';
import { LinearMipMapLinearFilter } from 'three';

mapboxgl.accessToken = 'pk.eyJ1IjoiamFtaWUtb3dlbiIsImEiOiJja2NwdHhkdTYweWRwMnhzNms3bGVjaXRxIn0.JeGfxV4JT2gm5Z7ZDefP0w';


var viewPortTag=document.createElement('meta');
viewPortTag.id="viewport";
viewPortTag.name = "viewport";
viewPortTag.content = "width=device-width, initial-scale=1.0";
document.getElementsByTagName('head')[0].appendChild(viewPortTag);
/**
 * Custom Layers.
 */

class TestLayer implements CustomLayerInterface{

  id:string = 'layer';
  type = 'custom' as 'custom';
  renderingMode = '3d' as '3d';
  camera = new Camera();
  scene = new Scene();
  translate = [0.279471, 0.364935, 0.0000025];
  scale = 0.000003;
  cube;
  renderer:WebGLRenderer;
  map:Map;
  rt:WebGLRenderTarget;


  constructor(){  

    var geometry = new BoxGeometry(1, 1, 1);
    var material = new MeshPhongMaterial({color: 0xee0000});
    this.cube = new Mesh(geometry, material);
    this.scene.add(this.cube);

    const directionalLight = new DirectionalLight(0xffffff);
    directionalLight.position.set(0, -70, 100).normalize();
    this.scene.add(directionalLight);

  }

  onAdd(map:Map,gl:WebGLRenderingContext){
    console.log( 'add' );
    this.map = map;

    const canvas = map.getCanvas();
    this.renderer = new WebGLRenderer({
        canvas: canvas,
        context: gl
    });

    this.renderer.autoClear = false;    

    const { width,height } = canvas;
    this.rt = new WebGLRenderTarget(width,height);
    console.log( width,height, "<<" );
  }

  render(gl:WebGLRenderingContext,matrix:[]){

    // console.log( 'render' );
    const m = new Matrix4().fromArray(matrix);
    const l = new Matrix4().makeTranslation(this.translate[0], this.translate[1], this.translate[2])
        .scale(new Vector3(this.scale, -this.scale, this.scale));

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    // this.cube.scale.set(10);

    this.camera.projectionMatrix.elements = matrix;
    this.camera.projectionMatrix = m.multiply(l);
    this.renderer.state.reset();
    // this.renderer.setRenderTarget(this.rt);
    this.renderer.render(this.scene, this.camera);
    this.map.triggerRepaint();

  }

}

const ele1 = createDomElement(document.body);
const ele2 = createDomElement(document.body);

ele1.style.height = '50%';
ele2.style.height = '50%';
ele2.style.position = 'absolute';
ele2.style.top = '50%';
// ele1.style.visibility = 'hidden';

// const map = new mapboxgl.Map({
//   container: ele,
//   pitch: 60,
//   bearing: 40,
//   style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
//   center: [-74.5, 40], // starting position [lng, lat]
//   zoom: 9 // starting zoom
// });

var map = new mapboxgl.Map({
  container: ele1,
  antialias: true,
  zoom: 16.5,

  center: [-79.390307, 43.658956],
  // bearing: 20,
  pitch: 10,
  // style: 'mapbox://styles/mapbox/light-v9',
  // style: 'mapbox://styles/mapbox/streets-v11',
  style: 'mapbox://styles/mapbox/navigation-preview-night-v4',
  // hash: true
});

map.on('load', function() {
  // map.addLayer({
  //     'id': '3d-buildings',
  //     'source': 'composite',
  //     'source-layer': 'building',
  //     'filter': ['==', 'extrude', 'true'],
  //     'type': 'fill-extrusion',
  //     'minzoom': 15,
  //     'paint': {
  //         'fill-extrusion-color': '#ccc',
  //         'fill-extrusion-height': ["get", "height"]
  //     }
  // });

  // map.addLayer(new TestLayer());
});

const mapTexture = new CanvasTexture( map.getCanvas() );
mapTexture.generateMipmaps = false;
mapTexture.minFilter = LinearFilter;
mapTexture.magFilter = LinearFilter;

console.log( mapTexture );
// mapTexture.

map.on('render',(e)=>{
  // console.log( 'render map',e );
  // mapTexture.needsUpdate = true;
  
})

map.on('touchend',()=>{
  console.log( 'touch end', mapTexture );
  // mapTexture.
  // mapTexture.needsUpdate = true;
})

const resize = resizeObserverStream(ele2);
const renderer = rendererStream();
const tick = tickStream();

resize.subscribe( { next:({width,height})=>console.log('resize',width,height) } );
renderer.subscribe(
  comp( 
    take(1),
    sideEffect((r:WebGLRenderer)=>{
      ele2.appendChild(r.domElement);
      r.setPixelRatio(2);
      resize.subscribe({next:({width,height})=>r.setSize(width,height)})  
    })
  )
);


const mesh = ()=>{
  return new Mesh(
    new BoxBufferGeometry(1,1,1),
    new MeshStandardMaterial({color:'crimson'})
  )
}

const plane = ()=>{
  return new Mesh(
    new PlaneBufferGeometry(1,1),
    new MeshBasicMaterial({color:'white'})
  )  
}

const scene = new Scene();
const camera = new PerspectiveCamera();
const light = new DirectionalLight();
const alight = new AmbientLight(0xffffff,0.6);
light.position.set( 10,5,10 );
const cube = mesh();
const mapPlane = plane();
// mapPlane.scale.set(2,2,2);
mapPlane.material.map = mapTexture;

camera.position.set(0,0,4);
scene.add( cube );
scene.add( mapPlane );
scene.add( light );
scene.add( alight );

const resizeCamera = {
  next: ({width,height})=>{    
    camera.aspect=width/height;
    camera.updateProjectionMatrix();
    mapPlane.scale.x = width * 0.005;
    mapPlane.scale.y = height * 0.005;
  }
}
resize.subscribe( resizeCamera );
// renderer.

sync( {
  src: {
    tick,
    renderer
  }
}).subscribe(
  sideEffect<WebGLRenderer>(({renderer,tick})=>{
    // console.log( 'render cam', renderer );
    const { frame } = tick;
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;
    mapPlane.rotation.x = Math.cos(frame*0.01)
    mapTexture.needsUpdate = true;
    renderer.render( scene,camera );

  })
)






