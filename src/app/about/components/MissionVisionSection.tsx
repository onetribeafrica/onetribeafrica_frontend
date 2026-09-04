'use client';

import React, { useEffect, useRef } from 'react';

export default function MissionVisionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.mv-item');
            items.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = '1';
                (item as HTMLElement).style.transform = 'translateY(0)';
              }, i * 200);
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
    <section ref={sectionRef} className="py-24 px-6 bg-background" id="mission">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <div
            className="mv-item p-10 rounded-3xl border border-border"
            style={{
              opacity: 0,
              transform: 'translateY(28px)',
              transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
            id="mission"
          >
            <p className="eyebrow text-secondary mb-4">Our Mission</p>
            <h2 className="text-3xl font-bold text-foreground mb-6 leading-tight">
              To empower African communities through locally-owned development programs that build lasting capability.
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed font-serif">
              We design, fund, and deliver programs in vocational skills, community health, and small business development — always with community leaders as equal partners in every decision. We measure success not by programs delivered, but by programs sustained independently.
            </p>
          </div>

          {/* Vision */}
          <div
            className="mv-item p-10 rounded-3xl"
            style={{
              opacity: 0,
              transform: 'translateY(28px)',
              transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              background: 'var(--primary)',
            }}
            id="vision"
          >
            <p className="eyebrow text-accent mb-4">Our Vision</p>
            <h2 className="text-3xl font-bold text-primary-foreground mb-6 leading-tight">
              An Africa where every community has the resources, skills, and leadership to determine its own future.
            </h2>
            <p className="text-primary-foreground/65 text-base leading-relaxed font-serif">
              We envision a continent where the cycle of dependency is broken — where local leaders run world-class programs, where young people have real economic pathways, and where the narrative about Africa is written by Africans. OneTribe is one step toward that future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}