'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PropertyCard from '@/components/shared/PropertyCard';
import SkeletonCard from '@/components/shared/SkeletonCard';
import API from '@/api/api'; 

type FilterType = 'all' | 'sale' | 'rent';

export default function FeaturedProperties() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties from backend whenever activeFilter changes
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      setLoading(true);
      try {
        // Hits the search engine endpoint with dynamic parameters
        const response = await API.get('/listing/all/featured', {
          params: {
            type: activeFilter, // Matches 'all', 'sale', or 'rent' arrays on backend
            limit: 6,           // Keep the original slice limit of 6
            sort: 'createdAt',
            order: 'desc',
            featured: true,
          },
        });

       
        
        setListings(response.data.listings || []);
      } catch (error) {
        console.error('Error fetching featured listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, [activeFilter]);

  const FILTERS: { value: FilterType; label: string; key: string }[] = [
    { value: 'all', label: 'All Properties', key: 'fp-all' },
    { value: 'sale', label: 'For Sale', key: 'fp-sale' },
    { value: 'rent', label: 'For Rent', key: 'fp-rent' },
  ];

  return (
    <section className="section-padding bg-secondary/50 dark:bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Featured Listings
            </span>
            <h2 className="font-poppins font-bold text-foreground text-3xl md:text-4xl lg:text-5xl">
              Handpicked Properties
            </h2>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 bg-card rounded-xl p-1 border border-border shadow-sm flex-shrink-0"
          >
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeFilter === f.value
                    ? 'bg-primary text-white shadow-green'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid / Skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {loading ? (
            // Show 3 skeleton cards while the live cluster loads
            Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={`feat-skel-${i + 1}`} />
            ))
          ) : listings.length > 0 ? (
            listings.map((property, i) => (
              <PropertyCard key={property._id || property.id} property={property} index={i} />
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <p className="text-muted-foreground text-lg">
                No featured {activeFilter !== 'all' ? activeFilter : ''} properties at the moment.
              </p>
            </div>
          )}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/properties-listing"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-200"
          >
            View All Properties
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
