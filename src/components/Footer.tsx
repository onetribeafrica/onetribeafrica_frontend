import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Left: Logo + tagline */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link href="/" className="flex items-center gap-3 focus-ring rounded-lg">
              <AppLogo size={36} />
              <span className="font-sans font-bold text-primary text-xl tracking-tight">
                OneTribe<span className="text-secondary">Africa</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed font-serif">
              Uniting communities. Elevating lives. Building a stronger Africa — together.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[
                { icon: 'GlobeAltIcon', href: '#', label: 'Website' },
                { icon: 'ChatBubbleLeftRightIcon', href: '#', label: 'Twitter' },
                { icon: 'PhotoIcon', href: '#', label: 'Instagram' },
                { icon: 'PlayIcon', href: '#', label: 'YouTube' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors focus-ring"
                >
                  <Icon name={s.icon as Parameters<typeof Icon>[0]['name']} size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex flex-wrap gap-8 lg:gap-16">
            <div className="space-y-4">
              <p className="eyebrow text-muted-foreground">Organization</p>
              <div className="space-y-3">
                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Our Mission', href: '/about#mission' },
                  { label: 'Our Team', href: '/about#team' },
                  { label: 'Our Values', href: '/about#values' },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-ring rounded"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="eyebrow text-muted-foreground">Programs</p>
              <div className="space-y-3">
                {[
                  { label: 'What We Do', href: '/#programs' },
                  { label: 'Apply for Programs', href: '/#programs' },
                  { label: 'Current Projects', href: '/#projects' },
                  { label: 'Our Impact', href: '/#impact' },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-ring rounded"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="eyebrow text-muted-foreground">Get Involved</p>
              <div className="space-y-3">
                {[
                  { label: 'Volunteer', href: '/get-involved#volunteer' },
                  { label: 'Donate', href: '/get-involved#donate' },
                  { label: 'Partner With Us', href: '/get-involved#partner' },
                  { label: 'Contact Us', href: '/get-involved#contact' },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-ring rounded"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 OneTribe Africa. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}