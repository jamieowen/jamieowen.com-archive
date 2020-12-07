import { Node2D } from '@thi.ng/scenegraph';
import { Vec } from '@thi.ng/vectors';
import { IShape } from '@thi.ng/geom-api';

export class Node extends Node2D{

  attributes:object = {};
  inited:boolean = false;
  depth:number = 0;
  body:IShape;
  type:string = 'node';

  constructor(
    id:string,
    parent?:Node,
    translate:Vec = [0,0],    
    rotate:number = 0,
    scale:Vec = [1,1]
    // scale:number = 1
  ){
    super(
      'node',
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
    if( this.body ){
      const res = this.body.toHiccup();
      res[1].transform = this.mat;
      res[1].type = this.type;
      return res;
    }else{
      return [
        'g',
        { type: this.type },        
        // { transform:this.mat, type: this.type },
        ...this.children
      ]
    }
    // return this.enabled && this.display
    // ? this.children.length
    //     ? [
    //           "g",
    //           {},
    //           this.body
    //               ? ["g", { transform: this.mat, type:this.type }, this.body]
    //               : ["g", { transform: this.mat, type:this.type } ], // did return undefined.. but causes convertTree to fail.
    //           ...this.children
    //       ]
    //     : this.body
    //     ? ["g", { transform: this.mat, type:this.type }, this.body]
    //     : ["g", { transform: this.mat, type:this.type } ] // did return undefined.. but causes convertTree to fail.
    // : undefined;    
  }





}
