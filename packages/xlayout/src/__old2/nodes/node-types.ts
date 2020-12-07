import { Rect, Circle } from '@thi.ng/geom';
import { Node } from './Node';
import { Vec } from '@thi.ng/vectors';
import { IShape } from '@thi.ng/geom-api';

export class GroupNode extends Node{
  type:string = 'group-node';
}

/**
 * To represent a branching op - which may not be needed... WIP..
 */
export class BranchNode extends Node{
  type:string = 'branch-node';
}

export class SubDivideNode extends Node{
  type:string = 'subdivide-node';
}

export class PointNode extends Node{
  type:string = 'point-node';  
}

export class BoundsNode extends Node{
  bounds:Vec = [0,0];
  type:string = 'bounds-node';
}

export class CircleNode extends Node{
  radius:number = 1;
  body:Circle = new Circle([0,0],this.radius,this.attributes);
  type:string = 'circle-node';
  updateBody(){
    this.body.r = this.radius;
    this.body.pos[0] = this.radius;
    this.body.pos[1] = this.radius;
  }
}

export class RectNode extends Node{
  size:Vec = [10,10];
  body:Rect = new Rect([0,0],this.size,this.attributes);
  type:string = 'rect-node';
  updateBody(){
    // this.body.pos[0] = -this.size[0]*0.5;
    // this.body.pos[1] = -this.size[1]*0.5;
    this.body.size = this.size;
  }
}

export class ShapeNode extends Node{
  
}