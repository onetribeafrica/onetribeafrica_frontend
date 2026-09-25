import React from 'react';
import type { Metadata } from 'next';
import LegalLayout, { H2, P, UL } from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How OneTribe Africa collects, uses, and protects the personal information you share through this website.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="September 2026">
      <P>
        This policy explains what personal information OneTribe Africa (&quot;we&quot;, &quot;us&quot;) collects
        through this website, why we collect it, and the choices you have. If you have any question, write to us
        at hello@onetribeafrica.org.
      </P>

      <H2>Information we collect</H2>
      <UL>
        <li>
          <strong className="text-foreground">Contact form:</strong> your name, email address, reason for
          inquiry, and the message you write.
        </li>
        <li>
          <strong className="text-foreground">Volunteer application:</strong> your name, email address, skills,
          availability, and the motivation you describe.
        </li>
        <li>
          <strong className="text-foreground">Technical data:</strong> like most websites, our hosting provider
          processes standard request data, such as IP address, browser type, and the pages requested, in order to
          deliver and secure the site.
        </li>
      </UL>

      <H2>How we use it</H2>
      <UL>
        <li>To reply to your message or inquiry.</li>
        <li>To review volunteer applications and contact applicants.</li>
        <li>To keep the website secure and working properly.</li>
      </UL>

      <H2>How your information is handled</H2>
      <P>
        Form submissions are delivered to our team by email through an email delivery provider. We do not sell your
        personal information. We share it only with service providers that help us run the website and the
        organization, and where the law requires us to.
      </P>

      <H2>Third-party content</H2>
      <P>
        Some images on this site are served by third-party content delivery services. When your browser loads
        them, that service can receive your IP address and basic device information.
      </P>

      <H2>Cookies</H2>
      <P>
        We do not use advertising or analytics cookies. Our hosting provider may set strictly necessary security
        cookies to protect the site from abuse.
      </P>

      <H2>Donations</H2>
      <P>
        Online donations are not processed through this website at this time. If that changes, we will update this
        policy to name the payment provider and describe the data involved before any payment is taken.
      </P>

      <H2>How long we keep information</H2>
      <P>
        We keep messages and applications only for as long as we need them for the purposes above.
      </P>

      <H2>Your choices</H2>
      <P>
        You can ask us to show you the personal information we hold about you, correct it, or delete it by emailing
        hello@onetribeafrica.org. Depending on where you live, you may have additional rights under your local
        data protection law.
      </P>

      <H2>Children</H2>
      <P>This website is not directed at children, and we do not knowingly collect information from them.</P>

      <H2>Changes to this policy</H2>
      <P>
        If we change this policy we will post the new version on this page and update the date at the top.
      </P>
    </LegalLayout>
  );
}
