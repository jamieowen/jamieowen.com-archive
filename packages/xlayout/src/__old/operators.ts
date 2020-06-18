import * as tx from '@thi.ng/transducers';
import { Node } from './Node';

/**
 * Function signature for attribute op reducers.
 */
export type AttributeOpRfn = (i:number,value:any,node:Node) => any;

/**
 * A set of default ops on a generic attribute type.
 */
export type AttributeOpApi = {
  fromSeed: () => any;
  set: ( rfn:AttributeOpRfn ) => any; // XForm / TxLike?
  offset: ( rfn:AttributeOpRfn ) => any;
  scale: ( rfn:AttributeOpRfn ) => any;
}

export const setAttribute = ( name:string,rfn:AttributeOpRfn ) =>
  tx.mapIndexed( (i:number,node:Node)=>{
    const currentValue = node.attributes.get(name);
    const newValue = rfn(i,currentValue,node);
    node.attributes.set(name,newValue);
    return node;
  });  

/**
 * Generic attribute operator functions.
 */
export const set = ( name: string, rfn:AttributeOpRfn ) => setAttribute( name,rfn );
export const scale = ( name: string, rfn:AttributeOpRfn ) => setAttribute( name, (i,x,n)=>{
  const scale = rfn(i,x,n);
  x[0]*=scale[0];
  x[1]*=scale[1];
  // x[2]*=scale[2];
  return x;
});

export const offset = ( name: string, rfn:AttributeOpRfn ) => setAttribute( name, (i,x,n)=>{
  const offset = rfn(i,x,n);
  x[0]+=offset[0];
  x[1]+=offset[1];
  // x[2]*=scale[2];
  return x;
});

export const fromSeed = ( name:string ) => setAttribute( name, (i,x,n)=>{
  const value = [ n.seed.x, n.seed.y ];
  return value;  
})

export const position:AttributeOpApi = {
  fromSeed: () => fromSeed( 'position' ),
  set: ( rfn:AttributeOpRfn ) => setAttribute( 'position',rfn ),
  offset: ( rfn:AttributeOpRfn ) => offset( 'position',rfn ),
  scale: ( rfn:AttributeOpRfn ) => scale( 'position',rfn )
}