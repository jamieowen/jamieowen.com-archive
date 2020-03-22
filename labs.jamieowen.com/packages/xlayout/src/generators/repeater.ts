import * as tx from '@thi.ng/transducers';
import { GridOpts } from './grid';
import { Node } from '../nodes';

const defaultGridOpts:GridOpts = {
  w:4,h:4,sx:1,sy:1
}

/**
 * Repeat a cell a number of times but supply the same 
 * initial starting x,y conditions.
 */
export function repeater(parent:Node,repeatCount:number,opts?:GridOpts,xform=tx.noop()){

  opts = Object.assign({},defaultGridOpts,opts);
  
  const rCount = repeatCount;
  const rx = opts.w * rCount;
  const ry = opts.h;

  return tx.iterator(
    tx.comp(
      tx.mapIndexed((i,r)=>{
        const ixx:number = r[0];
        const iy:number = r[1];
        const ix:number = Math.floor(ixx / rCount);
        const ii:number = Math.floor(i/rCount);
        const ir:number = ixx % rCount; // repeat cycle        
        const x:number = ix * opts.sx;
        const y:number = iy * opts.sy;
        const w:number = opts.sx;
        const h:number = opts.sy;
        return {x,y,w,h,ix,iy,ir,ii};
      }),
      xform
    ),
    tx.range2d(rx,ry)
  );

}