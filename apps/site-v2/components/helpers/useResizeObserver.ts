import { MutableRefObject, useEffect, useRef, useState } from "react";

export const useResizeObserver = (_ref?: MutableRefObject<Element>) => {
  const ref = _ref || useRef<Element>(null!);
  const [entry, setEntry] = useState<ResizeObserverEntry>();

  useEffect(() => {
    const observer = new ResizeObserver((entry) => {
      setEntry(entry[0]);
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  return {
    entry,
    ref,
  };
};
