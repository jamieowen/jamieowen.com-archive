import { Box3, Vector3 } from "three";

type GridOptions = {
  size:number,
  spacing:number
}

const defaultOpts:GridOptions = {
  size: 5,
  spacing: 10
}

const gridPoints = (numPoints:number,bounds:Box3,options:GridOptions,itemHandler:Function=null):Array<any>=>{

  const opts:GridOptions = Object.assign({},defaultOpts,options);

  const points:Array<object> = [];
  const size:Vector3 = bounds.getSize(new Vector3());
  let insert:Function;

  if( itemHandler ){
    insert = (i:number,x:number,y:number,z:number)=>{
      const res = itemHandler(i,x,y,z);
      points.push(res);
    }
  }else{
    insert = (i:number,x:number,y:number,z:number)=>{
      points.push( [x,y,z] );
    }
  }

  let createdPoints:number = 0;

  for( let i:number = 0; i<numPoints; i++ ){

    const col = i % opts.size;
    const row = Math.floor( i / opts.size );

    const x = col * opts.spacing;
    const y = -row * opts.spacing;
    const z = 0;
    
    insert(createdPoints,x,y,z);

  }

  return points;

}

export {
  gridPoints
}