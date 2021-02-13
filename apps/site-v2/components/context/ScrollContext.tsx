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
import { useRouter } from "next/router";

interface IScrollContext {}

const ScrollContext = createContext({}!);
export const ScrollProvider: FC<any> = ({ children }) => {
  const contentContainerRef = useRef<HTMLElement>();
  const [contentScrollPos, setContentScroll] = useState(0);
  const router = useRouter();

  console.log("Redraw scroll context");

  useEffect(() => {
    const container = document.getElementById("content-container");
    contentContainerRef.current = container;
    console.log("Add scroll listeners");
    if (container) {
      window.addEventListener(
        "scroll",
        throttle((ev) => {
          // const bounds = container.getBoundingClientRect();
        }, 20)
      );
    }
  }, []);

  useEffect(() => {
    console.log("Router", router.asPath);
    if (router.asPath !== "/" && contentContainerRef.current) {
      console.log("Scroll TO ");
      window.scrollTo({
        top: contentContainerRef.current.getBoundingClientRect().top,
        behavior: "auto",
      });
    }
  }, [router.asPath]);

  return <ScrollContext.Provider value={{}}>{children}</ScrollContext.Provider>;
};
