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

interface IScrollContext {
  headerVisibility: number; // 0 - 1
}
const ScrollContext = createContext<IScrollContext>(null!);
export const useScrollContext = () => useContext(ScrollContext);

export const ScrollProvider: FC<any> = ({ children }) => {
  const contentContainerRef = useRef<HTMLElement>();
  const [contentScrollPos, setContentScroll] = useState(0);
  const [headerVisibility, setHeaderVisibility] = useState(1);

  const router = useRouter();

  const providerValue = useMemo<IScrollContext>(() => {
    return {
      headerVisibility: Math.min(Math.max(0, 1 - contentScrollPos), 1.0),
    };
  }, [contentScrollPos]);

  // Originally for full screen display of header.
  useEffect(() => {
    const container = document.getElementById("__next");
    contentContainerRef.current = container;
    if (container) {
      container.addEventListener(
        "scroll",
        throttle((ev) => {
          const bounds = container.getBoundingClientRect();
          // console.log("scroll", container.scrollTop);
          const norm = container.scrollTop / window.innerHeight;
          setContentScroll(norm);
        }, 20)
      );
    }
  }, []);
  /**
   * Scroll to top on page load.
   */
  useEffect(() => {
    const scrollTarget = document.getElementById("__next");
    scrollTarget.scrollTop = 0;
    // if (router.asPath !== "/" && contentContainerRef.current) {
    //   scrollTarget.scrollTo({
    //     top: contentContainerRef.current.getBoundingClientRect().top - 32,
    //     behavior: "smooth",
    //   });
    // }
  }, [router.asPath]);

  return (
    <ScrollContext.Provider value={providerValue}>
      {children}
    </ScrollContext.Provider>
  );
};
