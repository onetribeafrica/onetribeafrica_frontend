'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Program {
  name: string;
  region: string;
  description: string;
  image: string;
  alt: string;
  stat: string;
  statLabel: string;
  applyHref: string;
}

const programs: Program[] = [
{
  name: 'Vocational Bootcamp',
  region: 'East & West Africa',
  description: 'A 12-week intensive program covering digital skills, construction trades, and sustainable agriculture for ages 18 to 35.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_10521239b-1780412036199.png",
  alt: 'Young men in a vocational training session, workshop interior, dim lighting, focused on tasks',
  stat: '8,200+',
  statLabel: 'Graduates',
  applyHref: '/get-involved'
},
{
  name: 'Community Health Corps',
  region: 'Sub-Saharan Africa',
  description: 'Train and deploy community health workers to deliver maternal care, vaccination drives, and nutrition counseling.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_113724752-1779648657265.png",
  alt: 'Female health worker consulting with mother and child in rural clinic, warm lamp lighting, deep background shadows',
  stat: '340+',
  statLabel: 'Villages Served',
  applyHref: '/get-involved'
},
{
  name: 'Small Business Seed Fund',
  region: 'Pan-African',
  description: 'Micro-grants of $250 to $2,000 paired with 6 months of business mentorship for first-time entrepreneurs.',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b6479033-1772296923579.png",
  alt: 'African woman at market stall with products displayed, outdoor bright market setting, confident posture',
  stat: '1,400+',
  statLabel: 'Businesses Funded',
  applyHref: '/get-involved'
}];


export default function ProgramsTeaserSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.program-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6"
      style={{ background: 'var(--palm)' }}
      id="projects">
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="eyebrow text-accent mb-3">Active Programs</p>
            <h2 className="text-section font-extrabold text-primary-foreground">
              Apply for a
              <br />
              <span className="font-serif italic text-accent font-normal">Program.</span>
            </h2>
          </div>
          <p className="text-primary-foreground/60 max-w-sm text-base leading-relaxed font-serif">
            Applications are open year-round. Each program is free and designed to create real, lasting change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((prog, i) =>
          <div
            key={prog.name}
            className="program-card group bg-primary-foreground/5 border border-primary-foreground/10 rounded-3xl overflow-hidden card-hover"
            style={{
              opacity: 0,
              transform: 'translateY(28px)',
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)`
            }}>
            
              {/* Image */}
              <div className="aspect-[16/9] relative image-hover-zoom">
                <AppImage
                src={prog.image}
                alt={prog.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="eyebrow text-accent bg-primary/80 px-3 py-1.5 rounded-full">
                    {prog.region}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-7 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-primary-foreground">{prog.name}</h3>
                  <div className="text-right shrink-0">
                    <p className="text-2xl font-extrabold text-accent leading-none">{prog.stat}</p>
                    <p className="eyebrow text-primary-foreground/40 mt-0.5">{prog.statLabel}</p>
                  </div>
                </div>
                <p className="text-primary-foreground/60 text-sm leading-relaxed font-serif">
                  {prog.description}
                </p>
                <Link
                href={prog.applyHref}
                className="mt-2 btn-primary px-6 py-3 rounded-full text-sm font-bold inline-flex items-center gap-2 self-start focus-ring">
                
                  Apply Now
                  <Icon name="ArrowRightIcon" size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}