import {
  Scene, Box3, HemisphereLight, Color,
} from 'three';

import { 
  GUI,GUIController 
} from 'dat-gui';

import { DrawContext } from '../../../../packages/three-drawcontext/DrawContext';
import { generateColorPalette } from './utils/generateColorPalette';
import { gridPoints } from './utils/gridPoints';
import { DomScrollCamera } from '../objects/DomScrollCamera';


class PageScrollScene extends Scene{
  
  public sceneBounds:Box3;
  public domScrollCamera:DomScrollCamera;

  constructor(){

    super();

    this.name = 'page-scroll-scene';
    this.background = new Color('#777777');

    // WE CAN ACCESS BOUNDS TO SUBSCRIBE TO ENGINE.

    // Bounds    
    // const bounds = new Bounds();
    // this.add(bounds);

    this.sceneBounds = new Box3();
    this.sceneBounds.min.set(-20,0,-10);
    this.sceneBounds.max.set(20,100,10);

    // DOM Scroll Camera
    this.domScrollCamera = new DomScrollCamera();
    this.add(this.domScrollCamera);

    // Boxes
    const colors = generateColorPalette( new Color('red'),true );    

    // Points
    const points = gridPoints(50,this.sceneBounds,null);

    // Lights
    const hemLight = new HemisphereLight(0xffffff,0x444444);
    this.add(hemLight);

    const context:DrawContext = new DrawContext(this);    
            
    // context.drawOnce((c:DrawContext,t:number,d:number)=>{

    //   for( let i = 0; i<points.length; i++ ){
    //     let s = 2;
    //     let p = points[i];
    //     c.lambertMaterial();
        
    //     c.position(p[0],p[1],p[2]);        
    //     c.scale(s,s,s);
    //     // c.color(0xff00ff);
    //     c.color(colors[i%colors.length].getHex());
    //     c.box();
    //   }
  
    //   c.scale(1,1,1);
    //   c.lambertMaterial();
    //   c.color(0xffff00);
    //   c.position(0,10,0);
    //   c.sphere();
    //   c.color(0x00ffff);
    //   c.position(0,20,0);
    //   c.plane();

    // });

  }

}

export {
  PageScrollScene
}