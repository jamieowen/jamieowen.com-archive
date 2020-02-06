import {
  Component,
  TagComponent,
  World
} from 'ecsy';

import {
  Object3D, Vector3, Euler, Color, Quaternion, Geometry
} from 'three';

class TransformComponent extends Component{
  public position:Vector3;
  public scale:Vector3;
  public rotation:Euler;
  public quaternion:Quaternion;
}

class GeometryComponent extends Component{
  public geometry:Geometry;
}

class MaterialColorComponent extends Component{
  public color:Color;
}

class InteractionComponent extends Component{
  public interactive:Boolean;
}

export {
  TransformComponent,
  GeometryComponent,
  MaterialColorComponent,
  InteractionComponent
}


