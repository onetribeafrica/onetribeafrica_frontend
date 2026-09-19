'use client';

import React, { useEffect, useRef } from 'react';
import Link from '@/components/ui/SectionLink';

export default function AboutCTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target.querySelector('.cta-content') as HTMLElement;
            if (el) {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }
          }
        });
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="cta-content"
          style={{
            opacity: 0,
            transform: 'translateY(28px)',
            transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <p className="eyebrow text-accent mb-4">Ready to Help?</p>
          <h2 className="text-section font-extrabold text-foreground mb-6">
            Be Part of the
            <span className="font-serif italic text-secondary"> Tribe.</span>
          </h2>
          <p className="text-muted-foreground text-xl font-serif leading-relaxed mb-10 max-w-2xl mx-auto">
            Whether you want to volunteer in the field, fund a program, or partner with us institutionally, there is a place for you in OneTribe Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-involved#volunteer"
              className="btn-primary px-8 py-4 rounded-full text-base font-bold inline-flex items-center gap-2 justify-center focus-ring"
            >
              Volunteer Now <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/get-involved#donate"
              className="px-8 py-4 rounded-full text-base font-bold inline-flex items-center gap-2 justify-center border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all focus-ring"
            >
              Donate Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}