'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

// BENTO GRID AUDIT
// Array has 6 cards: [Adaeze, Kwame, Fatima, Sipho, Nkechi, Omar]
// Row 1 (grid-cols-3): [col-1: Adaeze cs-1] [col-2: Kwame cs-1] [col-3: Fatima cs-1]
// Row 2 (grid-cols-3): [col-1: Sipho cs-1] [col-2: Nkechi cs-1] [col-3: Omar cs-1]
// Placed 6/6 cards ✓

interface TeamMember {
  name: string;
  role: string;
  location: string;
  image: string;
  alt: string;
}

const team: TeamMember[] = [
{
  name: 'Adaeze Okonkwo',
  role: 'Executive Director',
  location: 'Lagos, Nigeria',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1097c987c-1772183059691.png",
  alt: 'Adaeze Okonkwo, professional woman, business attire, confident smile, well-lit portrait'
},
{
  name: 'Kwame Asante',
  role: 'Director of Programs',
  location: 'Accra, Ghana',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_13881563a-1763292584866.png",
  alt: 'Kwame Asante, professional man in business attire, friendly expression, neutral background'
},
{
  name: 'Fatima Al-Rashid',
  role: 'Head of Partnerships',
  location: 'Nairobi, Kenya',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0381e86-1763300454222.png",
  alt: 'Fatima Al-Rashid, professional woman, warm smile, modern office background, natural light'
},
{
  name: 'Sipho Dlamini',
  role: 'Field Operations Lead',
  location: 'Johannesburg, South Africa',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bf254c2d-1768540209934.png",
  alt: 'Sipho Dlamini, professional man, confident posture, outdoor natural light, direct gaze'
},
{
  name: 'Nkechi Eze',
  role: 'Health Programs Manager',
  location: 'Kampala, Uganda',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a327bec6-1772078449586.png",
  alt: 'Nkechi Eze, healthcare professional, warm expression, clinic background, soft lighting'
},
{
  name: 'Omar Hassan',
  role: 'Communications Director',
  location: 'Dakar, Senegal',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11edb8861-1772475034213.png",
  alt: 'Omar Hassan, media professional, confident smile, modern office setting, bright natural light'
}];


export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.team-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6" style={{ background: 'var(--palm)' }} id="team">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="eyebrow text-accent mb-3">The People Behind the Work</p>
          <h2 className="text-section font-extrabold text-primary-foreground">
            Our
            <span className="font-serif italic text-accent"> Team.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) =>
          <div
            key={member.name}
            className="team-card group relative rounded-3xl overflow-hidden image-hover-zoom card-hover"
            style={{
              opacity: 0,
              transform: 'translateY(24px)',
              transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)`
            }}>
            
              <div className="aspect-[3/4] relative">
                <AppImage
                src={member.image}
                alt={member.alt}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-accent text-sm font-semibold mt-1">{member.role}</p>
                  <p className="eyebrow text-white/50 mt-1">{member.location}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}