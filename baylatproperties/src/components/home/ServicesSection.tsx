'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Key, Building2, Settings, TrendingUp, FileText, ArrowRight } from 'lucide-react';
import { MOCK_SERVICES } from '@/lib/mockData';

const ICON_MAP: Record<string, React.ReactNode> = {
  Home: <Home size={28} />,
  Key: <Key size={28} />,
  Building2: <Building2 size={28} />,
  Settings: <Settings size={28} />,
  TrendingUp: <TrendingUp size={28} />,
  FileText: <FileText size={28} />,
};

export default function ServicesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            What We Do
          </span>
          <h2 className="font-poppins font-bold text-foreground text-3xl md:text-4xl lg:text-5xl mb-4">
            Our Core Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From property sales to estate development, Baylat Properties offers a full spectrum of real estate services tailored to the Nigerian market.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link href={`/services`} className="block group">
                <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-card-hover transition-all duration-300">
                  {/* Image with zoom */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={`${service.title} — Baylat Properties service illustration`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-green">
                      {ICON_MAP[service.icon]}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-poppins font-semibold text-card-foreground text-lg mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>
                    <div className="flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                      Learn more
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}