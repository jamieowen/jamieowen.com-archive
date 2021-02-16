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

  useEffect(() => {
    const container = document.getElementById("content-container");
    contentContainerRef.current = container;
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
    const scrollTarget = document.getElementById("__next");
    if (router.asPath !== "/" && contentContainerRef.current) {
      scrollTarget.scrollTo({
        top: contentContainerRef.current.getBoundingClientRect().top - 32,
        behavior: "smooth",
      });
    }
  }, [router.asPath]);

  return <ScrollContext.Provider value={{}}>{children}</ScrollContext.Provider>;
};
