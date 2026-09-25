import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold text-foreground mt-12 mb-3">{children}</h2>;
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>;
}

export function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-6 space-y-2 mb-4 text-muted-foreground leading-relaxed marker:text-accent">
      {children}
    </ul>
  );
}

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main id="main" tabIndex={-1} className="min-h-screen bg-background outline-none">
      <Header />
      <section className="bg-primary pt-44 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow text-accent mb-4">Legal</p>
          <h1 className="text-section font-extrabold text-primary-foreground mb-3">{title}</h1>
          <p className="text-primary-foreground/70 text-sm">Last updated: {updated}</p>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">{children}</div>
      </section>
      <Footer />
    </main>
  );
}
