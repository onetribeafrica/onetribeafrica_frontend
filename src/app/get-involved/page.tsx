import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GetInvolvedHero from './components/GetInvolvedHero';
import VolunteerSection from './components/VolunteerSection';
import DonateSection from './components/DonateSection';
import ContactSection from './components/ContactSection';

export default function GetInvolvedPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <GetInvolvedHero />
      <VolunteerSection />
      <DonateSection />
      <ContactSection />
      <Footer />
    </main>
  );
}