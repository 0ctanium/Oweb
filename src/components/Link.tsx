// @ts-nocheck
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';
import { LocaleContext } from '@context/LocaleContext';

const NextComposed = React.forwardRef(function NextComposed(
  props: NextComposedProps,
  ref
) {
  const {
    localeData: { lang },
  } = useContext(LocaleContext) || {};
  const { as, href, localise, ...other } = props;

  if (localise === true) {
    return (
      <NextLink href={`/[lang]${href}`} as={`/${lang}${as || href}`}>
        <a ref={ref} {...other} />
      </NextLink>
    );
  } else {
    return (
      <NextLink href={href} as={as}>
        <a ref={ref} {...other} />
      </NextLink>
    );
  }
});

NextComposed.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  prefetch: PropTypes.bool,
  localise: PropTypes.bool,
};

type NextComposedProps = {
  as: string | Record<string, unknown>;
  href: string | Record<string, unknown>;
  prefetch: boolean;
  localise?: boolean;
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props: LinkProps) {
  const {
    href,
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={innerRef}
        href={href}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href}
      {...other}
    />
  );
}

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
  localise: PropTypes.bool,
};

type LinkProps =
  | {
      activeClassName?: string;
      as?: string | Record<string, unknown>;
      className?: string;
      href?: string | Record<string, unknown>;
      innerRef?:
        | ((instance: unknown) => void)
        | React.MutableRefObject<unknown>;
      naked?: boolean;
      onClick?: (...args: any) => any;
      prefetch?: boolean;
      localise?: boolean;
    }
  | MuiLinkProps;

export default React.forwardRef<unknown, LinkProps>((props, ref) => (
  <Link {...props} innerRef={ref} />
));
