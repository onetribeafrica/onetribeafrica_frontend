import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import ScrollRestorer from '@/components/ui/ScrollRestorer';
import '../styles/tailwind.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A4750',
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'OneTribe Africa: Educating Communities, Ending Social Injustice',
    template: '%s | OneTribe Africa',
  },
  description:
    'OneTribe Africa educates communities to overcome social injustice across Africa through skills training, health outreach, and community-led grassroots programs.',
  keywords: [
    'OneTribe Africa',
    'African nonprofit',
    'community development Africa',
    'vocational training Africa',
    'social injustice',
    'grassroots programs Africa',
    'volunteer in Africa',
    'donate Africa charity',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '512x512', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'OneTribe Africa',
    locale: 'en_US',
    title: 'OneTribe Africa: Together We Rise',
    description: 'Educating communities to overcome social injustice across the African continent.',
    images: [{ url: '/assets/images/app_logo_social.png', width: 1200, height: 630, alt: 'OneTribe Africa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneTribe Africa: Together We Rise',
    description: 'Educating communities to overcome social injustice across the African continent.',
    images: ['/assets/images/app_logo_social.png'],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'OneTribe Africa',
  alternateName: 'One Tribe',
  url: siteUrl,
  logo: `${siteUrl}/assets/images/app_logo.png`,
  slogan: 'Together We Rise',
  description:
    'OneTribe Africa educates communities to overcome social injustice across Africa through skills training, health outreach, and community-led grassroots programs.',
  areaServed: 'Africa',
  email: 'hello@onetribeafrica.org',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '14 Lenana Road, Kilimani',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className={montserrat.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <div className="noise-overlay" aria-hidden="true" />
        <ScrollRestorer />
        {children}
      </body>
    </html>
  );
}