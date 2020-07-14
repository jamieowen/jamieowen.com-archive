import { Stream } from '@thi.ng/rstream';

type ResizeEvent = {
  entry: ResizeObserverEntry,
  domElement: HTMLElement,
  width: number,
  height: number
}

export function resizeObserverStream(
  domElement: HTMLElement,
  opts:ResizeObserverOptions = { box: 'border-box' }
){
  return new Stream<ResizeEvent>((stream)=>{

    const callback = (entries:ResizeObserverEntry[])=>{
      const entry = entries[0];
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      stream.next({ width, height, entry, domElement });
    }

    const observer = new ResizeObserver(callback);
    observer.observe( domElement,opts );

    return ()=>{
      observer.disconnect();
    }

  });
}