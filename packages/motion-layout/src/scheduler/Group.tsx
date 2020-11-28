import React, { FC, createContext } from "react";

interface GroupInfo {
  groupName: string;
}

export const GroupContext = createContext<GroupInfo>({
  groupName: "default",
});

export const Group: FC<Partial<GroupInfo>> = ({ children, ...props }) => {
  return (
    <GroupContext.Provider value={props as GroupInfo}>
      {children}
    </GroupContext.Provider>
  );
};
