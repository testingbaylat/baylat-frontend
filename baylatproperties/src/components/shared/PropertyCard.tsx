'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BedDouble, Bath, Maximize2, MapPin, Tag, Car, Sofa } from 'lucide-react';
import { Property } from '@/types';
import { formatNaira } from '@/lib/mockData';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="card-hover"
    >
      <Link href={`/property-detail?id=${property._id}`} className="block">
        <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border group">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={property.images[0]}
              alt={`${property.name} — ${property.address}, ${property.state}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide ${
                  property.type === 'sale' ?'bg-primary text-white' :'bg-blue-500 text-white'
                }`}
              >
                For {property.type === 'sale' ? 'Sale' : 'Rent'}
              </span>
              {property.offer && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-red-500 text-white flex items-center gap-1">
                  <Tag size={10} />
                  Offer
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Price */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-poppins font-bold text-primary text-naira">
                {property.offer && property.discountPrice
                  ? formatNaira(property.discountPrice)
                  : formatNaira(property.regularPrice)}
                {property.type === 'rent' && (
                  <span className="text-sm font-normal text-muted-foreground">/mo</span>
                )}
              </span>
              {property.offer && property.discountPrice && (
                <span className="text-sm text-muted-foreground line-through text-naira">
                  {formatNaira(property.regularPrice)}
                </span>
              )}
            </div>

            {/* Name */}
            <h3 className="font-poppins font-semibold text-card-foreground text-base leading-snug mb-2 line-clamp-2">
              {property.name}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
              <MapPin size={14} className="flex-shrink-0 text-primary" />
              <span className="truncate">{property.address}, {property.state}</span>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              {property.bedrooms > 0 && (
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <BedDouble size={15} className="text-primary" />
                  <span>{property.bedrooms} Bed{property.bedrooms !== 1 ? 's' : ''}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <Bath size={15} className="text-primary" />
                <span>{property.bathrooms} Bath{property.bathrooms !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm ml-auto">
                <Maximize2 size={14} className="text-primary" />
                <span>{property.sqft} sqft</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}