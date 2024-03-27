import { FC } from "react";
import { FaAward } from "react-icons/fa";
import { Styled, SxStyleProp } from "theme-ui";

const style: SxStyleProp = {
  position: "relative",
  //   height: "100%",
  //   top: "50px",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   display: "inline-block",
  //   paddingTop: ["2px", "10px"],
};

const aStyle = {};

export const Award: FC<{ awardUrls?: string[] }> = ({
  awardUrls = ["one"],
}) => {
  return (
    <span>
      {awardUrls.map((url) => (
        <Styled.a href={url}>
          <FaAward style={{ position: "relative", top: "4px" }} />
        </Styled.a>
      ))}
    </span>
  );
};
