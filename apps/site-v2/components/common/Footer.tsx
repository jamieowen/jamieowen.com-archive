import React, { FC } from "react";
import { Box, Grid, Text, Styled } from "theme-ui";
import { ContentContainer } from "./containers";
import { LargeParagraphHeading, SmallParagraphHeading } from "./headings";
import { FiTwitter } from "react-icons/fi";
import Link from "next/link";

export const FooterLinks: FC<{ links: { title: string; url: string }[] }> = ({
  links = [],
}) => {
  const li = links.map(({ title, url }, i) => {
    return (
      <Text
        key={i}
        // as="li"
        variant="navigation_link"
        sx={{ display: "block", textDecoration: "none" }}
      >
        <Link href={url}>{url + " " + title}</Link>
      </Text>
    );
  });
  return (
    <Text
      // as="ul"
      sx={{ textDecoration: "none", margin: "0px", padding: "0px" }}
    >
      {li}
    </Text>
  );
};

export const Footer: FC<any> = ({ children }) => {
  return (
    <ContentContainer swatch="primary" footer>
      <LargeParagraphHeading subtitle="Outro" align="left">
        Thanks for <br />
        dropping <br />
        by. <br />
        <br />
        Please get in touch for freelance/contract availability.
      </LargeParagraphHeading>
      <hr />
      <Grid variant="grid_3" sx={{ marginTop: "4rem" }}>
        <Box>
          <Text as="h1" variant="subtitle_heading">
            Get in touch
          </Text>
          <FooterLinks
            links={[
              { url: "", title: "_Email" },
              { url: "", title: "_Mobile" },
            ]}
          />
        </Box>
        <Box>
          <Text as="h1" variant="subtitle_heading">
            Social Media( ISH )
          </Text>
          <FooterLinks
            links={[
              { url: "", title: "_LinkedIn" },
              { url: "", title: "_Github" },
            ]}
          />
        </Box>
        <Box>
          <Text as="h1" variant="subtitle_heading">
            _
          </Text>
          <FooterLinks
            links={[
              { url: "", title: "_Twitter" },
              {
                url: "https://www.pinterest.co.uk/jamieowen_/pins/",
                title: "_Pinterest",
              },
            ]}
          />
        </Box>
      </Grid>
      <hr />
      <Text variant="subtitle_heading" sx={{ marginTop: "4rem" }}>
        © Copyright; Jamie Owen, 2020.
      </Text>
    </ContentContainer>
  );
};
