import {
  useState,
  useEffect,
  useRef
} from 'react';

const useBounds = ()=>{

  const [bounds,setBounds] = useState({
    left: 0, right: 0,
    width: 0, height: 0
  });

  const ref = useRef();
  useEffect( ()=>{
    if( !ref.current ){
      return;
    }
    const updateBounds = ()=>{
      const target = ref.current;
      const {x,y,width,height,left,right,bottom,top} = target.getBoundingClientRect();      
      const bounds = {x,y,width,height,left,right,bottom,top};
      setBounds(bounds);
    }
    const resize = new ResizeObserver(updateBounds);    
    window.addEventListener( 'resize',updateBounds); 
    resize.observe(ref.current);
    return ()=>{
      window.removeEventListener('resize',updateBounds);
      resize.unobserve(ref.current);
    }
  },[ref.current]);

  return [bounds,ref];

}

export { useBounds };
