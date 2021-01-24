import React, { FC, Fragment } from "react";
// import { PageHeader } from "../../components/common";

export const Writing: FC<any> = () => {
  return (
    <Fragment>
      {() => {
        return {
          subtitle: "Journal",
          title: "Writings.",
          short: "A short bit of text",
        };
      }}
    </Fragment>
  );
};

export default Writing;
