import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CompanyOverview from '@/components/home/CompanyOverview';

export const metadata = {
  title: 'About Us | Baylat Properties',
  description: 'Learn about Baylat Properties, our story, mission, and vision for Nigerian real estate.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center mt-8">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4">About Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover our journey and what drives us to provide the best real estate solutions in Nigeria.
          </p>
        </div>
        
        <CompanyOverview />
      </main>
      <Footer />
    </>
  );
}
