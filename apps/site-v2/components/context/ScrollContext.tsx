import React, {
  createContext,
  useContext,
  FC,
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { throttle } from "lodash";

interface IScrollContext {}

const ScrollContext = createContext({}!);
export const ScrollProvider: FC<any> = ({ children }) => {
  const contentContainerRef = useRef<HTMLElement>();
  const [contentScrollPos, setContentScroll] = useState(0);
  console.log("Redraw scroll context");
  useEffect(() => {
    const container = document.getElementById("content-container");
    contentContainerRef.current = container;
    console.log("Add scroll listeners");
    if (container) {
      window.addEventListener(
        "scroll",
        throttle((ev) => {
          const bounds = container.getBoundingClientRect();
        }, 20)
      );
    }
  }, []);

  return <ScrollContext.Provider value={{}}>{children}</ScrollContext.Provider>;
};
