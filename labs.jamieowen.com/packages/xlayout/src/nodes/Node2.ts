import { Node2D } from '@thi.ng/scenegraph';


export class Node extends Node2D{

  attributes:Map<string,any> = new Map<string,any>();

}

export class GroupNode extends Node{
  
}

export class PointNode extends Node{

}

export class BoundsNode extends Node{
  
}


/**
 * Seperate xform from structure.
 * children are iterators.
 * By default we do a depth first search.
 */
// export class Node{

//   public attributes:any;
//   public children:any;
//   public parent:Node;

//   get isLeaf():boolean{
//     return !this.children;
//   }

//   get isBranch():boolean{
//     return !!this.children;
//   }

//   get depth():number{
//     let d = 0;
//     let p = this.parent;
//     while(p){
//       d++;
//       p = p.parent;
//     }
//     return d;
//   }

//   constructor(parent?:Node){

//   }

// }

