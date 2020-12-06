import React, { FC, Fragment } from "react";
import { ContentContainer, PageHeader } from "../../components/common";
import {
  LargeParagraphHeading,
  SmallParagraphHeading,
} from "../../components/common/headings";

export const About: FC<any> = () => {
  return (
    <Fragment>
      <ContentContainer swatch="primary" header>
        <LargeParagraphHeading subtitle="Sapient Razorfish" align="left">
          Creative technologist & software engineer and all round nice chap.
          Hello.
        </LargeParagraphHeading>
        <SmallParagraphHeading subtitle="Overview" align="right">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          ullamcorper quam vitae ipsum pellentesque feugiat. Curabitur lorem
          lectus, imperdiet non congue vel, iaculis sit amet nunc. Integer
          rhoncus elit et dolor hendrerit, sed interdum elit aliquam. Phasellus
          sit amet quam vulputate, euismod leo in, aliquet ante.
        </SmallParagraphHeading>
      </ContentContainer>
      <ContentContainer swatch="secondary">
        <SmallParagraphHeading subtitle="Technology" align="left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          ullamcorper quam vitae ipsum pellentesque feugiat. Curabitur lorem
          lectus, imperdiet non congue vel, iaculis sit amet nunc. Integer
          rhoncus elit et dolor hendrerit, sed interdum elit aliquam. Phasellus
          sit amet quam vulputate, euismod leo in, aliquet ante.
        </SmallParagraphHeading>
      </ContentContainer>
    </Fragment>
  );
};

export default About;
