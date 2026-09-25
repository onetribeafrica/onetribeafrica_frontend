'use client';

import React from 'react';

export default function SkipLink() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const main = document.getElementById('main');
    main?.focus({ preventScroll: true });
    main?.scrollIntoView({ block: 'start' });
  };

  return (
    <a
      href="#main"
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:px-5 focus:py-3 focus:rounded-full focus:bg-accent focus:text-accent-foreground focus:text-sm focus:font-bold"
    >
      Skip to main content
    </a>
  );
}
