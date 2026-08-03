import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PropertyDetailContent from './components/PropertyDetailContent';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import ScrollToTop from '@/components/shared/ScrollToTop';

export const metadata: Metadata = {
  title: 'Property Detail — Baylat Properties Nigeria',
  description: 'View full property details, image gallery, pricing, and contact the agent. Premium Nigerian properties for sale and rent with Baylat Properties.',
};

export default function PropertyDetailPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div></div>}>
        <PropertyDetailContent />
      </Suspense>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </main>
  );
}