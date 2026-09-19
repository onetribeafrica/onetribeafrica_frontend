'use client';

import React from 'react';
import Link from 'next/link';

const SCROLL_TARGET_KEY = 'ota-scroll-target';

type SectionLinkProps = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

function normalize(path: string) {
  if (path === '' || path === '/') return '/';
  return path.replace(/\/$/, '');
}

export default function SectionLink({ href, onClick, ...props }: SectionLinkProps) {
  const [path, hash] = href.split('#');
  const cleanPath = path || '/';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (!hash || typeof window === 'undefined') return;

    if (normalize(window.location.pathname) === normalize(cleanPath)) {
      e.preventDefault();
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      sessionStorage.setItem(SCROLL_TARGET_KEY, hash);
    }
  };

  return <Link href={cleanPath} onClick={handleClick} {...props} />;
}

export { SCROLL_TARGET_KEY };
