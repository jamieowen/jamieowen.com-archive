import { useContext, createContext, FC } from "react";

interface IAppStateContext {}

export const AppStateContext = createContext<IAppStateContext>(null!);

export const AppStateContextProvider: FC<any> = ({ children }) => {
  return (
    <AppStateContext.Provider value={{}}>{children}</AppStateContext.Provider>
  );
};
