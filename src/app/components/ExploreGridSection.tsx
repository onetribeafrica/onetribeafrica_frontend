'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

// BENTO GRID AUDIT
// Array has 4 cards: [Community, Skills, Health, Business]
// Row 1 (grid-cols-2 lg:grid-cols-4):
// [col-1: Community cs-1] [col-2: Skills cs-1] [col-3: Health cs-1] [col-4: Business cs-1]
// Placed 4/4 cards ✓

interface ExploreItem {
  title: string;
  desc: string;
  href: string;
  image: string;
  alt: string;
  tag: string;
  color: string;
}

const items: ExploreItem[] = [
{
  title: 'Community Development',
  desc: 'Building resilient infrastructure and social cohesion in underserved communities.',
  href: '/#programs',
  image: "https://images.unsplash.com/photo-1653476835709-3150f8bf53e5",
  alt: 'African community gathering outdoors, warm afternoon sunlight, people in conversation, deep shadows on faces',
  tag: 'Social Impact',
  color: 'var(--accent)'
},
{
  title: 'Skills & Vocational Training',
  desc: 'Practical bootcamps in tech, tailoring, agriculture, and construction trade skills.',
  href: '/#programs',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_146b2f455-1776435742764.png",
  alt: 'Women in a workshop learning vocational skills, dim workshop interior, focused expressions, tools visible',
  tag: 'Education',
  color: 'var(--secondary)'
},
{
  title: 'Community Health Corps',
  desc: 'Preventive care, maternal health, and nutrition programs across 340+ villages.',
  href: '/#programs',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_113724752-1779648657265.png",
  alt: 'Healthcare worker in an African clinic, soft clinic lighting, patient interaction, warm amber tones',
  tag: 'Healthcare',
  color: 'var(--palm)'
},
{
  title: 'Small Business Fund',
  desc: 'Micro-grants and mentorship for entrepreneurs launching their first ventures.',
  href: '/#programs',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_17a451496-1773928867583.png",
  alt: 'African entrepreneur at market stall, bright outdoor market, vibrant colors, confident expression',
  tag: 'Entrepreneurship',
  color: 'var(--accent)'
}];


export default function ExploreGridSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.explore-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, i * 120);
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
    <section ref={sectionRef} className="py-24 px-6 bg-background" id="programs">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="eyebrow text-accent mb-3">What We Do</p>
            <h2 className="text-section font-extrabold text-foreground">
              Programs That
              <br />
              <span className="font-serif italic text-secondary font-normal">Move Communities.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-base leading-relaxed">
            Four pillars of change — each designed to create lasting, locally-owned transformation.
          </p>
        </div>

        {/* BENTO GRID: 4 equal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) =>
          <Link
            key={item.title}
            href={item.href}
            className="explore-card group relative aspect-[3/4] rounded-3xl overflow-hidden image-hover-zoom card-hover block focus-ring"
            style={{
              opacity: 0,
              transform: 'translateY(24px)',
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)`
            }}
            aria-label={`Explore ${item.title}`}>
            
              <AppImage
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
            
              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Tag */}
              <div
              className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-xs font-bold font-mono tracking-wider"
              style={{ background: item.color, color: 'var(--foreground)' }}>
              
                {item.tag}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-serif">
                  {item.desc}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Learn more <span aria-hidden="true">→</span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>);

}