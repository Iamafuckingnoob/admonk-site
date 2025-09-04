"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

type Props = React.ComponentProps<typeof Link> & {
  exact?: boolean;
  activeClassName?: string;
  inactiveClassName?: string;
};

export function NavLink({
  href,
  exact = false,
  activeClassName = "text-foreground font-medium",
  inactiveClassName = "text-muted-foreground hover:text-foreground",
  className,
  ...rest
}: Props) {
  const pathname = usePathname() || "/";
  const target =
    typeof href === "string" ? href : (href as any)?.pathname || "/";

  const isActive = exact ? pathname === target : pathname.startsWith(target);
  const classes = [
    className,
    isActive ? activeClassName : inactiveClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return <Link href={href} className={classes} {...rest} />;
}
