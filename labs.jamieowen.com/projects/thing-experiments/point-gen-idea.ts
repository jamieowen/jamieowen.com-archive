import * as l from './layout-gen/layout2';



const pointsNode = l.points(10,[
  l.tagNode(10),
  l.tagNodeIndexed((i:number)=>i>3 ? 20 : 1),
  l.makeBranchNode(3)
  // t.branch((n:Node)=>n.hasTag(A) ? l.points(10, ) : null )
]);

let count:number = 0;
// @ts-ignore
for( let node:l.Node of pointsNode ){
  console.log( 'node', node );
  count++;
}
console.log( count );

