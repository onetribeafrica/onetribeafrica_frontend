'use client';

import React, { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ContactCard {
  icon: string;
  label: string;
  value: string;
  href: string;
}

const contactCards: ContactCard[] = [
  {
    icon: 'EnvelopeIcon',
    label: 'Email Us',
    value: 'hello@onetribeafrica.org',
    href: 'mailto:hello@onetribeafrica.org',
  },
  {
    icon: 'ChatBubbleLeftRightIcon',
    label: 'WhatsApp',
    value: '+254 700 123 456',
    href: 'https://wa.me/254700123456',
  },
  {
    icon: 'PhoneIcon',
    label: 'Call Us',
    value: '+254 20 123 4567',
    href: 'tel:+254201234567',
  },
];

const inquiryReasons = [
  'General Inquiry',
  'Volunteering',
  'Donation / Partnership',
  'Program Application',
  'Media / Press',
  'Other',
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.contact-item');
            items.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = '1';
                (item as HTMLElement).style.transform = 'translateY(0)';
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          reason: formData.get('reason'),
          message: formData.get('message'),
          company: formData.get('company'),
        }),
      });

      if (!res.ok) throw new Error('Request failed');
      setFormSubmitted(true);
    } catch {
      setError('Something went wrong sending your message. Please try again, or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-background" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="eyebrow text-accent mb-3">Get In Touch</p>
          <h2 className="text-section font-extrabold text-foreground">
            We Would Love to
            <span className="font-serif italic text-secondary"> Hear From You.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Contact info */}
          <div className="space-y-8">
            {/* Contact cards */}
            <div className="space-y-4">
              {contactCards.map((card, i) => (
                <a
                  key={card.label}
                  href={card.href}
                  className="contact-item flex items-center gap-5 p-6 rounded-2xl border border-border hover:border-accent card-hover group block focus-ring"
                  style={{
                    opacity: 0,
                    transform: 'translateY(20px)',
                    transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)`,
                  }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(222,74,30,0.1)' }}>
                    <Icon
                      name={card.icon as Parameters<typeof Icon>[0]['name']}
                      size={20}
                      className="text-accent"
                    />
                  </div>
                  <div>
                    <p className="eyebrow text-muted-foreground mb-0.5">{card.label}</p>
                    <p className="font-bold text-foreground group-hover:text-accent transition-colors">
                      {card.value}
                    </p>
                  </div>
                  <Icon name="ArrowRightIcon" size={16} className="text-muted-foreground ml-auto group-hover:text-accent transition-colors" />
                </a>
              ))}
            </div>

            {/* Address */}
            <div
              className="contact-item p-6 rounded-2xl border border-border"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(22,63,53,0.1)' }}>
                  <Icon name="MapPinIcon" size={20} className="text-palm" />
                </div>
                <div>
                  <p className="eyebrow text-muted-foreground mb-2">Our Office</p>
                  <p className="font-bold text-foreground">OneTribe Africa</p>
                  <p className="text-muted-foreground text-sm font-serif mt-1 leading-relaxed">
                    14 Lenana Road, Kilimani<br />
                    Nairobi, Kenya 00100<br />
                    East Africa
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div
              className="contact-item"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <p className="eyebrow text-muted-foreground mb-4">Follow Our Work</p>
              <div className="flex gap-3">
                {[
                  { label: 'Facebook', icon: 'GlobeAltIcon' },
                  { label: 'Instagram', icon: 'PhotoIcon' },
                  { label: 'LinkedIn', icon: 'BriefcaseIcon' },
                  { label: 'X', icon: 'ChatBubbleLeftRightIcon' },
                ].map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    aria-label={s.label}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors focus-ring"
                  >
                    <Icon name={s.icon as Parameters<typeof Icon>[0]['name']} size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div
            className="contact-item"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {formSubmitted ? (
              <div
                className="p-12 rounded-3xl text-center"
                style={{ background: 'var(--palm)' }}
              >
                <p className="text-5xl mb-4">🌍</p>
                <h3 className="text-2xl font-bold text-primary-foreground mb-3">Message Sent!</h3>
                <p className="text-primary-foreground/70 font-serif">
                  Thank you for reaching out. We will get back to you within 2 business days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-8 rounded-3xl border border-border bg-card"
              >
                <h3 className="text-xl font-bold text-foreground mb-2">Send Us a Message</h3>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="eyebrow text-muted-foreground block mb-2" htmlFor="contact-name">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      className="w-full px-5 py-3.5 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="eyebrow text-muted-foreground block mb-2" htmlFor="contact-email">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      className="w-full px-5 py-3.5 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="eyebrow text-muted-foreground block mb-2" htmlFor="contact-reason">
                    Reason for Inquiry
                  </label>
                  <select
                    id="contact-reason"
                    name="reason"
                    className="w-full px-5 py-3.5 rounded-xl border border-border bg-input text-foreground focus:outline-none focus:border-accent transition-colors text-sm appearance-none"
                  >
                    {inquiryReasons.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="eyebrow text-muted-foreground block mb-2" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us how we can help, or what you would like to discuss..."
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
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>

                <p className="text-center text-xs text-muted-foreground font-mono">
                  We respond within 2 business days · All inquiries are confidential
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}