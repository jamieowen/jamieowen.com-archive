import { Box3, Vector3 } from "three";

const randomPoints = (numPoints:number,bounds:Box3,itemHandler:Function=null):Array<any>=>{

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
  
  for( let i = 0; i<numPoints; i++ ){

    const x = ( Math.random() * size.x ) + bounds.min.x;
    const y = ( Math.random() * -size.y );
    const z = ( Math.random() * size.z ) + bounds.min.z;
    
    insert(i,x,y,z);

  }

  return points;

}

export {
  randomPoints
}