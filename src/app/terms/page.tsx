import React from 'react';
import type { Metadata } from 'next';
import LegalLayout, { H2, P, UL } from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms that apply when you use the OneTribe Africa website.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Use" updated="September 2026">
      <P>
        By using this website you agree to these terms. If you do not agree, please do not use the site.
      </P>

      <H2>About this website</H2>
      <P>
        The website shares information about the work of OneTribe Africa. We take care to keep it accurate and up
        to date, but we cannot guarantee that every detail is complete or current.
      </P>

      <H2>Acceptable use</H2>
      <P>When using the website you agree not to:</P>
      <UL>
        <li>interfere with or disrupt the site or the servers that run it;</li>
        <li>submit false, misleading, or harmful content through our forms;</li>
        <li>use automated tools in a way that places an unreasonable load on the site.</li>
      </UL>

      <H2>What you send us</H2>
      <P>
        Please make sure the information you submit through our forms is accurate. We handle it as described in our
        Privacy Policy.
      </P>

      <H2>Ownership of content</H2>
      <P>
        The OneTribe Africa name, logo, text, and images on this site belong to OneTribe Africa or its licensors.
        Please ask us before reusing them.
      </P>

      <H2>Links to other sites</H2>
      <P>
        The site may link to websites run by others. We are not responsible for their content or practices.
      </P>

      <H2>Volunteering and programs</H2>
      <P>
        Submitting a volunteer application does not guarantee a placement. Participation in any program may be
        subject to separate terms or agreements.
      </P>

      <H2>Disclaimer</H2>
      <P>
        The website is provided &quot;as is&quot;. To the fullest extent the law allows, OneTribe Africa is not liable
        for losses arising from your use of the website.
      </P>

      <H2>Changes to these terms</H2>
      <P>We may update these terms from time to time. The date at the top shows when they last changed.</P>

      <H2>Contact</H2>
      <P>Questions about these terms can be sent to hello@onetribeafrica.org.</P>
    </LegalLayout>
  );
}
