import { FC, ComponentProps } from "react";
import { Heading, Text } from "theme-ui";
import Link from "next/link";

export const BodyText: FC<{}> = ({ children }) => {
  return (
    <Text as="p" variant="body_text">
      {children}
    </Text>
  );
};

export const BodySmallText: FC<{}> = ({ children }) => {
  return (
    <Text as="p" variant="body_small">
      {children}
    </Text>
  );
};

/**
 *
 * Body Header
 *
 * The small micro header above each content area.
 *
 */
export const BodyHeader: FC<{}> = ({ children }) => {
  return (
    <Heading as="h1" variant="body_header">
      {children}
    </Heading>
  );
};

/**
 *
 * Menu Link.
 *
 * Used for the main navigation menu.
 *
 */
export const MenuLink: FC<ComponentProps<typeof Text> & { href: string }> = ({
  children,
  href,
  ...props
}) => {
  return (
    <Link href={href}>
      <Text as="div" variant="navigation_menu" {...props}>
        <a>{children}</a>
      </Text>
    </Link>
  );
};
