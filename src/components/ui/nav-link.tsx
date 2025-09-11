"use client";

import * as React from "react";

type NavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  active?: boolean;
};

export function NavLink({ active, onClick, ...rest }: NavLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
  };
  return <a data-active={active ? "true" : "false"} onClick={handleClick} {...rest} />;
}
