import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PropertiesListingContent from './components/PropertiesListingContent';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import ScrollToTop from '@/components/shared/ScrollToTop';

export const metadata: Metadata = {
  title: 'Properties for Sale & Rent — Baylat Properties Nigeria',
  description: 'Browse all properties for sale and rent across Lagos, Abuja, and Port Harcourt. Filter by type, price, and features. Find your perfect home with Baylat Properties.',
};

export default function PropertiesListingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <PropertiesListingContent />
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </main>
  );
}