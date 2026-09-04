'use client';

import React, { useState, useEffect, useRef } from 'react';


interface DonationTier {
  amount: string;
  label: string;
  description: string;
  impact: string;
  featured?: boolean;
}

const monthlyTiers: DonationTier[] = [
  {
    amount: '$15',
    label: 'Community Supporter',
    description: 'Monthly',
    impact: 'Provides school supplies for 3 children in our literacy programs for a full month.',
  },
  {
    amount: '$35',
    label: 'Health Advocate',
    description: 'Monthly',
    impact: 'Trains and equips one community health worker to serve their village for a month.',
    featured: true,
  },
  {
    amount: '$100',
    label: 'Program Partner',
    description: 'Monthly',
    impact: 'Covers operational costs for one small business mentorship session per month.',
  },
];

const oneTimeTiers: DonationTier[] = [
  {
    amount: '$50',
    label: 'Starter Gift',
    description: 'One-time',
    impact: 'Seeds a micro-enterprise starter kit — tools, materials, and first-month inventory.',
  },
  {
    amount: '$250',
    label: 'Impact Gift',
    description: 'One-time',
    impact: 'Funds one complete vocational bootcamp participant from enrollment to graduation.',
    featured: true,
  },
  {
    amount: '$500',
    label: 'Transformer',
    description: 'One-time',
    impact: 'Runs a full vocational bootcamp session for one community for one month.',
  },
];

export default function DonateSection() {
  const [mode, setMode] = useState<'monthly' | 'onetime'>('monthly');
  const [selected, setSelected] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.donate-item');
            items.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity= '1';
                (item as HTMLElement).style.transform = 'translateY(0)';
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const tiers = mode === 'monthly' ? monthlyTiers : oneTimeTiers;

  return (
    <section ref={sectionRef} className="py-24 px-6" style={{ background: 'var(--primary)' }} id="donate">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="eyebrow text-accent mb-3">Fund the Work</p>
          <h2 className="text-section font-extrabold text-primary-foreground">
            Partner
            <span className="font-serif italic text-accent"> With Us.</span>
          </h2>
          <p className="text-primary-foreground/60 text-lg font-serif mt-4 max-w-xl mx-auto">
            100% of donations go directly to programs. No overhead deductions. Audited annually.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full" style={{ background: 'rgba(246,241,231,0.08)' }}>
            <button
              onClick={() => { setMode('monthly'); setSelected(1); }}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all focus-ring ${
                mode === 'monthly' ?'bg-accent text-foreground shadow-lg' :'text-primary-foreground/60 hover:text-primary-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => { setMode('onetime'); setSelected(1); }}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all focus-ring ${
                mode === 'onetime' ?'bg-accent text-foreground shadow-lg' :'text-primary-foreground/60 hover:text-primary-foreground'
              }`}
            >
              One-Time
            </button>
          </div>
        </div>

        {/* Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier, i) => (
            <button
              key={tier.amount}
              onClick={() => setSelected(i)}
              className={`donate-item text-left p-8 rounded-3xl border-2 transition-all duration-300 focus-ring ${
                selected === i
                  ? 'border-accent bg-accent/10 scale-[1.02]'
                  : 'border-primary-foreground/10 hover:border-accent/40'
              }`}
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)`,
              }}
            >
              {tier.featured && (
                <div className="inline-flex mb-4">
                  <span className="eyebrow text-foreground bg-accent px-3 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <p className="text-4xl font-extrabold text-primary-foreground mb-1">
                {tier.amount}
                <span className="text-lg font-normal text-primary-foreground/50 ml-1">/{mode === 'monthly' ? 'mo' : 'once'}</span>
              </p>
              <p className="font-bold text-accent text-lg mb-4">{tier.label}</p>
              <p className="text-primary-foreground/60 text-sm leading-relaxed font-serif">
                {tier.impact}
              </p>
              <div className={`mt-6 flex items-center gap-2 text-sm font-bold transition-colors ${
                selected === i ? 'text-accent' : 'text-primary-foreground/40'
              }`}>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  selected === i ? 'border-accent bg-accent' : 'border-primary-foreground/30'
                }`}>
                  {selected === i && <span className="text-foreground text-xs">✓</span>}
                </div>
                {selected === i ? 'Selected' : 'Select this tier'}
              </div>
            </button>
          ))}
        </div>

        {/* Donate CTA */}
        <div className="max-w-md mx-auto text-center donate-item"
          style={{
            opacity: 0,
            transform: 'translateY(24px)',
            transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <button className="btn-primary w-full py-5 rounded-full text-lg font-bold focus-ring mb-4">
            Donate {tiers[selected]?.amount}{mode === 'monthly' ? '/month' : ' Now'}
          </button>
          <p className="text-primary-foreground/40 text-xs font-mono">
            Secure payment · SSL encrypted · Tax receipt provided
          </p>
        </div>
      </div>
    </section>
  );
}