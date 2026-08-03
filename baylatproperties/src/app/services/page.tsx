import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Services | Baylat Properties',
  description: 'Our top-tier real estate services including property listing, management, and consultancy.',
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
     <main className="min-h-screen pt-24 pb-12 bg-background">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Page Header */}
    <div className="text-center mb-16 mt-8">
      <h1 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-4">Our Services</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
        Comprehensive real estate solutions tailored to your needs. From property buying to professional management.
      </p>
    </div>

    {/* Services Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Service 1 - Property Sales */}
      <div className="bg-card shadow-card rounded-2xl overflow-hidden hover:shadow-card-hover transition-all duration-300 flex flex-col">
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Property Sales" className="w-full h-48 object-cover" />
        <div className="p-8 flex-1">
          <h3 className="text-2xl font-bold text-foreground mb-4">Property Sales</h3>
          <p className="text-muted-foreground">
            Facilitating seamless transactions for premium residential and commercial acquisitions. We optimize marketing exposure and negotiate top-tier values to protect your real estate investments.
          </p>
        </div>
      </div>

      {/* Service 2 - Property Management */}
      <div className="bg-card shadow-card rounded-2xl overflow-hidden hover:shadow-card-hover transition-all duration-300 flex flex-col">
        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Property Management" className="w-full h-48 object-cover" />
        <div className="p-8 flex-1">
          <h3 className="text-2xl font-bold text-foreground mb-4">Property Management</h3>
          <p className="text-muted-foreground">
            End-to-end administration designed to maximize passive rental yields. We handle tenant lifecycle sourcing, rigorous screening, lease enforcement, and proactive maintenance oversight.
          </p>
        </div>
      </div>

      {/* Service 3 - Property Consultancy */}
      <div className="bg-card shadow-card rounded-2xl overflow-hidden hover:shadow-card-hover transition-all duration-300 flex flex-col">
        <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Property Consultancy" className="w-full h-48 object-cover" />
        <div className="p-8 flex-1">
          <h3 className="text-2xl font-bold text-foreground mb-4">Property Consultancy</h3>
          <p className="text-muted-foreground">
            Strategic advisory backed by data-driven market insights and financial valuation analysis. We help you confidently identify high-yield growth corridors and execute sound investment placements.
          </p>
        </div>
      </div>

      {/* Service 4 - Estate Development */}
      <div className="bg-card shadow-card rounded-2xl overflow-hidden hover:shadow-card-hover transition-all duration-300 flex flex-col">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Estate Development" className="w-full h-48 object-cover" />
        <div className="p-8 flex-1">
          <h3 className="text-2xl font-bold text-foreground mb-4">Estate Development</h3>
          <p className="text-muted-foreground">
            Transforming conceptual spaces into structural landmarks through end-to-end management frameworks. We direct feasibility planning, architectural execution, and quality control from the ground up.
          </p>
        </div>
      </div>

      {/* Service 5 - Facility Management */}
      <div className="bg-card shadow-card rounded-2xl overflow-hidden hover:shadow-card-hover transition-all duration-300 flex flex-col">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Facility Management" className="w-full h-48 object-cover" />
        <div className="p-8 flex-1">
          <h3 className="text-2xl font-bold text-foreground mb-4">Facility Management</h3>
          <p className="text-muted-foreground">
            Preserving structural integrity and building operations across large complexes. We run continuous safety checks, coordinate routine infrastructure upkeep, and support round-the-clock physical security.
          </p>
        </div>
      </div>

      {/* Service 6 - Land Survey */}
      <div className="bg-card shadow-card rounded-2xl overflow-hidden hover:shadow-card-hover transition-all duration-300 flex flex-col">
        <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Land Survey" className="w-full h-48 object-cover" />
        <div className="p-8 flex-1">
          <h3 className="text-2xl font-bold text-foreground mb-4">Land Survey</h3>
          <p className="text-muted-foreground">
            Precision geographic mapping and site boundary demarcations. Our licensed surveyors provide certified perimeter layouts, topographic profiling, and structural alignment verification for absolute legal clearance.
          </p>
        </div>
      </div>
    </div>
  </div>
</main>
    <Footer />
    </>
  );
}
