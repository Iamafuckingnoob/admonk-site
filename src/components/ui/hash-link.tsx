"use client";

import * as React from "react";

type Props = React.ComponentProps<"a"> & {
  activeClassName?: string;
  inactiveClassName?: string;
};

export function HashLink({
  href,
  className,
  activeClassName = "text-amber-300 font-medium",
  inactiveClassName = "hover:text-amber-300",
  ...rest
}: Props) {
  const [hash, setHash] = React.useState(
    typeof window !== "undefined" ? window.location.hash || "#top" : "#top"
  );

  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#top");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const target = typeof href === "string" ? href : (href as any);
  const isActive = hash === target;

  const classes = [
    className,
    isActive ? activeClassName : inactiveClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return <a href={target} className={classes} {...rest} />;
}
