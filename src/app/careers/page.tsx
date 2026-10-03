import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Open roles and how to work with OneTribe Africa.',
  alternates: { canonical: '/careers' },
};

export default function CareersPage() {
  return (
    <main id="main" tabIndex={-1} className="min-h-screen bg-background outline-none">
      <Header />
      <section className="bg-primary pt-44 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow text-accent mb-4">Join the Team</p>
          <h1 className="text-section font-extrabold text-primary-foreground mb-3">Careers.</h1>
          <p className="text-primary-foreground/70 text-lg font-serif max-w-xl">
            We are a small, field-focused team. When we have an open role, it will be posted here first.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="p-10 rounded-3xl border border-border text-center">
            <p className="font-bold text-foreground text-xl mb-3">No open roles right now</p>
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
              We don&apos;t have any paid positions open at the moment. If that changes, we&apos;ll list the role here
              with details on how to apply. In the meantime, you can{' '}
              <a href="/get-involved#volunteer" className="text-accent font-semibold hover:underline">
                apply to volunteer
              </a>{' '}
              with our field teams.
            </p>
          </div>

          <div className="mt-10 text-center">
            <p className="text-muted-foreground text-sm">
              Questions about future openings? Email{' '}
              <a href="mailto:hello@onetribeafrica.org" className="text-accent font-semibold hover:underline">
                hello@onetribeafrica.org
              </a>
              .
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
