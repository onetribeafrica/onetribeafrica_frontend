'use client';

import React, { useState } from 'react';

export default function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.get('email'),
          company: formData.get('company'),
        }),
      });

      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
      form.reset();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-primary px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <p className="font-bold text-primary-foreground text-xl">Stay Updated</p>
          <p className="text-primary-foreground/65 text-sm mt-1">
            Occasional updates on our programs and impact. No spam.
          </p>
        </div>

        {submitted ? (
          <p className="text-accent font-semibold text-sm">You&apos;re subscribed. Thank you.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              className="px-5 py-3 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors text-sm w-full sm:w-72"
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary px-6 py-3 rounded-full text-sm font-bold focus-ring disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {submitting ? 'Signing up…' : 'Sign Up'}
            </button>
          </form>
        )}
      </div>
      {error && (
        <p className="max-w-7xl mx-auto text-sm text-red-300 font-medium mt-3" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
