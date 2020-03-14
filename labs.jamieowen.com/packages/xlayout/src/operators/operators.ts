import { mapIndexed,map } from '@thi.ng/transducers';
import { Vec } from '@thi.ng/vectors';
import { Node } from '../nodes';

export type OpRfn = (i:number,value:any,node:Node) => any;

export const position = ( rfn:OpRfn ) => mapIndexed((i:number,n:Node)=>{
  n.translate = rfn(i,n.translate,n);
  return n;
});

export const scale = ( rfn:OpRfn ) => mapIndexed((i:number,n:Node)=>{
  n.scale = rfn(i,n.scale,n);
  return n;
});

export const offset = ( rfn:OpRfn ) => mapIndexed((i:number,n:Node)=>{
  const off = rfn(i,n.translate,n);
  n.translate[0] += off[0];
  n.translate[1] += off[1];
  return n;
});

export const attribute = ( name:string, rfn:OpRfn ) => mapIndexed((i:number,n:Node)=>{
  n.attributes[name] = rfn(i,n.attributes[name],n);
  return n;
});

// export const sizeToBounds = (factor:number=1) => map(()=>{

// })


// Add Tagging
// l.tagNode(10),
// l.tagNodeIndexed((i:number)=>i>3 ? 20 : 1),


// offset, translate.scale, translate.rotate?

// etc