'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import AppImage from '@/components/ui/AppImage';

interface Story {
  quote: string;
  name: string;
  location: string;
  program: string;
  image: string;
  alt: string;
}

const stories: Story[] = [
{
  quote: 'Before the vocational bootcamp, I had no way to earn a consistent income. Three months later, I had my own tailoring shop and two apprentices working under me. OneTribe did not give me charity — they gave me capability.',
  name: 'Amara Diallo',
  location: 'Dakar, Senegal',
  program: 'Vocational Bootcamp, 2024',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d85128e5-1773224799006.png",
  alt: 'Amara Diallo, confident woman in colorful traditional attire, warm natural light, direct gaze'
},
{
  quote: 'The Small Business Fund gave us ₦180,000 and six months of mentorship. We used it to buy a commercial sewing machine and fabric stock. Our revenue tripled within the first year. This is what real partnership looks like.',
  name: 'Chukwuemeka Obi',
  location: 'Enugu, Nigeria',
  program: 'Small Business Fund, 2023',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b53ad4e7-1772139414629.png",
  alt: 'Chukwuemeka Obi, young man in a business setting, confident smile, well-lit portrait'
},
{
  quote: 'As a community health worker trained by OneTribe, I have now reached over 400 mothers in my district. Women who used to deliver at home alone now come to our clinic. I am proud to be part of this change.',
  name: 'Fatuma Wanjiku',
  location: 'Kisumu, Kenya',
  program: 'Community Health Corps, 2024',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1100c0603-1764656082991.png",
  alt: 'Fatuma Wanjiku, healthcare worker in uniform, outdoor community setting, warm afternoon light'
},
{
  quote: 'My village had no access to clean water or health education. The OneTribe field team spent six weeks with us — not just building, but teaching. Two years on, we run the program ourselves. That is true local ownership.',
  name: 'Kwesi Mensah',
  location: 'Tamale, Ghana',
  program: 'Community Development, 2022',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_178d313ce-1763296800780.png",
  alt: 'Kwesi Mensah, community leader, outdoor setting with village in background, natural daylight'
}];


export default function ImpactStoriesSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  }, [animating]);

  const next = useCallback(() => {
    goTo((current + 1) % stories.length);
  }, [current, goTo]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 7000);
    return () => {if (intervalRef.current) clearInterval(intervalRef.current);};
  }, [next]);

  const story = stories[current];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-background overflow-hidden"
      id="impact"
      aria-label="Impact stories">
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="eyebrow text-secondary mb-3">Real Stories</p>
          <h2 className="text-section font-extrabold text-foreground">
            Voices of
            <br />
            <span className="font-serif italic text-palm font-normal">Change.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            className="relative aspect-[4/5] rounded-3xl overflow-hidden image-hover-zoom"
            style={{
              opacity: animating ? 0 : 1,
              transition: 'opacity 0.3s ease'
            }}>
            
            <AppImage
              src={story.image}
              alt={story.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />

            {/* Name overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="glass px-6 py-4 rounded-2xl">
                <p className="font-bold text-foreground text-lg">{story.name}</p>
                <p className="eyebrow text-muted-foreground mt-1">{story.location}</p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div
            className="space-y-8"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(16px)' : 'translateY(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease'
            }}>
            
            <div className="w-16 h-1 bg-accent rounded-full" />

            <blockquote className="font-serif italic text-2xl md:text-3xl text-foreground leading-relaxed">
              &ldquo;{story.quote}&rdquo;
            </blockquote>

            <div className="space-y-1">
              <p className="font-bold text-foreground text-lg">{story.name}</p>
              <p className="eyebrow text-accent">{story.program}</p>
              <p className="text-muted-foreground text-sm">{story.location}</p>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4 pt-4">
              {stories.map((_, i) =>
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to story ${i + 1}`}
                className={`rounded-full transition-all duration-300 focus-ring ${
                i === current ?
                'w-10 h-3 bg-accent' : 'w-3 h-3 bg-border hover:bg-muted-foreground'}`
                } />

              )}

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => goTo((current - 1 + stories.length) % stories.length)}
                  aria-label="Previous story"
                  className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors focus-ring text-lg">
                  
                  ‹
                </button>
                <button
                  onClick={next}
                  aria-label="Next story"
                  className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors focus-ring text-lg">
                  
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}