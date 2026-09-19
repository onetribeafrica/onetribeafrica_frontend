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
  const blobGoldRef = useRef<HTMLDivElement>(null);
  const blobTerraRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nodeCanvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  // Node network animation
  useEffect(() => {
    const canvas = nodeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Node {
      x: number;y: number;
      vx: number;vy: number;
      r: number;opacity: number;
      pulseOffset: number;
    }

    const nodes: Node[] = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 3 + 1.5,
      opacity: Math.random() * 0.5 + 0.3,
      pulseOffset: Math.random() * Math.PI * 2
    }));

    let t = 0;
    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(222, 74, 30, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const pulse = Math.sin(t + node.pulseOffset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(222, 74, 30, ${node.opacity * pulse})`;
        ctx.fill();

        // Move
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Cursor parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const mx = (e.clientX - cx) / cx;
      const my = (e.clientY - cy) / cy;

      if (blobGoldRef.current) {
        blobGoldRef.current.style.transform = `translate(${mx * 40}px, ${my * 30}px)`;
      }
      if (blobTerraRef.current) {
        blobTerraRef.current.style.transform = `translate(${mx * -25}px, ${my * -20}px)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `perspective(1200px) rotateY(${mx * 2}deg) rotateX(${-my * 2}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      className="relative min-h-screen flex items-center overflow-hidden bg-primary"
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

      {/* Atmospheric blobs */}
      <div
        ref={blobGoldRef}
        className="absolute top-1/4 right-1/4 w-96 h-96 blob-gold pointer-events-none"
        style={{ transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)' }}
        aria-hidden="true" />
      
      <div
        ref={blobTerraRef}
        className="absolute bottom-1/3 left-1/3 w-80 h-80 blob-terracotta pointer-events-none"
        style={{ transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)' }}
        aria-hidden="true" />
      

      {/* Node network canvas */}
      <canvas
        ref={nodeCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6, mixBlendMode: 'screen' }}
        aria-hidden="true" />
      

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32 pb-24">
        <div
          ref={contentRef}
          style={{ transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)' }}
          className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-8"
            style={{ animationDelay: '0.1s' }}>
            
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="eyebrow text-primary-foreground/80">{slide.eyebrow}</span>
          </div>

          {/* Headline */}
          <h1 className="text-hero font-extrabold text-primary-foreground max-w-3xl mb-6 leading-none">
            {slide.headline[0]}
            <br />
            <span className="gradient-text-gold font-serif italic font-normal">
              {slide.headline[1]}
            </span>
          </h1>

          {/* Subhead */}
          <p className="text-primary-foreground/75 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-serif text-left">
            {slide.subhead}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={slide.ctaPrimary.href}
              className="btn-primary px-8 py-4 rounded-full text-base font-bold inline-flex items-center gap-2 focus-ring">
              
              {slide.ctaPrimary.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={slide.ctaSecondary.href}
              className="btn-outline px-8 py-4 rounded-full text-base font-bold inline-flex items-center gap-2 focus-ring">
              
              {slide.ctaSecondary.label}
            </Link>
          </div>
        </div>

        {/* Slide dots + controls */}
        <div className="absolute bottom-10 left-6 right-6 flex items-center justify-between">
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
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none" aria-hidden="true">
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