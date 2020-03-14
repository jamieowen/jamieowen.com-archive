import { Node2D } from '@thi.ng/scenegraph';
import { Vec } from '@thi.ng/vectors';
import { IShape } from '@thi.ng/geom-api';

export class Node extends Node2D{

  attributes:object = {};
  inited:boolean = false;
  body:IShape;

  constructor(
    id:string,
    parent?:Node,
    translate:Vec = [0,0],    
    rotate:number = 0,
    scale:Vec = [1,1]
    // scale:number = 1
  ){
    super(
      id,
      parent,
      translate,
      rotate,
      scale,
      undefined
    );

    this.inited = true;

  }

  update(){  
    super.update();      
    if( this.body ){
      this.updateBody();  
    }    
  }

  updateBody(){}

  toHiccup(){
    // console.log( 'toHiccup' );
    return this.enabled && this.display
    ? this.children.length
        ? [
              "g",
              {},
              this.body
                  ? ["g", { transform: this.mat }, this.body]
                  : ["g", { transform: this.mat } ], // did return undefined.. but causes convertTree to fail.
              ...this.children
          ]
        : this.body
        ? ["g", { transform: this.mat }, this.body]
        : ["g", { transform: this.mat } ] // did return undefined.. but causes convertTree to fail.
    : undefined;    
  }



}
