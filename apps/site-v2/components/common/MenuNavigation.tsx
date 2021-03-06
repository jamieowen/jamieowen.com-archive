import { useRouter } from "next/router";
import Link from "next/link";

import {
  ElementType,
  FC,
  Fragment,
  useMemo,
  createContext,
  useContext,
} from "react";
import { Container, Box, Heading, Text } from "theme-ui";
import { Button } from "./Button";
import { BodyHeader, BodyLink, MenuLink } from "./typography";
import { useScrollContext } from "components/context/ScrollContext";

interface MenuData {
  label: string;
  num: string;
  href: string;
  break?: boolean;
  hideNext?: boolean;
  devOnly?: boolean;
}

export const navigationData: MenuData[] = [
  { num: "01", label: "Work.", href: "/work" },
  { num: "02", label: "About.", href: "/about" },
  { num: "03", label: "Play.", href: "/play" },
];

// export const navigationData2: MenuData[] = [
//   { num: "01", label: "Intro.", href: "/" },
//   { num: "02", label: "Recent Work.", href: "/recent-work" },
//   { num: "03", label: "Tech Stack.", href: "/tech-stack", break: true },
//   // { label: "Archived.", href: "/archived-work" },
//   { num: "04", label: "Interests.", href: "/interests" },
//   { num: "05", label: "Get In Touch.", href: "/get-in-touch" },
//   {
//     num: "06",
//     label: "Github.",
//     href: "https://github.com/jamieowen",
//     hideNext: true,
//   },
//   {
//     num: "07",
//     label: "Packages.",
//     href: "/packages",
//     // hideNext: true,
//     devOnly: true,
//   },
//   // { label: "LinkedIn.", href: "https://www.linkedin.com/in/jamie-owen" },
// ];

interface NavigationData {
  items: MenuData[];
  current: MenuData;
  next: MenuData | null;
  prev: MenuData | null;
}

export const NavigationDataContext = createContext<NavigationData>(null);
export const useNavigationData = () => useContext(NavigationDataContext);

/**
 *
 * Stores the current, next & previous navigation data item.
 * To populate the navigation menu  & footer navigation.
 *
 */
export const NavigationDataProvider: FC<{}> = ({ children }) => {
  const route = useRouter();
  const data = useMemo<NavigationData>(() => {
    const filter = navigationData.filter((d) => {
      // manual fix for recent-work sub paths
      // TODO: not sure what this is actually for?

      return route.asPath.indexOf("/recent-work") === 0
        ? d.href === "/recent-work"
        : route.asPath === d.href;
    });
    let prev: MenuData = null;
    let next: MenuData = null;
    let current: MenuData = null;

    // Filter any dev mode only sections.
    const navData =
      process.env.NODE_ENV === "development"
        ? navigationData
        : navigationData.filter((entry) => !entry.devOnly);

    if (filter && filter.length > 0) {
      current = filter[0];
      const idx = navData.indexOf(current);
      prev = idx > 0 ? navData[idx - 1] : null;
      next = idx < navData.length - 1 ? navData[idx + 1] : null;
      if (next && next.hideNext) {
        next = null;
      }
    }

    // spoof a fake one for now.
    if (!current) {
      current = {
        href: "/",
        num: "--",
        label: "MISSING",
      };
    }
    return {
      items: navData,
      current,
      next,
      prev,
    };
  }, [route.asPath]);

  return (
    <NavigationDataContext.Provider value={data}>
      {children}
    </NavigationDataContext.Provider>
  );
};

export const Menu: FC<{}> = ({ children }) => {
  const nav = useNavigationData();
  const router = useRouter();
  const scroll = useScrollContext();
  const vis = 1 - scroll.headerVisibility;

  return (
    <Box
      as="nav"
      sx={{
        pointerEvents: "all",
        // transition: "transform 0.3s ease-out",
        // transform: `translate(0px,${-vis * 10}vh)`,
      }}
    >
      <BodyHeader>00 / Menu</BodyHeader>
      <Box
        sx={{
          "span:not(:last-child)": {
            marginRight: "2rem",
          },
        }}
      >
        {nav.items.map((link, i) => (
          <Fragment key={i}>
            <MenuLink
              as="span"
              className={router.asPath === link.href ? "selected" : ""}
              href={link.href}
            >
              {link.label}
            </MenuLink>
            {link.break ? <br /> : null}
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};

export const HiddenItems: FC<any> = () => {
  const env = process.env.NODE_ENV;
  if (process.env.NODE_ENV === "development") {
    return (
      <Fragment>
        <MenuLink as="span" href="/packages">
          Packages.
        </MenuLink>
      </Fragment>
    );
  } else {
    return <Fragment />;
  }
};
/**
 * Page Elements
 */

export const PageHeaderNavigation: FC<any> = () => {
  const nav = useNavigationData();
  return (
    <BodyHeader>
      {nav.current && nav.current.num} / {nav.current && nav.current.label}
    </BodyHeader>
  );
};
