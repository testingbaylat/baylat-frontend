'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Users, Zap } from 'lucide-react';

const REASONS = [
{
  key: 'wcb-trust',
  icon: <Shield size={28} />,
  title: 'Trusted & Verified',
  description: 'Every property on our platform is physically inspected and legally verified. No fake listings, no surprises — just genuine properties with clean titles.',
  color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
},
{
  key: 'wcb-expert',
  icon: <Award size={28} />,
  title: 'Expert Local Knowledge',
  description: '10 years of deep market experience in Lagos, Abuja, and Port Harcourt. We know the neighbourhoods, the price trends, and the best-value deals.',
  color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
},
{
  key: 'wcb-clients',
  icon: <Users size={28} />,
  title: 'Client-First Approach',
  description: 'We don\'t just sell properties — we build relationships. Our 100+ satisfied clients across Nigeria trust us to put their interests first, always.',
  color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
},
{
  key: 'wcb-fast',
  icon: <Zap size={28} />,
  title: 'Fast, Stress-Free Process',
  description: 'From search to handover in record time. Our streamlined process handles documentation, negotiation, and legal due diligence so you don\'t have to.',
  color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
}];


export default function WhyChooseBaylat() {
  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative">
            
            <div className="relative rounded-3xl overflow-hidden shadow-card-hover">
              <img
                src="https://img.rocket.new/generatedImages/rocket_gen_img_15b05c936-1773071491610.png"
                alt="Baylat Properties team conducting a property inspection in Lagos — professional real estate consultation"
                className="w-full h-[500px] object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-5 shadow-card-hover border border-border">
              <div className="text-center">
                <div className="font-poppins font-bold text-primary text-3xl">₦4B+</div>
                <div className="text-muted-foreground text-sm mt-1">In Property Transactions</div>
              </div>
            </div>
          </motion.div>

          {/* Right — Reasons */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10">
              
              <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3">
                Why Choose Us
              </span>
              <h2 className="font-poppins font-bold text-foreground text-3xl md:text-4xl lg:text-5xl mb-4">
                The Baylat Difference
              </h2>
              <p className="text-muted-foreground text-lg">
                We combine deep local expertise with transparent, client-first service to deliver real estate experiences that exceed expectations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {REASONS?.map((reason, i) =>
              <motion.div
                key={reason?.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card rounded-2xl p-5 border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300">
                
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${reason?.color}`}>
                    {reason?.icon}
                  </div>
                  <h3 className="font-poppins font-semibold text-card-foreground text-base mb-2">
                    {reason?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {reason?.description}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);



}