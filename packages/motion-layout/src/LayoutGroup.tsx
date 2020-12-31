import React, { createContext, FC } from "react";

export interface LayoutGroupInfo {
  // name of group
  name: string;
  // delay before transitioning in items.
  delay: number;
  // interval between items
  gap: number;
  // maximum amount of time for all items
  max: number | undefined;
}

export const LayoutGroupContext = createContext<LayoutGroupInfo>({
  name: "default",
  delay: 0,
  gap: 100,
  max: undefined,
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
