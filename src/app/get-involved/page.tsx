import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GetInvolvedHero from './components/GetInvolvedHero';
import VolunteerSection from './components/VolunteerSection';
import DonateSection from './components/DonateSection';
import ContactSection from './components/ContactSection';

export const metadata: Metadata = {
  title: 'Get Involved',
  description:
    'Volunteer with OneTribe Africa field teams, donate to fund programs directly, or partner with us institutionally. There is a place for you in the movement.',
  alternates: {
    canonical: '/get-involved',
  },
  openGraph: {
    title: 'Get Involved with OneTribe Africa',
    description: 'Volunteer, donate, or partner with OneTribe Africa. There is a place for you in the movement.',
    url: '/get-involved',
  },
};

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