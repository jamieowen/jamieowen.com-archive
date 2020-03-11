import { DrawContext } from '../DrawContext';
import { Scene, PerspectiveCamera, AmbientLight, HemisphereLight } from 'three';

export const basicsExample = ()=>{

  const camera:PerspectiveCamera = new PerspectiveCamera(45,4/3,0.1,1000);
  const scene:Scene = new Scene();
  const context:DrawContext = new DrawContext(scene);
          
  const light:HemisphereLight = new HemisphereLight(0xffffff,0x444444);
  scene.add(light);

  // const points = Point

  context.drawOnce((c:DrawContext,t:number,d:number)=>{

    console.log( 'Draw Once' );

    c.position(1,1,0);
    c.lambertMaterial();
    c.color('blue');
    c.box();

    c.color('red');
    c.basicMaterial();
    c.position(0,0,0);   
    // c.scale(2,1,1);
    c.sphere();

    c.color('crimson');
    c.position(0,1,0);
    c.point();

    c.color('hotpink');
    c.position(-1,1,0);   
    c.point();
    
    c.color('gold');
    c.position(-2,1,0);   
    c.point();

  });

  return scene;

}