import React, { createContext, FC } from "react";

export interface LayoutGroupInfo {
  groupName: string;
}

export const LayoutGroupContext = createContext<LayoutGroupInfo>({
  groupName: "default",
});

export const LayoutGroup: FC<Partial<LayoutGroupInfo>> = ({
  children,
  ...props
}) => {
  return (
    <LayoutGroupContext.Provider value={props as LayoutGroupInfo}>
      {children}
    </LayoutGroupContext.Provider>
  );
};
