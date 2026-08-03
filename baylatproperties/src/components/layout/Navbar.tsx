'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Phone } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useTheme } from '@/context/ThemeContext';
import AppLogo from '@/components/ui/AppLogo';

const NAV_LINKS = [
  { href: '/', label: 'Home', key: 'nav-home' },
  { href: '/properties-listing', label: 'Properties', key: 'nav-properties' },
  { href: '/about', label: 'About', key: 'nav-about' },
  { href: '/services', label: 'Services', key: 'nav-services' },
  { href: '/contact', label: 'Contact', key: 'nav-contact' },
];

const overlayVariants = {
  hidden: { opacity: 0, y: '-100%' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: '-100%', transition: { duration: 0.3, ease: 'easeIn' } },
};

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07 + 0.2, duration: 0.4, ease: 'easeOut' },
  }),
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const { isDark, toggleTheme } = useTheme();

  const isScrolled = scrollY > 60;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || menuOpen
            ? 'bg-white shadow-nav border-b border-border dark:bg-[#0F172A]/60 dark:backdrop-blur-xl dark:border-white/10 dark:shadow-none'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <AppLogo size={36} />
              <span
                className={`font-poppins font-700 text-lg tracking-tight hidden sm:block transition-colors duration-300 ${
                  isScrolled || menuOpen ? 'text-foreground' : 'text-white'
                }`}
              >
                Baylat<span className="text-primary">Properties</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-primary hover:bg-primary/10 ${
                    isScrolled ? 'text-foreground' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-200 hover:bg-primary/10 ${
                  isScrolled || menuOpen ? 'text-foreground' : 'text-white'
                }`}
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Book Inspection CTA */}
              <Link
                href="/contact"
                className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-all duration-200 shadow-green"
              >
                <Phone size={16} />
                Book Inspection
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isScrolled || menuOpen ? 'text-foreground' : 'text-white'
                }`}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-card flex flex-col items-center justify-center lg:hidden"
          >
            <nav className="flex flex-col items-center gap-6 w-full px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.key}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-2xl font-poppins font-600 text-foreground hover:text-primary transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                custom={NAV_LINKS.length}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                className="mt-4"
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold text-lg"
                >
                  <Phone size={20} />
                  Book Inspection
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}