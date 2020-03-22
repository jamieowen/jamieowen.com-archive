import * as tx from '@thi.ng/transducers';
import { Node } from '../nodes';
import { GridOpts } from './grid';
import { CreateChild } from './subdivide';
import { repeater } from './repeater';


export function basketweave(parent:Node,opts?:GridOpts,create?:CreateChild){  

  // vertically stacked.
  // - <
  // - 
  const vPos1 = (x)=>{
    const h2 = x.h*0.5;
    return {
      // ...x,
      x: x.x,
      y: x.y,
      w: x.w,
      h: h2
    }
  }
  // - 
  // - <
  const vPos2 = (x)=>{
    const h2 = x.h*0.5;
    return {
      // ...x,
      x: x.x,
      y: x.y+h2,
      w: x.w,
      h: h2
    }
  }

  // horizontally stacked.
  // |  |  
  // ^
  const hPos1 = (x)=>{
    const w2 = x.w*0.5;
    return {
      // ...x,
      x: x.x,
      y: x.y,
      w: w2,
      h: x.h
    }
  }
  // |  |
  //    ^
  const hPos2 = (x)=>{
    const w2 = x.w*0.5;
    return {
      // ...x,
      x: x.x + w2,
      y: x.y,
      w: w2,
      h: x.h
    }
  }

  const ir1 = [ vPos1,vPos2 ];
  const ir2 = [ hPos1,hPos2 ];
  const cyc = [ ir1,ir2 ];
  
  const xform = tx.mapIndexed((i,x)=>{    
    x = cyc[x.ii%2][x.ir](x);
    return create(i,x,parent);
  })

  return repeater(parent,2,opts,xform);

}