import { FC, Fragment, useMemo } from "react";
import { Grid, Heading, Link, Text, Container } from "theme-ui";
import { Button, BodyHeader, ListLink } from "components/common";
import { techListData } from "../slide-stack/list-tech-data";
import { interestsData } from "../slide-stack/list-interests-data";
import { useNavigationData } from "./MenuNavigation";
import { socialMediaData } from "components/slide-stack/list-social-data";
export type GridColumn = [label: string, url: string][][];
export type GridColumns = [GridColumn, GridColumn, GridColumn, GridColumn];
export type GridNames = [string, string, string, string];

export const GridListColumn: FC<{ name: string; data: GridColumn }> = ({
  name,
  data,
}) => {
  return (
    <Container>
      <BodyHeader>{name}</BodyHeader>
      <ul>
        {data.map((line, i) => (
          <li key={i}>
            {line.map(([label, url], i) => (
              <Fragment key={i}>
                {/* <Button href={url} size="small">
                  {label}
                </Button> */}
                <ListLink href={url}>{label}</ListLink>
                {i === line.length - 1 ? "" : " / "}
              </Fragment>
            ))}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export const GridList: FC<{
  columns: GridColumns;
  names: GridNames;
}> = ({ columns, names }) => {
  return (
    <Grid variant="tech_list">
      {columns.map((col, i) => (
        <GridListColumn key={i} data={col} name={names[i]} />
      ))}
    </Grid>
  );
};

export const TechGridList = () => {
  const nav = useNavigationData();
  const data = useMemo(
    () => ({
      columns: techListData(),
      names: [
        `${nav.current.num}.1 / Creative Tech`,
        `${nav.current.num}.2 / Frontend`,
        `${nav.current.num}.3 / Backend/Devops`,
        `${nav.current.num}.4 / Generalist`,
      ] as GridNames,
    }),
    []
  );

  return <GridList columns={data.columns} names={data.names} />;
};

export const InterestsGridList = () => {
  const nav = useNavigationData();
  const data = useMemo(
    () => ({
      columns: interestsData(),
      names: [
        `${nav.current.num}.1 / Thinking`,
        `${nav.current.num}.2 / Listening`,
        `${nav.current.num}.3 / More Listening`,
        `${nav.current.num}.4 / Anything`,
      ] as GridNames,
    }),
    []
  );

  return <GridList columns={data.columns} names={data.names} />;
};

export const SocialMediaGridList = () => {
  const nav = useNavigationData();
  const data = useMemo(
    () => ({
      columns: socialMediaData(),
      names: [
        `${nav.current.num}.1 / One`,
        `${nav.current.num}.2 / Two`,
        ``,
        ``,
      ] as GridNames,
    }),
    []
  );

  return <GridList columns={data.columns} names={data.names} />;
};
