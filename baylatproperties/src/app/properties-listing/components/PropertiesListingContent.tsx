'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { FilterState } from '@/types';
import PropertyFilters from '@/components/properties/PropertyFilters';
import PropertyCard from '@/components/shared/PropertyCard';
import SkeletonCard from '@/components/shared/SkeletonCard';
import {getAllListings } from '@/utils/api/api'; // Imports your custom Axios setup

const PAGE_SIZE = 9;

const DEFAULT_FILTERS: FilterState = {
  search: '',
  type: 'all',
  sort: 'newest',
  furnished: false,
  parking: false,
  offer: false,
};

export default function PropertiesListingContent() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [listings, setListings] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveProperties = async () => {
      setLoading(true);
      try {
        let backendSort = 'createdAt';
        let backendOrder = 'desc';

        if (filters.sort === 'price-asc') {
          backendSort = 'regularPrice';
          backendOrder = 'asc';
        } else if (filters.sort === 'price-desc') {
          backendSort = 'regularPrice';
          backendOrder = 'desc';
        }

        // Only pass 'true' string if the filter checkbox is actually ticked. 
        // Leaving it undefined tells Mongoose not to filter by this field at all.
        const queryParams = {
          searchTerm: filters.search || undefined,
          type: filters.type,
          furnished: filters.furnished ? 'true' : undefined,
          parking: filters.parking ? 'true' : undefined,
          offer: filters.offer ? 'true' : undefined,
          sort: backendSort,
          order: backendOrder,
          limit: PAGE_SIZE,
          startIndex: (page - 1) * PAGE_SIZE,
        };

        const data = await getAllListings(queryParams);
        setListings(data.listings || []);
        setTotalCount(data.totalCount || 0);
      } catch (error) {
        console.error('Error fetching live data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveProperties();
  }, [filters, page]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <>
      {/* Page Header */}
      <div className="pt-24 md:pt-28 pb-8 bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
              <Home size={14} />
              <span>/</span>
              <span className="text-white">Properties</span>
            </div>
            <h1 className="font-poppins font-bold text-white text-3xl md:text-4xl mb-2">
              Properties for Sale &amp; Rent
            </h1>
            <p className="text-white/70 text-base">
              Explore verified listings across Lagos, Abuja, and Port Harcourt
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <PropertyFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        totalCount={totalCount}
        filteredCount={listings.length}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <SkeletonCard key={`skel-${i + 1}`} />
            ))}
          </div>
        ) : listings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
              <Home size={36} className="text-muted-foreground" />
            </div>
            <h3 className="font-poppins font-semibold text-foreground text-xl mb-3">
              No properties match your search
            </h3>
            <p className="text-muted-foreground text-base max-w-md mx-auto mb-6">
              Try adjusting your filters — remove the furnished or parking requirement, or broaden your search term to see more results.
            </p>
            <button
              onClick={() => handleFiltersChange(DEFAULT_FILTERS)}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {listings.map((property, i) => (
                <PropertyCard key={property._id || property.id} property={property} index={i} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={`page-${pageNum}`}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-xl border text-sm font-semibold transition-all ${
                        page === pageNum
                          ? 'bg-primary text-white border-primary shadow-green'
                          : 'border-border text-foreground hover:bg-primary/10 hover:border-primary/50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Page info */}
            <p className="text-center text-muted-foreground text-sm mt-4">
              Page {page} of {totalPages} — {totalCount} properties total
            </p>
          </>
        )}
      </div>
    </>
  );
}
