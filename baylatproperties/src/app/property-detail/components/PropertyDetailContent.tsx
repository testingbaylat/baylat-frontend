'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import {
  BedDouble, Bath, Maximize2, MapPin, Tag, Car, Sofa,
  Share2, Heart, Phone, Mail, CheckCircle2, Home,
  ChevronLeft, ChevronRight, X, Calendar, Shield,
  MessageSquare, ArrowRight,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { formatNaira, formatDate } from '@/lib/mockData';
import PropertyCard from '@/components/shared/PropertyCard';
import API from '@/api/api';
import { Property } from '@/types';
import { useEffect } from 'react';

const inquirySchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid Nigerian phone number'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export default function PropertyDetailContent() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('id'); // Get dynamic mongo ID from query params

  // 1. Live Data States
  const [property, setProperty] = useState<Property | null>(null);
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 2. Setup React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue, // Needed to update default message once live data arrives
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  // 3. Fetch Live Listing and Related Items from Cluster
  useEffect(() => {
    if (!propertyId) return;

    const fetchPropertyAndRelated = async () => {
      setLoading(true);
      try {
        // Fetch the main listing data
        const response = await API.get(`/listing/${propertyId}`);
        const currentProperty = response.data;
        setProperty(currentProperty);

        // Populate form inquiry text area with live data parameters
        setValue(
          'message',
          `Hello, I am interested in the property "${currentProperty.name}" listed at ${formatNaira(
            currentProperty.offer && currentProperty.discountPrice
              ? currentProperty.discountPrice
              : currentProperty.regularPrice
          )}. Please get in touch with me at your earliest convenience.`
        );

        // Fetch related properties using the state parameter from search engine
        const relatedRes = await API.get('/listing/search', {
          params: { type: currentProperty.type, limit: 4 },
        });

        // Drop the current property from the related recommendations deck
        const filteredRelated = (relatedRes.data.listings || []).filter(
          (p: any) => (p._id || p.id) !== propertyId
        );
        setRelatedProperties(filteredRelated);
      } catch (error) {
        console.error('Error fetching property details:', error);
        toast.error('Failed to load property data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyAndRelated();
  }, [propertyId, setValue]);

  // 4. Form Submission Hook connected to Backend
  const onSubmit = async (data: InquiryFormData) => {
    setSubmitting(true);
    try {
      // Direct integration to your Nodemailer endpoint
      await API.post('/mail/send-inquiry', {
        listingId: propertyId,
        ...data,
      });
      toast.success('Inquiry sent! Our team will contact you within 24 hours.');
      reset();
    } catch (error: any) {
      console.error('Inquiry delivery error:', error);
      toast.error(error.response?.data?.message || 'Could not deliver your inquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.name || 'Property Details',
        text: `Check out this property: ${property?.name || ''}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Property link copied to clipboard!');
    }
  };

  // 5. App Loading & Missing Conditions Guardrails
  if (loading) {
    return (
      <div className="pt-32 text-center text-white min-h-screen bg-primary-dark">
        <p className="text-lg">Fetching property details from cluster...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-32 text-center text-white min-h-screen bg-primary-dark">
        <p className="text-lg">Property record could not be found.</p>
        <Link href="/properties-listing" className="text-primary underline mt-4 inline-block">
          Return to listings
        </Link>
      </div>
    );
  }

  // 6. Dynamic Financial Variables calculated from live schema fields
  const displayPrice = property.offer && property.discountPrice
    ? property.discountPrice
    : property.regularPrice;

  const savings = property.offer && property.discountPrice
    ? property.regularPrice - property.discountPrice
    : 0;



  return (
    <>
      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((i) => (i - 1 + property.images.length) % property.images.length);
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>
          <img
            src={property.images[activeImageIndex]}
            alt={`${property.name} — interior view ${activeImageIndex + 1} of ${property.images.length}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex((i) => (i + 1) % property.images.length);
            }}
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {(property.images || []).map((_, idx) => (
              <button
                key={`lb-dot-${idx}`}
                onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                className={`w-2 h-2 rounded-full transition-all ${idx === activeImageIndex ? 'bg-primary w-6' : 'bg-white/40'}`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Page Header */}
      <div className="pt-24 md:pt-28 pb-6 bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
            <Home size={14} />
            <span>/</span>
            <Link href="/properties-listing" className="hover:text-white transition-colors">Properties</Link>
            <span>/</span>
            <span className="text-white truncate max-w-xs">{property.name}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-poppins font-bold text-white text-2xl md:text-3xl leading-tight mb-2">
                {property.name}
              </h1>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <MapPin size={14} className="text-primary" />
                <span>{property.address}, {property.state}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSaved((v) => !v)}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                  isSaved ? 'bg-red-500 border-red-500 text-white' : 'border-white/30 text-white hover:bg-white/10'
                }`}
                aria-label={isSaved ? 'Remove from saved' : 'Save property'}
              >
                <Heart size={18} className={isSaved ? 'fill-white' : ''} />
              </button>
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-xl border border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-all"
                aria-label="Share property"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column — Gallery + Details */}
          <div className="xl:col-span-2 space-y-8">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main Image */}
              <div
                className="relative rounded-2xl overflow-hidden cursor-pointer mb-3 h-72 md:h-96"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={property.images[activeImageIndex]}
                  alt={`${property.name} — main photo showing property exterior and features`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
                {/* Type Badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span
                    className={`px-3 py-1.5 rounded-xl text-sm font-semibold uppercase tracking-wide ${
                      property.type === 'sale' ? 'bg-primary text-white' : 'bg-blue-500 text-white'
                    }`}
                  >
                    For {property.type === 'sale' ? 'Sale' : 'Rent'}
                  </span>
                  {property.offer && (
                    <span className="px-3 py-1.5 rounded-xl text-sm font-semibold bg-red-500 text-white flex items-center gap-1">
                      <Tag size={12} />
                      Special Offer
                    </span>
                  )}
                </div>
                {/* Image count */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 text-white text-sm rounded-xl backdrop-blur-sm">
                  {activeImageIndex + 1} / {property.images.length}
                </div>
                {/* Nav arrows */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((i) => (i - 1 + property.images.length) % property.images.length);
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-xl flex items-center justify-center transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((i) => (i + 1) % property.images.length);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-xl flex items-center justify-center transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {property.images.map((img, idx) => (
                    <button
                      key={`thumb-${property._id}-${idx}`}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img
                        src={img}
                        alt={`${property.name} thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Property Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-2xl border border-border shadow-card p-6"
            >
              <h2 className="font-poppins font-bold text-card-foreground text-xl mb-6">
                Property Details
              </h2>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {property.bedrooms > 0 && (
                  <div className="text-center p-4 bg-secondary/50 rounded-xl">
                    <BedDouble size={24} className="text-primary mx-auto mb-2" />
                    <div className="font-poppins font-bold text-foreground text-xl">{property.bedrooms}</div>
                    <div className="text-muted-foreground text-xs mt-1">Bedrooms</div>
                  </div>
                )}
                <div className="text-center p-4 bg-secondary/50 rounded-xl">
                  <Bath size={24} className="text-primary mx-auto mb-2" />
                  <div className="font-poppins font-bold text-foreground text-xl">{property.bathrooms}</div>
                  <div className="text-muted-foreground text-xs mt-1">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-xl">
                  <Maximize2 size={24} className="text-primary mx-auto mb-2" />
                  <div className="font-poppins font-bold text-foreground text-xl">{property.sqft.toLocaleString()}</div>
                  <div className="text-muted-foreground text-xs mt-1">Square Feet</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-xl">
                  <Calendar size={24} className="text-primary mx-auto mb-2" />
                  <div className="font-poppins font-bold text-foreground text-sm">{formatDate(property.createdAt)}</div>
                  <div className="text-muted-foreground text-xs mt-1">Listed On</div>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-3 mb-8">
                {property.furnished && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl text-primary text-sm font-medium">
                    <Sofa size={16} />
                    Fully Furnished
                  </div>
                )}
                {property.parking && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl text-primary text-sm font-medium">
                    <Car size={16} />
                    Parking Available
                  </div>
                )}
                {property.offer && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">
                    <Tag size={16} />
                    Special Offer
                  </div>
                )}
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600 dark:text-green-400 text-sm font-medium">
                  <Shield size={16} />
                  Verified Listing
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-poppins font-semibold text-card-foreground text-base mb-3">Description</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{property.description}</p>
              </div>

              {/* Location */}
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-poppins font-semibold text-card-foreground text-base mb-3 flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  Location
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {property.address}, {property.state}
                </p>
                {/* Google Maps placeholder */}
                <div className="w-full h-48 rounded-xl overflow-hidden bg-muted flex items-center justify-center border border-border">
                  <iframe
                    title={`Map showing location of ${property.name}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(property.address + ', ' + ', Nigeria')}&output=embed`}
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </motion.div>

            {/* Related Properties */}
            {relatedProperties.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-poppins font-bold text-foreground text-xl">
                    More in {property.state}
                  </h2>
                  <Link
                    href="/properties-listing"
                    className="flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all"
                  >
                    View all <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedProperties.map((p, i) => (
                    <PropertyCard key={p._id} property={p} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column — Price + Inquiry Form */}
          <div className="xl:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Price Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-card rounded-2xl border border-border shadow-card p-6"
              >
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-poppins font-bold text-primary text-3xl text-naira">
                      {formatNaira(displayPrice)}
                    </span>
                    {property.type === 'rent' && (
                      <span className="text-muted-foreground text-sm">/month</span>
                    )}
                  </div>
                  {property.offer && property.discountPrice && (
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-muted-foreground text-sm line-through text-naira">
                        {formatNaira(property.regularPrice)}
                      </span>
                      <span className="px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-lg">
                        Save {formatNaira(savings)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Quick Specs */}
                <div className="space-y-3 py-4 border-y border-border mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Property Type</span>
                    <span className="font-semibold text-card-foreground capitalize">{property.type === 'sale' ? 'For Sale' : 'For Rent'}</span>
                  </div>
                  {property.bedrooms > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Bedrooms</span>
                      <span className="font-semibold text-card-foreground">{property.bedrooms}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Bathrooms</span>
                    <span className="font-semibold text-card-foreground">{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Area</span>
                    <span className="font-semibold text-card-foreground">{property.sqft.toLocaleString()} sqft</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Furnished</span>
                    <span className={`font-semibold ${property.furnished ? 'text-primary' : 'text-card-foreground'}`}>
                      {property.furnished ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Parking</span>
                    <span className={`font-semibold ${property.parking ? 'text-primary' : 'text-card-foreground'}`}>
                      {property.parking ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-semibold text-card-foreground">{property.state}</span>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <a
                    href="tel:+2348000000000"
                    className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-green"
                  >
                    <Phone size={18} />
                    Call Agent
                  </a>
                  <a
                    href={`https://wa.me/2348000000000?text=${encodeURIComponent(`Hello, I am interested in: ${property.name} at ${property.address}, ${property.state}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full border border-green-500 text-green-600 dark:text-green-400 py-3 rounded-xl font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Agent
                  </a>
                  <a
                    href="mailto:info@baylatproperties.ng"
                    className="flex items-center justify-center gap-2 w-full border border-border text-muted-foreground py-3 rounded-xl font-semibold hover:bg-secondary transition-colors"
                  >
                    <Mail size={18} />
                    Email Agent
                  </a>
                </div>
              </motion.div>

              {/* Inquiry Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="bg-card rounded-2xl border border-border shadow-card p-6"
              >
                <h3 className="font-poppins font-semibold text-card-foreground text-lg mb-1 flex items-center gap-2">
                  <MessageSquare size={20} className="text-primary" />
                  Send an Inquiry
                </h3>
                <p className="text-muted-foreground text-sm mb-5">
                  Our team typically responds within 2–4 business hours.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  {/* Name */}
                  <div>
                    <label htmlFor="inq-name" className="block text-sm font-medium text-card-foreground mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="inq-name"
                      type="text"
                      placeholder="e.g. Adaeze Okonkwo"
                      {...register('name')}
                      className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="inq-email" className="block text-sm font-medium text-card-foreground mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="inq-email"
                      type="email"
                      placeholder="your.email@example.com"
                      {...register('email')}
                      className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="inq-phone" className="block text-sm font-medium text-card-foreground mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="inq-phone"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      {...register('phone')}
                      className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="inq-message" className="block text-sm font-medium text-card-foreground mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="inq-message"
                      rows={4}
                      {...register('message')}
                      className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-green"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={18} />
                        Send Inquiry
                      </>
                    )}
                  </button>

                  <p className="text-muted-foreground text-xs text-center">
                    By submitting, you agree to our privacy policy. We never share your details.
                  </p>
                </form>
              </motion.div>

              {/* Trust Signals */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 p-5"
              >
                <h4 className="font-poppins font-semibold text-foreground text-sm mb-3">Why Buy Through Baylat?</h4>
                <ul className="space-y-2.5">
                  {[
                    'All listings are physically verified',
                    'Legal documentation support included',
                    'No hidden agency fees',
                    'NIESV-certified valuers on staff',
                    'Post-purchase support available',
                  ].map((point) => (
                    <li key={`trust-${point.slice(0, 20)}`} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={15} className="text-primary flex-shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}