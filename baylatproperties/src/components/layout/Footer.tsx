import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';

const InstagramIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TiktokIcon = ({ size = 18, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 — Logo & Tagline */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <AppLogo size={36} />
              <span className="font-poppins font-bold text-xl text-white">
                Baylat<span className="text-primary">Properties</span>
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Smart Investments. Lasting Value.<br />
              Specializing heavily in securing premium lands across Lagos, while dealing in diverse properties nationwide since 2016.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/baylat.properties"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Baylat Properties on Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://facebook.com/baylat.properties"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Baylat Properties on Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="https://tiktok.com/@baylat.properties"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Baylat Properties on TikTok"
              >
                <TiktokIcon size={18} />
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-5 text-base">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home', key: 'fl-home' },
                { href: '/properties-listing', label: 'Properties', key: 'fl-props' },
                { href: '/about', label: 'About Us', key: 'fl-about' },
                { href: '/', label: 'Gallery', key: 'fl-gallery' },
                { href: '/contact', label: 'Contact', key: 'fl-contact' },
              ]?.map((link) => (
                <li key={link?.key}>
                  <Link
                    href={link?.href}
                    className="text-white/70 hover:text-primary text-sm transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-5 text-base">Our Services</h4>
            <ul className="space-y-3">
              {[
                { href: '/services/', label: 'Property Sales', key: 'fs-sales' },
                { href: '/services/', label: 'Property Rentals', key: 'fs-rent' },
                { href: '/services/', label: 'Estate Development', key: 'fs-dev' },
                { href: '/services/', label: 'Property Management', key: 'fs-mgmt' },
                { href: '/services/', label: 'Investment Advisory', key: 'fs-invest' },
                { href: '/services/', label: 'Valuation & Appraisal', key: 'fs-val' },
              ]?.map((link) => (
                <li key={link?.key}>
                  <Link
                    href={link?.href}
                    className="text-white/70 hover:text-primary text-sm transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact & Newsletter */}
          <div>
            <h4 className="font-poppins font-semibold text-white mb-5 text-base">Get In Touch</h4>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">Emperor Estate Plaza, opposite Shoprite, Sangotedo, Lekki-Epe Expressway, Lagos.</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <a href="tel:+2349169749620" className="text-white/70 hover:text-primary text-sm transition-colors">+234 916 974 9620</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <a href="mailto:info@baylatproperties.ng" className="text-white/70 hover:text-primary text-sm transition-colors">info@baylatproperties.ng</a>
              </li>
            </ul>
            <div>
              <p className="text-white/70 text-sm mb-3">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-primary"
                />
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            © 2026 Baylat Properties Limited. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-white/50 text-sm">
            <span>Registered in Nigeria</span>
            <Link href="/admin/login" className="hover:text-primary transition-colors hover:underline">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}