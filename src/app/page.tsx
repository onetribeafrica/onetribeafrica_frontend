import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import StatTickerSection from './components/StatTickerSection';
import ExploreGridSection from './components/ExploreGridSection';
import ProgramsTeaserSection from './components/ProgramsTeaserSection';
import ImpactStoriesSection from './components/ImpactStoriesSection';
import GetInvolvedCTA from './components/GetInvolvedCTA';

export default function HomePage() {
  return (
    <main id="main" tabIndex={-1} className="min-h-screen bg-background outline-none">
      <Header />
      <HeroSection />
      <StatTickerSection />
      <ExploreGridSection />
      <ProgramsTeaserSection />
      <ImpactStoriesSection />
      <GetInvolvedCTA />
      <Footer />
    </main>
  );
}