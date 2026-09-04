'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function GetInvolvedHero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (contentRef?.current) {
        contentRef.current.style.opacity = '1';
        contentRef.current.style.transform = 'translateY(0)';
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[65vh] flex items-end overflow-hidden bg-primary" aria-label="Get Involved hero">
      <AppImage
        src="https://img.rocket.new/generatedImages/rocket_gen_img_1df3e1a25-1779648657482.png"
        alt="Diverse group of volunteers working together in an African community, outdoor setting, warm golden sunlight, collaborative atmosphere"
        fill
        priority
        className="object-cover"
        sizes="100vw" />
      
      <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-primary/40" />

      <div className="absolute top-1/3 right-1/3 w-80 h-80 blob-terracotta pointer-events-none" aria-hidden="true" />

      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-40 w-full"
        style={{
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)'
        }}>
        
        <p className="eyebrow text-accent mb-4">Join the Movement</p>
        <h1 className="text-display font-extrabold text-primary-foreground max-w-3xl mb-6 leading-none">
          Your Skills Can
          <br />
          <span className="font-serif italic text-accent font-normal">Change a Community.</span>
        </h1>
        <p className="text-primary-foreground/70 text-xl max-w-xl font-serif leading-relaxed">
          Volunteer on the ground. Fund the work that matters. Partner with us to scale impact. There is a place for you in OneTribe Africa.
        </p>
      </div>
    </section>);

}