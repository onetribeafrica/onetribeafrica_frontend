'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const steps = [
  {
    number: '01',
    title: 'Submit Your Application',
    description: 'Fill out our volunteer form with your skills, availability, and preferred region. Applications take 10 minutes.',
  },
  {
    number: '02',
    title: 'Interview & Onboarding',
    description: 'A 30-minute call with our Field Team Lead. We match you to a program where your skills fit best.',
  },
  {
    number: '03',
    title: 'Deploy & Make Impact',
    description: 'Join a field team for a minimum 3-month commitment. Full orientation, support, and community provided.',
  },
];

const roles = [
  { title: 'Health Educator', region: 'Kenya, Uganda, Tanzania', commitment: '3 to 6 months', skills: 'Healthcare, Teaching' },
  { title: 'Vocational Trainer', region: 'Nigeria, Ghana, Senegal', commitment: '3 months', skills: 'Trade skills, Facilitation' },
  { title: 'Business Mentor', region: 'South Africa, Ethiopia', commitment: '3 to 12 months', skills: 'Business, Finance' },
  { title: 'Field Coordinator', region: 'Pan-African', commitment: '6 to 12 months', skills: 'Project Management' },
];

export default function VolunteerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.vol-item');
            items.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = '1';
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          skills: formData.get('skills'),
          availability: formData.get('availability'),
          message: formData.get('message'),
          company: formData.get('company'),
        }),
      });

      if (!res.ok) throw new Error('Request failed');
      setFormSubmitted(true);
    } catch {
      setError('Something went wrong submitting your application. Please try again, or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-background" id="volunteer">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="eyebrow text-accent mb-3">For Individuals</p>
            <h2 className="text-section font-extrabold text-foreground">
              Volunteer &
              <br />
              <span className="font-serif italic text-palm font-normal">Join Field Teams.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm font-serif leading-relaxed">
            We deploy volunteers across 14 countries. Minimum commitment is 3 months. All skill levels welcome.
          </p>
        </div>

        {/* How It Works: 3 steps, asymmetric layout (NOT numbered timeline) */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="vol-item p-8 rounded-3xl border border-border card-hover"
              style={{
                opacity: 0,
                transform: 'translateY(24px)',
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)`,
                background: i === 1 ? 'var(--primary)' : 'var(--background)',
              }}
            >
              <p
                className="font-mono text-5xl font-bold mb-4"
                style={{ color: i === 1 ? 'var(--accent)' : 'var(--border)' }}
              >
                {step.number}
              </p>
              <h3
                className="text-xl font-bold mb-3"
                style={{ color: i === 1 ? 'var(--primary-foreground)' : 'var(--foreground)' }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed font-serif"
                style={{ color: i === 1 ? 'rgba(246,241,231,0.6)' : 'var(--muted-foreground)' }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Open Roles */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-foreground mb-8">Open Volunteer Roles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {roles.map((role, i) => (
              <div
                key={role.title}
                className="vol-item flex items-center justify-between p-6 rounded-2xl border border-border hover:border-accent transition-colors card-hover"
                style={{
                  opacity: 0,
                  transform: 'translateY(20px)',
                  transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)`,
                }}
              >
                <div>
                  <h4 className="font-bold text-foreground text-lg">{role.title}</h4>
                  <p className="eyebrow text-accent mt-1">{role.region}</p>
                  <p className="text-muted-foreground text-sm mt-2">{role.commitment} · {role.skills}</p>
                </div>
                <Icon name="ArrowRightIcon" size={20} className="text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Apply to Volunteer</h3>
          {formSubmitted ? (
            <div className="p-12 rounded-3xl text-center" style={{ background: 'var(--palm)' }}>
              <p className="text-5xl mb-4">🌍</p>
              <h4 className="text-2xl font-bold text-primary-foreground mb-3">Application Received!</h4>
              <p className="text-primary-foreground/70 font-serif">
                Thank you for stepping up. Our Field Team Lead will be in touch within 3 to 5 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-3xl border border-border bg-card">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="eyebrow text-muted-foreground block mb-2" htmlFor="vol-name">Full Name</label>
                  <input
                    id="vol-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full px-5 py-3.5 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="eyebrow text-muted-foreground block mb-2" htmlFor="vol-email">Email Address</label>
                  <input
                    id="vol-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="w-full px-5 py-3.5 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="eyebrow text-muted-foreground block mb-2" htmlFor="vol-skills">Primary Skills</label>
                <input
                  id="vol-skills"
                  name="skills"
                  type="text"
                  placeholder="e.g. Healthcare, Teaching, Business, Construction"
                  className="w-full px-5 py-3.5 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors text-sm"
                />
              </div>
              <div>
                <label className="eyebrow text-muted-foreground block mb-2" htmlFor="vol-availability">Availability</label>
                <select
                  id="vol-availability"
                  name="availability"
                  className="w-full px-5 py-3.5 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:border-accent transition-colors text-sm appearance-none"
                >
                  <option>3 months</option>
                  <option>6 months</option>
                  <option>12 months</option>
                  <option>Flexible</option>
                </select>
              </div>
              <div>
                <label className="eyebrow text-muted-foreground block mb-2" htmlFor="vol-message">Why do you want to volunteer?</label>
                <textarea
                  id="vol-message"
                  name="message"
                  rows={4}
                  placeholder="Tell us what motivates you to join OneTribe Africa..."
                  className="w-full px-5 py-3.5 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors text-sm resize-none font-serif"
                />
              </div>

              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              {error && (
                <p className="text-sm text-red-600 font-medium" role="alert">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full py-4 rounded-full font-bold text-base focus-ring disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting…' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}