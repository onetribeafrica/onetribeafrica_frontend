'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

// BENTO GRID AUDIT
// Array has 4 cards: [Dignity, Local Ownership, Transparency, Long-Term Partnership]
// Row 1 (grid-cols-2 lg:grid-cols-4):
// [col-1: Dignity cs-1] [col-2: Local Ownership cs-1] [col-3: Transparency cs-1] [col-4: Long-Term Partnership cs-1]
// Placed 4/4 cards ✓

interface Value {
  title: string;
  description: string;
  icon: string;
  color: string;
  bg: string;
}

const values: Value[] = [
  {
    title: 'Dignity First',
    description: 'Every person we work with is a capable partner and a full human being. We communicate and design with that dignity at the center of everything.',
    icon: 'HeartIcon',
    color: 'var(--secondary)',
    bg: 'rgba(193, 81, 47, 0.08)',
  },
  {
    title: 'Local Ownership',
    description: 'Programs that cannot be run independently within three years are programs we have not done well enough. Community ownership is the goal, not the bonus.',
    icon: 'HomeIcon',
    color: 'var(--palm)',
    bg: 'rgba(32, 73, 61, 0.08)',
  },
  {
    title: 'Radical Transparency',
    description: 'We publish our program results, our finances, and our failures. Trust is built through honesty, not polished reports.',
    icon: 'EyeIcon',
    color: 'var(--accent)',
    bg: 'rgba(232, 163, 61, 0.08)',
  },
  {
    title: 'Long-Term Partnership',
    description: 'We do not parachute in for a week and leave. Our shortest program commitment is 18 months. Real change takes time and presence.',
    icon: 'HandshakeIcon',
    color: 'var(--primary)',
    bg: 'rgba(30, 43, 79, 0.08)',
  },
];

export default function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.value-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, i * 130);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6" style={{ background: 'var(--background)' }} id="values">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="eyebrow text-accent mb-3">What We Stand For</p>
          <h2 className="text-section font-extrabold text-foreground">
            Our
            <span className="font-serif italic text-secondary"> Values.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <div
              key={value.title}
              className="value-card p-8 rounded-3xl border border-border card-hover flex flex-col gap-5"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)`,
                background: value.bg,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: value.bg, border: `1.5px solid ${value.color}30` }}
              >
                <Icon
                  name={value.icon as Parameters<typeof Icon>[0]['name']}
                  size={24}
                  className=""
                  style={{ color: value.color } as React.CSSProperties}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-serif">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}