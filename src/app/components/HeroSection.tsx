'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from '@/components/ui/SectionLink';
import AppImage from '@/components/ui/AppImage';

interface HeroSlide {
  id: number;
  image: string;
  alt: string;
  eyebrow: string;
  headline: string[];
  subhead: string;
  ctaPrimary: {label: string;href: string;};
  ctaSecondary: {label: string;href: string;};
}

const slides: HeroSlide[] = [
{
  id: 1,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ac1e0c89-1776968846945.png",
  alt: 'African community members gathered together in a village, warm golden light, deep shadows, atmospheric dusk sky',
  eyebrow: 'Community · Dignity · Growth',
  headline: ['Many Communities.', 'One Tribe.'],
  subhead: 'Uniting 14 countries through skills training, health programs, and grassroots empowerment since 2018.',
  ctaPrimary: { label: 'Donate Today', href: '/get-involved#donate' },
  ctaSecondary: { label: 'Learn Our Story', href: '/about' }
},
{
  id: 2,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_146b2f455-1776435742764.png",
  alt: 'Young African women in a vocational training workshop, dim interior workshop lighting, tools and materials, focused expressions',
  eyebrow: 'Skills · Opportunity · Independence',
  headline: ['Skills That', 'Change Lives.'],
  subhead: 'Over 12,000 graduates from our vocational bootcamps now run their own businesses across East and West Africa.',
  ctaPrimary: { label: 'View Programs', href: '/#programs' },
  ctaSecondary: { label: 'Apply Now', href: '/get-involved' }
},
{
  id: 3,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1823b2bcf-1775503975799.png",
  alt: 'African healthcare worker with community members, shadowed clinic interior, warm amber lamp light, deep contrast',
  eyebrow: 'Health · Access · Hope',
  headline: ['Healthcare for', 'Every Community.'],
  subhead: 'Our Community Health Corps has reached 340+ villages, delivering preventive care and maternal health support.',
  ctaPrimary: { label: 'Fund This Work', href: '/get-involved#donate' },
  ctaSecondary: { label: 'See Our Impact', href: '/#impact' }
}];


export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Auto advance
  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 6000);
    return () => {if (intervalRef.current) clearInterval(intervalRef.current);};
  }, [paused, next]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const slide = slides[current];

  return (
    <section
      ref={heroRef}
      className="relative min-h-[600px] md:min-h-[82vh] lg:max-h-[820px] flex items-center overflow-hidden bg-primary"
      aria-label="Hero section">
      
      {/* Background image carousel */}
      {slides.map((s, i) =>
      <div
        key={s.id}
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: i === current ? 1 : 0 }}
        aria-hidden={i !== current}>
        
          <AppImage
          src={s.image}
          alt={s.alt}
          fill
          priority={i === 0}
          className="object-cover"
          sizes="100vw" />
        
          {/* Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-primary/30" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32 pb-20">
        <div className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-5"
            style={{ animationDelay: '0.1s' }}>
            
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="eyebrow text-primary-foreground/80">{slide.eyebrow}</span>
          </div>

          {/* Headline */}
          <h1 className="text-hero font-extrabold text-primary-foreground max-w-4xl mb-4">
            {slide.headline[0]}
            <br />
            <span className="gradient-text-gold font-serif italic font-normal">
              {slide.headline[1]}
            </span>
          </h1>

          {/* Subhead */}
          <p className="text-primary-foreground/80 text-base md:text-lg max-w-xl mb-7 leading-relaxed font-serif text-left">
            {slide.subhead}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={slide.ctaPrimary.href}
              className="btn-primary px-7 py-3.5 rounded-full text-base font-bold inline-flex items-center gap-2 focus-ring">
              
              {slide.ctaPrimary.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={slide.ctaSecondary.href}
              className="btn-outline px-7 py-3.5 rounded-full text-base font-bold inline-flex items-center gap-2 focus-ring">
              
              {slide.ctaSecondary.label}
            </Link>
          </div>
        </div>

        {/* Slide dots + controls */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <div className="flex items-center gap-3" role="tablist" aria-label="Hero slides">
            {slides.map((s, i) =>
            <button
              key={s.id}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              onClick={() => {setCurrent(i);}}
              className={`rounded-full transition-all duration-300 focus-ring ${
              i === current ?
              'w-8 h-2.5 bg-accent' : 'w-2.5 h-2.5 bg-primary-foreground/30 hover:bg-primary-foreground/60'}`
              } />

            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPaused(!paused)}
              aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              className="w-10 h-10 rounded-full glass-dark flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-colors focus-ring">
              
              {paused ? '▶' : '⏸'}
            </button>
            <button
              onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full glass-dark flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-colors focus-ring">
              
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full glass-dark flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-colors focus-ring">
              
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none" aria-hidden="true">
        <span className="eyebrow text-primary-foreground/30">Scroll</span>
        <div className="w-px h-12 bg-primary-foreground/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-accent"
            style={{
              height: '50%',
              animation: 'float-up 1.5s ease-in-out infinite'
            }} />
          
        </div>
      </div>
    </section>);

}