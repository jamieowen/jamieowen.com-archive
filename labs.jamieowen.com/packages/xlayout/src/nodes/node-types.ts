import { circle, rect, Rect, Circle } from '@thi.ng/geom';
import { Node } from './Node';
import { Vec } from '@thi.ng/vectors';
import { IShape } from '@thi.ng/geom-api';

export class GroupNode extends Node{}

export class PointNode extends Node{}

export class BoundsNode extends Node{
  bounds:Vec = [0,0];
}

export class CircleNode extends Node{
  radius:number = 1;
  body:Circle = new Circle([0,0],this.radius,this.attributes);
  updateBody(){
    this.body.r = this.radius;
  }
}

export class RectNode extends Node{
  size:Vec = [1,1];
  body:Rect = new Rect([50,50],this.size,this.attributes);
  updateBody(){
    this.body.pos[0] = -this.size[0]*0.5;
    this.body.pos[1] = -this.size[1]*0.5;
  }
}