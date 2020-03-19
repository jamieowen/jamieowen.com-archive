import { Node } from '../nodes';

export function mop(){

}

export const position = (x) => (n:Node)=> n.translate = x;
export const scale = (x) => (n:Node)=> n.scale = x;