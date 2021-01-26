import { FC, Fragment, useMemo } from "react";
import { Grid, Heading, Link, Text, Container } from "theme-ui";
import { BodyHeader } from "./IntroTextSlide";
import { Button } from "components/common";
import { techListData } from "./list-tech-data";
import { interestsData } from "./list-interests-data";
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
                <Button href={url} size="small">
                  {label}
                </Button>
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
  const data = useMemo(
    () => ({
      columns: techListData(),
      names: [
        "02.1 / Creative Tech",
        "02.2 / Frontend",
        "02.3 / Backend/Devops",
        "02.4 / Generalist",
      ] as GridNames,
    }),
    []
  );

  return <GridList columns={data.columns} names={data.names} />;
};

export const InterestsGridList = () => {
  const data = useMemo(
    () => ({
      columns: interestsData(),
      names: [
        "02.1 / General",
        "02.2 / Music",
        "02.3 / Podcasts",
        "02.4 / Reading",
      ] as GridNames,
    }),
    []
  );

  return <GridList columns={data.columns} names={data.names} />;
};
