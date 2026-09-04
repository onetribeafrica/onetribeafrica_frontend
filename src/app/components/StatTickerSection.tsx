'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

const stats: Stat[] = [
  { value: '14', label: 'Countries Active', suffix: '+' },
  { value: '48', label: 'Active Programs', suffix: '' },
  { value: '340', label: 'Villages Reached', suffix: '+' },
  { value: '12,400', label: 'Lives Impacted', suffix: '+' },
  { value: '620', label: 'Volunteers', suffix: '+' },
  { value: '85', label: 'Field Partners', suffix: '+' },
  { value: '2018', label: 'Founded', suffix: '' },
  { value: '$2.4M', label: 'Grants Disbursed', suffix: '+' },
];

export default function StatTickerSection() {
  const [paused, setPaused] = useState(false);
  const [countersStarted, setCountersStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersStarted) {
          setCountersStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [countersStarted]);

  return (
    <section
      ref={sectionRef}
      className="py-16 border-y border-border overflow-hidden"
      style={{ background: 'var(--primary)' }}
      aria-label="Organization statistics"
    >
      <div
        className="flex gap-16 items-center"
        style={{
          animation: paused ? 'none' : 'ticker-scroll 30s linear infinite',
          display: 'flex',
          width: 'max-content',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-hidden={!paused}
      >
        {[...stats, ...stats].map((stat, i) => (
          <div key={i} className="flex items-center gap-16 flex-shrink-0">
            <div className="text-center">
              <p className="stat-number text-primary-foreground font-extrabold">
                {stat.value}
                <span className="text-accent">{stat.suffix}</span>
              </p>
              <p className="eyebrow text-primary-foreground/50 mt-1">{stat.label}</p>
            </div>
            <span className="w-px h-12 bg-primary-foreground/15 flex-shrink-0" aria-hidden="true" />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}