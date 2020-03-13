import { Node2D } from '@thi.ng/scenegraph';
import { Vec } from '@thi.ng/vectors';
import { circle } from '@thi.ng/geom';

export class Node extends Node2D{

  attributes:Map<string,any> = new Map<string,any>();

  constructor(
    id:string,
    parent?:Node
  ){
    // Node2D args can expect translate,scale,rotate,body,
    // but skip those..
    super(id,parent);
    this.body = circle(3,{fill:'#ff0'})
  }

  toHiccup(){
    // console.log( 'toHiccup' );
    return this.enabled && this.display
    ? this.children.length
        ? [
              "g",
              {},
              this.body
                  ? ["g", { transform: this.mat }, this.body]
                  : undefined,
              ...this.children
          ]
        : this.body
        ? ["g", { transform: this.mat }, this.body]
        : ["g", { transform: this.mat } ] // did return undefined.. but causes convertTree to fail.
    : undefined;    
  }
}

export class GroupNode extends Node{}

export class PointNode extends Node{}

export class BoundsNode extends Node{
  bounds:Vec = [0,0];
}

// Default Drawable Nodes..
export class CircleNode extends Node{
  radius:number = 1;
}

export class RectNode extends Node{
  size:Vec = [1,1];

  // constructor(
  //   id:string,
  //   parent?:Node    
  // ){
  //   super(id,parent);
  //   // this.body = rect({fill:'blue'});
  // }
  update(){
    super.update();

    // this.body = rect(this.translate,this.size,{fill:'blue'})
    // console.log( 'Body:', this.body );
  }

  // toHiccup(){
  //   // return rect(
  //   //   this.translate,
  //   //   // { transform:this.mat, fill:'#f00' }
  //   // ).toHiccup()
  // }
}