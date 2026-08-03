'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABanner({
  title = 'Ready to Find Your Perfect Property?',
  subtitle = 'Our expert team is ready to guide you through every step — from search to handover. Let\'s find your dream home together.',
  primaryLabel = 'Browse Properties',
  primaryHref = '/properties-listing',
  secondaryLabel = 'Book Inspection',
  secondaryHref = '/contact',
}: CTABannerProps) {
  return (
    <section className="section-padding bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-poppins font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-6 text-balance">
            {title}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={primaryHref}
              className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-primary/90 transition-all duration-200 shadow-green"
            >
              {primaryLabel}
              <ArrowRight size={18} />
            </Link>
            <Link
              href={secondaryHref}
              className="flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/10 transition-all duration-200"
            >
              <Phone size={18} />
              {secondaryLabel}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}