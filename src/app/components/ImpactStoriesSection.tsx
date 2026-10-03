'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Story {
  quote: string;
  name: string;
  location: string;
  program: string;
}

const stories: Story[] = [
{
  quote: 'Before the vocational bootcamp, I had no way to earn a consistent income. Three months later, I had my own tailoring shop and two apprentices working under me. OneTribe did not give me charity. They gave me capability.',
  name: 'Amara Diallo',
  location: 'Dakar, Senegal',
  program: 'Vocational Bootcamp, 2024'
},
{
  quote: 'The Small Business Fund gave us ₦180,000 and six months of mentorship. We used it to buy a commercial sewing machine and fabric stock. Our revenue tripled within the first year. This is what real partnership looks like.',
  name: 'Chukwuemeka Obi',
  location: 'Enugu, Nigeria',
  program: 'Small Business Fund, 2023'
},
{
  quote: 'As a community health worker trained by OneTribe, I have now reached over 400 mothers in my district. Women who used to deliver at home alone now come to our clinic. I am proud to be part of this change.',
  name: 'Fatuma Wanjiku',
  location: 'Kisumu, Kenya',
  program: 'Community Health Corps, 2024'
},
{
  quote: 'My village had no access to clean water or health education. The OneTribe field team spent six weeks with us, not just building but teaching. Two years on, we run the program ourselves. That is true local ownership.',
  name: 'Kwesi Mensah',
  location: 'Tamale, Ghana',
  program: 'Community Development, 2022'
}];


export default function ImpactStoriesSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
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
    if (paused) return;
    intervalRef.current = setInterval(next, 7000);
    return () => {if (intervalRef.current) clearInterval(intervalRef.current);};
  }, [next, paused]);

  const story = stories[current];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-background overflow-hidden"
      id="impact"
      aria-label="Impact stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="eyebrow text-secondary mb-3">Real Stories</p>
          <h2 className="text-section font-extrabold text-foreground">
            Voices of Change.
          </h2>
        </div>

        <div className="relative">
          <div className="relative rounded-[2.5rem] border border-border bg-card px-8 py-14 md:px-20 md:py-16 text-center">
            <span
              aria-hidden="true"
              className="font-serif text-accent/20 block leading-none select-none"
              style={{ fontSize: 'clamp(5rem, 10vw, 8rem)' }}
            >
              &ldquo;
            </span>

            <div
              style={{
                opacity: animating ? 0 : 1,
                transform: animating ? 'translateY(10px)' : 'translateY(0)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                marginTop: 'clamp(-3.5rem, -6vw, -2.5rem)'
              }}>

              <blockquote className="font-serif italic text-xl md:text-3xl text-foreground leading-snug max-w-2xl mx-auto">
                {story.quote}
              </blockquote>

              <div className="mt-8 space-y-1">
                <p className="font-bold text-foreground text-lg">{story.name}</p>
                <p className="eyebrow text-accent">{story.program}</p>
                <p className="text-muted-foreground text-sm">{story.location}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 pt-10">
            {stories.map((s, i) =>
            <button
              key={s.name}
              onClick={() => goTo(i)}
              aria-label={`Show testimonial from ${s.name}`}
              aria-current={i === current}
              className={`rounded-full transition-all duration-300 focus-ring ${
              i === current ?
              'w-10 h-3 bg-accent' : 'w-3 h-3 bg-border hover:bg-muted-foreground'}`
              } />

            )}
          </div>
        </div>
      </div>
    </section>);

}
