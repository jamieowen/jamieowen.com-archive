import * as tx from '@thi.ng/transducers';
import { GridOpts } from './grid';
import { CreateChild,createBounds, BoundsInfo } from './subdivide';

type PatternAcc = {
  w:number,
  h:number,
  minX:number,
  minY:number,
  maxX:number,
  maxY:number
}

// Assuming this could be done with a union find??

/**
 * Take a matrix of numbers, where each set of numbers represents
 * a tiling area. With the constraint that a set of numbers must
 * be aligned on the same axis. So can only form a vertical or
 * horizontal line, not for example an 'L' shape.
 * 
 * The output of this will be transformed into a bounded area 
 * 
 * @param rMatrix 
 */
function findJoined(rMatrix):PatternAcc[]{
    
  const found:Map<number,[]> = new Map();
  const results:PatternAcc[] = [];

  // Map Cells
  for( let iy:number = 0; iy<rMatrix.length; iy++ ){
    let row = rMatrix[iy];
    for( let ix:number = 0; ix<row.length; ix++ ){
      const val = rMatrix[iy][ix];
      let exists = found.get(val);
      if( !exists ){
        exists = [];
        found.set(val,exists);        
      }
      exists.push( [ix,iy] )
    }
  }

  // Evaluate and create bounds functions.  
  for( let key of found.keys() ){    
    const values = found.get(key);
    const res = values.reduce((acc:PatternAcc,i)=>{
      const x = i[0];
      const y = i[1];
      acc.minX = Math.min(x,acc.minX);
      acc.minY = Math.min(y,acc.minY);
      acc.maxX = Math.max(x,acc.maxX);
      acc.maxY = Math.max(y,acc.maxY);      
      return acc;
    },{      
      w:rMatrix[0].length,
      h:rMatrix.length,      
      minX:Number.POSITIVE_INFINITY,minY:Number.POSITIVE_INFINITY,
      maxX:Number.NEGATIVE_INFINITY,maxY:Number.NEGATIVE_INFINITY,
    })
    

    results.push(res);      
    continue;

    // Skip this constraint for now...
    if( res.minX === res.maxX || res.minY === res.maxY ){
      // ensure alignment on one axis ( e.g. no 'L' shapes )
      // and return to generate a bounds function.
      results.push(res);      
    }else{
      console.warn( 'Repeater input not included..' );
    }

  }

  return results;

}

/**
 * Transform matrix joins into dimensions suitable to 
 * be applied to BoundsNodes. 
 * @param res 
 */
const createBoundsFunctions = (res:PatternAcc[])=>{
  return res.map( (acc:PatternAcc)=>{
    const ux = 1 / acc.w; // unit sizes for grid.
    const uy = 1 / acc.h;
    return (b:BoundsInfo)=>{
      return {
        x:b.x+(acc.minX*ux*b.w),
        y:b.y+(acc.minY*uy*b.h),
        w:((acc.maxX-acc.minX)+1)*ux*b.w,
        h:((acc.maxY-acc.minY)+1)*uy*b.h,
      }
    }
  });
}


const defaultGridOpts:GridOpts = {
  w:2,h:2,
  sx:1,sy:1
}

export function matrixRepeater(parent:Node,opts:GridOpts,rMatrix,xform=tx.noop()){

  opts = Object.assign({},defaultGridOpts,opts);

  const rw = rMatrix[0].length;
  const rh = rMatrix.length;
  

  const joined = findJoined(rMatrix);
  const cycBounds = createBoundsFunctions(joined);
  const rCount = cycBounds.length;
  const rx = opts.w * rCount;
  const ry = opts.h;    
  
  // console.log( 'CycBounds:',rCount,cycBounds );

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
      tx.map(x=>{
        // console.log(x.ir);
        return cycBounds[x.ir](x);
      }),
      xform
    ),
    tx.range2d(rx,ry)
  )    

}