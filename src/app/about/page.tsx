import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from './components/AboutHero';
import MissionVisionSection from './components/MissionVisionSection';
import ValuesSection from './components/ValuesSection';
import TeamSection from './components/TeamSection';
import AboutCTA from './components/AboutCTA';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'OneTribe Africa was founded in 2018 on the belief that communities lead. Explore our mission, our vision to end social injustice across Africa, and our values.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About OneTribe Africa',
    description: 'Built on the belief that communities lead. Meet the team and the values behind our work across Africa.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <main id="main" tabIndex={-1} className="min-h-screen bg-background outline-none">
      <Header />
      <AboutHero />
      <MissionVisionSection />
      <ValuesSection />
      <TeamSection />
      <AboutCTA />
      <Footer />
    </main>
  );
}