import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from './components/AboutHero';
import MissionVisionSection from './components/MissionVisionSection';
import ValuesSection from './components/ValuesSection';
import TeamSection from './components/TeamSection';
import AboutCTA from './components/AboutCTA';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
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