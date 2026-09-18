'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our Mission', href: '/about#mission', desc: 'What drives us forward' },
      { label: 'Our Vision', href: '/about#vision', desc: 'Where we are headed' },
      { label: 'Our Values', href: '/about#values', desc: 'The principles we live by' },
      { label: 'Our Team', href: '/about#team', desc: 'Meet the people behind the work' },
    ],
  },
  {
    label: 'What We Do',
    href: '/#programs',
    children: [
      { label: 'Programs', href: '/#programs', desc: 'Vocational, health, and business programs' },
      { label: 'Current Projects', href: '/#projects', desc: 'Active initiatives on the ground' },
      { label: 'Our Impact', href: '/#impact', desc: 'Measurable change in communities' },
    ],
  },
  {
    label: 'Get Involved',
    href: '/get-involved',
    children: [
      { label: 'Volunteer', href: '/get-involved#volunteer', desc: 'Join our field teams' },
      { label: 'Donate', href: '/get-involved#donate', desc: 'Fund programs directly' },
      { label: 'Partner With Us', href: '/get-involved#contact', desc: 'Institutional partnerships' },
      { label: 'Contact', href: '/get-involved#contact', desc: 'Get in touch with us' },
    ],
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMenuEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-primary/95 backdrop-blur-md shadow-lg shadow-primary/20 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 focus-ring rounded-lg" aria-label="OneTribe Africa Home">
            <AppLogo size={84} />
            <span className="font-sans font-800 text-primary-foreground text-xl tracking-tight hidden sm:block">
              OneTribe<span className="text-accent">Africa</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" ref={menuRef}>
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMenuEnter(item.label)}
                onMouseLeave={handleMenuLeave}
              >
                <Link
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-primary-foreground/80 hover:text-primary-foreground text-sm font-semibold transition-colors focus-ring"
                >
                  {item.label}
                </Link>

                {/* Mega Menu Dropdown */}
                {item.children && activeMenu === item.label && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 border border-primary-foreground/10"
                    style={{ background: 'rgba(10,71,80,0.97)', backdropFilter: 'blur(16px)' }}
                    onMouseEnter={() => handleMenuEnter(item.label)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <div className="p-3 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-primary-foreground/10 transition-colors group focus-ring"
                          onClick={() => setActiveMenu(null)}
                        >
                          <span className="text-primary-foreground text-sm font-semibold group-hover:text-accent transition-colors">
                            {child.label}
                          </span>
                          {child.desc && (
                            <span className="text-primary-foreground/50 text-xs font-mono">
                              {child.desc}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/get-involved#donate"
              className="hidden sm:flex btn-primary px-6 py-2.5 rounded-full text-sm font-bold items-center gap-2 focus-ring"
            >
              Donate
            </Link>
            <button
              className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-primary-foreground/10 transition-colors focus-ring"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span
                className={`block h-0.5 w-6 bg-primary-foreground transition-all duration-300 ${
                  mobileOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-primary-foreground transition-all duration-300 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-primary-foreground transition-all duration-300 ${
                  mobileOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(10,71,80,0.98)', backdropFilter: 'blur(16px)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileOpen(false);
          }}
        >
          <div className="flex flex-col h-full pt-24 pb-8 px-6 overflow-y-auto">
            <nav className="flex-1 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <button
                    className="w-full flex items-center justify-between py-4 border-b border-primary-foreground/10 text-primary-foreground font-semibold text-lg focus-ring rounded-lg px-2"
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                    }
                    aria-expanded={mobileExpanded === item.label}
                  >
                    {item.label}
                    <span
                      className={`transition-transform duration-300 text-accent ${
                        mobileExpanded === item.label ? 'rotate-180' : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  {mobileExpanded === item.label && item.children && (
                    <div className="pl-4 py-2 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block py-3 px-3 text-primary-foreground/70 hover:text-accent transition-colors text-base font-medium rounded-lg focus-ring"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="pt-8 space-y-4">
              <Link
                href="/get-involved#donate"
                className="btn-primary w-full py-4 rounded-full text-center text-base font-bold block focus-ring"
                onClick={() => setMobileOpen(false)}
              >
                Donate Now
              </Link>
              <Link
                href="/get-involved#volunteer"
                className="btn-outline w-full py-4 rounded-full text-center text-base font-bold block focus-ring"
                onClick={() => setMobileOpen(false)}
              >
                Volunteer
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full origin-left"
        style={{
          background: 'linear-gradient(90deg, #DE4A1E, #E8A33D)',
          transform: `scaleX(${progress})`,
          transition: 'transform 0.1s linear',
        }}
      />
    </div>
  );
}