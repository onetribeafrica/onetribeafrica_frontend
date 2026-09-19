'use client';

import React, { useEffect, useRef } from 'react';
import Link from '@/components/ui/SectionLink';
import AppImage from '@/components/ui/AppImage';

export default function GetInvolvedCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const panels = entry.target.querySelectorAll('.cta-panel');
            panels.forEach((panel, i) => {
              setTimeout(() => {
                (panel as HTMLElement).style.opacity = '1';
                (panel as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
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
    <section ref={sectionRef} className="py-24 px-6" style={{ background: 'var(--primary)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="eyebrow text-accent mb-3">Join the Movement</p>
          <h2 className="text-section font-extrabold text-primary-foreground">
            How Will You
            <br />
            <span className="font-serif italic text-accent font-normal">Get Involved?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Volunteer Panel */}
          <div
            className="cta-panel group relative rounded-3xl overflow-hidden aspect-[4/3] image-hover-zoom"
            style={{
              opacity: 0,
              transform: 'translateY(28px)',
              transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)'
            }}>
            
            <AppImage
              src="https://img.rocket.new/generatedImages/rocket_gen_img_1df3e1a25-1779648657482.png"
              alt="Volunteers working together in an African community project, outdoor setting, warm sunlight, collaborative energy"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <p className="eyebrow text-accent mb-3">For Individuals</p>
              <h3 className="text-3xl font-bold text-white mb-4">Volunteer With Us</h3>
              <p className="text-white/70 text-base font-serif leading-relaxed mb-8 max-w-sm">
                Join our field teams across 14 countries. Bring your skills in training, health, engineering, or education, and help communities lead their own transformation.
              </p>
              <Link
                href="/get-involved#volunteer"
                className="btn-primary self-start px-7 py-3.5 rounded-full text-sm font-bold inline-flex items-center gap-2 focus-ring">
                
                Apply to Volunteer <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Donate Panel */}
          <div
            className="cta-panel group relative rounded-3xl overflow-hidden aspect-[4/3] image-hover-zoom"
            style={{
              opacity: 0,
              transform: 'translateY(28px)',
              transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: '150ms'
            }}>
            
            <AppImage
              src="https://img.rocket.new/generatedImages/rocket_gen_img_4397ca9b5-1788477211643.png"
              alt="Community members receiving support, outdoor setting, warm golden hour light, dignified expressions"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <p className="eyebrow text-accent mb-3">For Donors & Partners</p>
              <h3 className="text-3xl font-bold text-white mb-4">Fund the Work</h3>
              <p className="text-white/70 text-base font-serif leading-relaxed mb-8 max-w-sm">
                Every dollar goes directly to programs. $35/month trains a community health worker. $100 seeds a small business. $500 runs a vocational bootcamp for a month.
              </p>
              <Link
                href="/get-involved#donate"
                className="self-start px-7 py-3.5 rounded-full text-sm font-bold inline-flex items-center gap-2 border-2 border-accent text-accent hover:bg-accent hover:text-foreground transition-all focus-ring">
                
                Donate Now <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>);

}