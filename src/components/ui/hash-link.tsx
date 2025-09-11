"use client";

import * as React from "react";

type HashLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: `#${string}`;
};

export function HashLink({ href, onClick, ...rest }: HashLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onClick?.(e);
  };

  return <a href={href} onClick={handleClick} {...rest} />;
}
