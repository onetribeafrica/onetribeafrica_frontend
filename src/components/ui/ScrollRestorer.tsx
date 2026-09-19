'use client';

import { useEffect } from 'react';
import { SCROLL_TARGET_KEY } from './SectionLink';

export default function ScrollRestorer() {
  useEffect(() => {
    const id = sessionStorage.getItem(SCROLL_TARGET_KEY);
    if (!id) return;
    sessionStorage.removeItem(SCROLL_TARGET_KEY);

    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    });
  }, []);

  return null;
}
