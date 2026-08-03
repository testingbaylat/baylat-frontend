'use client';

import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { FilterState } from '@/types';

interface PropertyFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  totalCount: number;
  filteredCount: number;
}

export default function PropertyFilters({
  filters,
  onFiltersChange,
  totalCount,
  filteredCount,
}: PropertyFiltersProps) {
  const update = (partial: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...partial });
  };

  const hasActiveFilters =
    filters.search !== '' ||
    filters.type !== 'all' ||
    filters.sort !== 'newest' ||
    filters.furnished ||
    filters.parking ||
    filters.offer;

  const clearAll = () => {
    onFiltersChange({
      search: '',
      type: 'all',
      sort: 'newest',
      furnished: false,
      parking: false,
      offer: false,
    });
  };

  return (
    <div className="bg-card border-b border-border shadow-sm sticky top-16 md:top-20 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Main Row */}
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => update({ search: e.target.value })}
              placeholder="Search by name, address, state..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Type Tabs */}
          <div className="flex items-center gap-1 bg-secondary rounded-xl p-1">
            {(['all', 'sale', 'rent'] as const).map((t) => (
              <button
                key={`type-${t}`}
                onClick={() => update({ type: t })}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${
                  filters.type === t
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t === 'all' ? 'All' : `For ${t.charAt(0).toUpperCase() + t.slice(1)}`}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={filters.sort}
            onChange={(e) => update({ sort: e.target.value as FilterState['sort'] })}
            className="px-3 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Toggle Row */}
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <SlidersHorizontal size={14} />
            Filters:
          </span>

          {[
            { key: 'furnished' as const, label: 'Furnished' },
            { key: 'parking' as const, label: 'Parking' },
            { key: 'offer' as const, label: 'Special Offer' },
          ].map((toggle) => (
            <button
              key={`toggle-${toggle.key}`}
              onClick={() => update({ [toggle.key]: !filters[toggle.key] })}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                filters[toggle.key]
                  ? 'bg-primary/10 text-primary border-primary' :'bg-background text-muted-foreground border-border hover:border-primary/50'
              }`}
            >
              {toggle.label}
            </button>
          ))}

          {/* Results count */}
          <span className="ml-auto text-muted-foreground text-sm">
            Showing <span className="font-semibold text-foreground">{filteredCount}</span> of{' '}
            <span className="font-semibold text-foreground">{totalCount}</span> properties
          </span>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-medium"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}