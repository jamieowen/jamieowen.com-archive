import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { packagesData } from "data/packages-data";
import { PackageExample } from "types";

// props - iframe url, title, description?

const collectExamples = () => {
  return packagesData.packages.reduce<PackageExample[]>((all, pkg) => {
    all = [...all, ...pkg.examples];
    return all;
  }, []);
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: collectExamples().map((ex) => {
      return {
        params: {
          slug: ex.slug,
        },
      };
    }),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params.slug;
  const example = collectExamples().find((ex) => ex.slug === slug);

  return {
    props: {
      packageExample: example,
    },
  };
};

export type GetPackagesStaticPropsType = InferGetStaticPropsType<
  typeof getStaticProps
>;
