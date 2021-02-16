import { ComponentProps, FC, Fragment } from "react";
import { Button, Container, Flex, Text, ThemeUIStyleObject } from "theme-ui";
import { BodyText, LinkWrapper } from "./typography";
import { useNavigationData } from "components/common";
import { useProjects } from "components/context/ProjectsContext";
import { useRouter } from "next/router";

const navStyle: ThemeUIStyleObject = {
  width: "100%",
  height: ["3rem", "5rem"],
  backgroundColor: "background",
  color: "text",
  display: "grid",
  gridTemplateColumns: ["6rem 1fr 6rem", "8rem 1fr 8rem"],
  columnGap: "1rem",
  fontSize: "16px",
  fontFamily: "heading",
  // alignItems: "center",
};

const backStyle: ThemeUIStyleObject = {
  width: "100%",
  textAlign: "center",
  marginTop: "1rem",
  height: "48px",
};

const cellStyle: ThemeUIStyleObject = {
  width: "100%",
  height: "100%",
  fontSize: "8px",
  alignItems: "center",
  justifyContent: "center",
};

const buttonStyle: ThemeUIStyleObject = {
  width: "100%",
  height: "100%",
  backgroundColor: "#fafafa",
  color: "content_background",
  alignItems: "center",
  justifyContent: "center",
  userSelect: "none",
  fontSize: "16px",
  ":hover": {
    textDecoration: "strikethrough",
    opacity: 0.5,
  },
};

const FooterButton: FC<ComponentProps<typeof LinkWrapper>> = ({
  children,
  ...props
}) => {
  return (
    <LinkWrapper {...props}>
      <Flex sx={buttonStyle}>{children}</Flex>
    </LinkWrapper>
  );
};

export const isProjectsPage = () => {
  const router = useRouter();
  const path = router.asPath.split("/");
  return path.length > 2 && path[1] === "recent-work";
};

export const FooterNavigation: FC<{}> = () => {
  const projectsPage = isProjectsPage();
  if (projectsPage) {
    return <FooterProjectNavigation />;
  } else {
    return <FooterSiteNavigation />;
  }
};

export const FooterSiteNavigation: FC<{}> = () => {
  const { next, prev, current, items } = useNavigationData();
  const len = items.length - 1; // not including github
  const marker = current.num + "/" + ("00" + len).slice(-2);

  return (
    <Container sx={navStyle} className="maxw-medium">
      <Container sx={cellStyle}>
        {prev && <FooterButton href={prev.href}>{`<<`}</FooterButton>}
      </Container>
      <Flex sx={cellStyle}>{marker}</Flex>
      <Container sx={cellStyle}>
        {next && <FooterButton href={next.href}>{`>>`}</FooterButton>}
      </Container>
    </Container>
  );
};

export const FooterProjectNavigation: FC<any> = () => {
  const {
    projects,
    currentProject,
    previousProject,
    nextProject,
  } = useProjects();
  const len = projects.length;
  const idx = projects.indexOf(currentProject);
  const marker = ("00" + (idx + 1)).slice(-2) + "/" + ("00" + len).slice(-2);

  return (
    <Fragment>
      <Container sx={navStyle} className="maxw-medium">
        <Container sx={cellStyle}>
          {previousProject && (
            <FooterButton href={previousProject.url}>{`<<`}</FooterButton>
          )}
        </Container>
        <Flex sx={cellStyle}>{marker}</Flex>
        <Container sx={cellStyle}>
          {nextProject && (
            <FooterButton href={nextProject.url}>{`>>`}</FooterButton>
          )}
        </Container>
      </Container>
      <Container sx={backStyle} className="maxw-medium">
        <LinkWrapper href="/recent-work">
          <Text as="span" variant="navigation_list">
            {"<< "} Back to Recent Work
          </Text>
        </LinkWrapper>
      </Container>
    </Fragment>
  );
};
