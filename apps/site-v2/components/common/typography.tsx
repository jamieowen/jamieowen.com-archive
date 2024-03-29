import { FC, ComponentProps, Fragment } from "react";
import { Heading, Text } from "theme-ui";
import Link from "next/link";

export const BodyText: FC<ComponentProps<typeof Text>> = ({
  children,
  ...props
}) => {
  return (
    <Text as="p" variant="body_text" {...props}>
      {children}
    </Text>
  );
};

export const BodyTextSmall: FC<ComponentProps<typeof Text>> = ({
  children,
  ...props
}) => {
  return (
    <Text as="p" variant="body_small" {...props}>
      {children}
    </Text>
  );
};

export const BodyTextLarge: FC<{}> = ({ children }) => {
  return (
    <Text as="h3" variant="body_large">
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

export const LinkWrapper: FC<ComponentProps<typeof Link>> = ({
  href,
  children,
}) => {
  return (
    <Fragment>
      {href && href !== "" ? (
        <Link href={href} passHref>
          <a>{children}</a>
        </Link>
      ) : (
        <span>{children}</span>
      )}
    </Fragment>
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

/**
 *
 * Body Link
 *
 * Use for next / back navigation.
 *
 */
export const BodyLink: FC<
  ComponentProps<typeof Text> & { href: string; target?: string }
> = ({ children, href, target = undefined, ...props }) => {
  return (
    <Link href={href} passHref>
      {/* @ts-ignore */}
      <Text as="a" variant="navigation_body" {...props} target={target}>
        {children}
      </Text>
    </Link>
  );
};

export const BodyLinkPrimary: FC<ComponentProps<typeof BodyLink>> = (props) => {
  return <BodyLink {...props} variant="body_link" />;
};

/**
 *
 * List Link.
 *
 * Used for the main navigation menu.
 *
 */
export const ListLink: FC<ComponentProps<typeof Text> & { href: string }> = ({
  children,
  href,
  ...props
}) => {
  return (
    <Text as="span" variant="navigation_list" {...props}>
      <LinkWrapper href={href}>{children}</LinkWrapper>
    </Text>
  );
};
