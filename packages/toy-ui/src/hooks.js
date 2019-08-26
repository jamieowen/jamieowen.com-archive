import {
  useRef,
  useState,
  useEffect
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
    const resize = new ResizeObserver(([item])=>{      
      const {x,y,width,height,left,right,bottom,top} = item.target.getBoundingClientRect();      
      const bounds = {x,y,width,height,left,right,bottom,top};
      setBounds(bounds);
    });    
    resize.observe(ref.current);
    return ()=>{
      resize.unobserve(ref.current);
    }
  },[ref.current]);

  return [bounds,ref];

}

const useDrag = ()=>{

  const [bgBounds,bgRef] = useBounds();
  const [thumbBounds,thumbRef] = useBounds();


  useEffect( ()=>{

    return ()=>{

    }
  },[] );

  return [ bgRef,thumbRef ];

}

export {
  useBounds,
  useDrag
}