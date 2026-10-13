import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExploreGridSection from "@/app/components/ExploreGridSection";
import ProgramsTeaserSection from "@/app/components/ProgramsTeaserSection";
import ImpactStoriesSection from "@/app/components/ImpactStoriesSection";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "Programs that move communities through vocational training, community development, health initiatives, and small business support.",
  alternates: {
    canonical: "/what-we-do",
  },
  openGraph: {
    title: "What We Do - OneTribe Africa",
    description:
      "Programs that move communities through vocational training, community development, health initiatives, and small business support.",
    url: "/what-we-do",
  },
};

export default function WhatWeDoPage() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="min-h-screen bg-background outline-none"
    >
      <Header />
      <ExploreGridSection />
      <ProgramsTeaserSection />
      <ImpactStoriesSection />
      <Footer />
    </main>
  );
}
