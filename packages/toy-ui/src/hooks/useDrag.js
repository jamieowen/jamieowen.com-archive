import { useState,useEffect } from 'react';
import { useBounds } from './useBounds';

const useDrag = (
  onDrag = (local,bounds,)=>{}
)=>{

  const [bounds,boundsRef] = useBounds();
  const [pressed,setPressed] = useState(false);

  const update = (ev)=>{
    const {clientX,clientY} = ev;
    const [x,y] = [clientX-bounds.x,clientY-bounds.y];
    const local = { x,y };
    onDrag(local,bounds);
    
  }
  // const update = (ev)=>{
  //   const {clientX} = ev;
  //   const [lx,width] = [clientX-bounds.x,bounds.width];
  //   const value = Math.max(0,Math.min(1,lx/width));
  //   setControlValue( control,value );
  //   setValue(value);
  // }  

  const onPointerDown = (ev)=>{
    setPressed(true);
    update(ev.nativeEvent);
  }
  const onPointerUp = ()=>{
    setPressed(false);
  }
  const onPointerMove = (ev)=>{
    update(ev.nativeEvent);
  }

  useEffect(()=>{
    if( pressed ){
      window.addEventListener('mouseup',onPointerUp);
      window.addEventListener('mousemove',update);
    }
    return ()=>{
      window.removeEventListener('mouseup',onPointerUp);
      window.removeEventListener('mousemove',update);
    }
  },[pressed])    

  const dragProps = {
    onMouseUp: onPointerUp,
    onMouseDown: onPointerDown,
    onMouseMove: pressed ? onPointerMove : undefined,
    ref: boundsRef
  }

  // return [ bgRef,thumbRef ];
  return dragProps;

}

export {
  useDrag
}