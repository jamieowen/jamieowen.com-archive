import React, { createContext, useContext, useMemo, useEffect } from "react";
import { IObserverContextState, ObserverManager } from "./observer-manager";

export const ObserverContext = createContext<IObserverContextState>(null);

export const ObserverProvider = ({ children }) => {
  // Create State
  const state: IObserverContextState = useMemo(() => {
    return typeof window === "undefined" ? {} : new ObserverManager();
  }, []);

  // Delay to kick in scheduler / orchestration
  useEffect(() => {
    // console.log("Wait..");
    // for (let item of state.objects) {
    //   console.log(item.entry ? item.entry.isIntersecting : "----");
    //   console.log(item.domRef.current);
    // }
  }, []);

  return (
    <ObserverContext.Provider value={state}>
      {children}
    </ObserverContext.Provider>
  );
};

// export const useObserverContext = () => {
//   return useContext(ObserverContext);
// };
