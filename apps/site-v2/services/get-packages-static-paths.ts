import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { packagesData } from "data/packages-data";
import { PackageDataRoot, PackageExample } from "types";

// props - iframe url, title, description?

const collectExamples = () => {
  return packagesData.packages.reduce<PackageExample[]>((all, pkg) => {
    all = [...all, ...pkg.examples];
    return all;
  }, []);
};

const collectExamplesData = (data: PackageDataRoot) => {
  return data.packages.reduce<PackageExample[]>((all, pkg) => {
    all = [...all, ...pkg.examples];
    return all;
  }, []);
};

/**
 * Create static methods based on the supplied package data.
 * Used for both /packages & /play sections.
 * @param data
 */
export const createStaticMethods = (data: PackageDataRoot) => {
  const examples = collectExamplesData(data);
  const getStaticPaths: GetStaticPaths = async () => {
    return {
      fallback: false,
      paths: examples.map((ex) => {
        return {
          params: {
            id: ex.id,
          },
        };
      }),
    };
  };

  const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params.id;
    const example = examples.find((ex) => ex.id === id);
    return {
      props: {
        packageExample: example,
      },
    };
  };

  return { getStaticPaths, getStaticProps };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: false,
    paths: collectExamples().map((ex) => {
      return {
        params: {
          id: ex.id,
        },
      };
    }),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params.id;
  const example = collectExamples().find((ex) => ex.id === id);

  return {
    props: {
      packageExample: example,
    },
  };
};

export type GetPackagesStaticPropsType = InferGetStaticPropsType<
  typeof getStaticProps
>;
