import React, { FC } from "react";
import Link from "next/link";
import { PageItem } from "../services/fetch-pages";

type NavigationProps = {
  items: PageItem[];
};
export const Navigation: FC<NavigationProps> = ({ items = [] }) => {
  return (
    <div>
      {items.map((item, i) => {
        return (
          <Link key={i} href={item.url}>
            <div>{item.url}</div>
          </Link>
        );
      })}
    </div>
  );
};
