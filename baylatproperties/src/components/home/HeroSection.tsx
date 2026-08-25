'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HERO_STATS = [
{ value: '500+', label: 'Properties Sold', key: 'hs-sold' },
{ value: '100+', label: 'Happy Clients', key: 'hs-clients' },
{ value: '20+', label: 'Estates Built', key: 'hs-estates' },
{ value: '10', label: 'Years Experience', key: 'hs-years' }];


export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const search = (form.elements.namedItem('search') as HTMLInputElement).value;
    router.push(`/properties-listing?search=${encodeURIComponent(search)}`);
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}>
        
        <img
          src="/assets/images/baylat_landingpage.webp"
          alt="Luxury Nigerian home exterior — modern architecture with lush garden in Lagos"
          className="w-full h-full object-cover scale-110" />
        
        <div className="absolute inset-0 hero-gradient" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">


          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-poppins font-bold text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-2 text-balance">
            
            Find Your Dream Property{' '}
            <span className="text-primary">With Confidence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-allura text-white text-3xl sm:text-4xl lg:text-5xl mb-6 tracking-wide">
            ...your dream home awaits
          </motion.p>

         

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-10">
            
            <div className="flex-1 relative">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                name="search"
                type="text"
                placeholder="Search by location, property type, or keyword..."
                className="w-full pl-11 pr-4 py-4 rounded-xl bg-white dark:bg-card text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-lg" />
              
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-all duration-200 shadow-green whitespace-nowrap">
              
              <Search size={18} />
              Search
            </button>
          </motion.form>

        </div>
      </div>

      {/* Glassmorphism Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 mx-4 sm:mx-6 lg:mx-8 mb-0">
        
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {HERO_STATS.map((stat) =>
            <div key={stat.key} className="text-center">
                <div className="font-poppins font-bold text-foreground dark:text-white text-3xl md:text-4xl mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground dark:text-white/70 text-sm">{stat.label}</div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 flex justify-center py-6">
        
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-white/50">
          
          <ChevronDown size={28} />
        </motion.div>
      </motion.div>
    </section>);

}