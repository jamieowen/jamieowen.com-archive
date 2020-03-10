import { DrawContext } from '../DrawContext';
import { Scene, PerspectiveCamera } from 'three';

export const basicsExample = ()=>{

  const camera:PerspectiveCamera = new PerspectiveCamera(45,4/3,0.1,1000);
  const scene:Scene = new Scene();
  const context:DrawContext = new DrawContext(scene);
          
  context.drawOnce((c:DrawContext,t:number,d:number)=>{

    console.log( 'Draw Once' );

    // c.position(1,0,0);
    c.box();

    // for( let i = 0; i<points.length; i++ ){
    // let s = 2;
    // let p = points[i];
    // c.lambertMaterial();
    
    // c.position(p[0],p[1],p[2]);        
    // c.scale(s,s,s);
    // // c.color(0xff00ff);
    // c.color(colors[i%colors.length].getHex());
    // c.box();
    // }

    // c.scale(1,1,1);
    // c.lambertMaterial();
    // c.color(0xffff00);
    // c.position(0,10,0);
    // c.sphere();
    // c.color(0x00ffff);
    // c.position(0,20,0);
    // c.plane();

  });

  return scene;

}