import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import WhyChooseBaylat from '@/components/home/WhyChooseBaylat';
import CompanyOverview from '@/components/home/CompanyOverview';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import LatestArticles from '@/components/home/LatestArticles';
import CTABanner from '@/components/shared/CTABanner';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import ScrollToTop from '@/components/shared/ScrollToTop';

export const metadata: Metadata = {
  title: 'Baylat Properties — Find Your Dream Property in Nigeria',
  description: 'Browse premium properties for sale and rent across Lagos, Abuja, and Port Harcourt. 500+ properties sold, 100+ happy clients. Smart Investments. Lasting Value.',
  openGraph: {
    title: 'Baylat Properties — Find Your Dream Property in Nigeria',
    description: 'Premium Nigerian real estate — properties for sale and rent. 500+ sold. Trusted since 2016.',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'],
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <FeaturedProperties />
      <WhyChooseBaylat />
      <CompanyOverview />
      <TestimonialsCarousel />
      {/* <LatestArticles /> */}
      <CTABanner />
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </main>
  );
}