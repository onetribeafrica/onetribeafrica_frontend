'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function AboutHero() {
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
    <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-primary" aria-label="About OneTribe Africa">
      <AppImage
        src="https://img.rocket.new/generatedImages/rocket_gen_img_1ac1e0c89-1776968846945.png"
        alt="African community members gathered, warm golden light, deep shadows, atmospheric dusk"
        fill
        priority
        className="object-cover"
        sizes="100vw" />
      
      <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-primary/40" />

      {/* Blobs */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 blob-gold pointer-events-none" aria-hidden="true" />

      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-40 w-full"
        style={{
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)'
        }}>
        
        <p className="eyebrow text-accent mb-4">Our Story</p>
        <h1 className="text-display font-extrabold text-primary-foreground max-w-3xl mb-6 leading-none">
          Built on the Belief That
          <br />
          <span className="font-serif italic text-accent font-normal">Communities Lead.</span>
        </h1>
        <p className="text-primary-foreground/70 text-xl max-w-2xl font-serif leading-relaxed">
          OneTribe Africa was founded in 2018 with one conviction: that lasting change happens when communities are treated as capable partners, not passive recipients. Every program we run is designed to hand ownership back to the people it serves.
        </p>
      </div>
    </section>);

}