'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart } from 'lucide-react';

const VALUES = [
{ key: 'val-int', icon: <Heart size={20} />, title: 'Integrity', desc: 'Transparent dealings, honest pricing, and ethical practice in every transaction.' },
{ key: 'val-exc', icon: <Target size={20} />, title: 'Excellence', desc: 'World-class service delivery that consistently exceeds client expectations.' },
{ key: 'val-inn', icon: <Eye size={20} />, title: 'Innovation', desc: 'Leveraging technology and market intelligence to stay ahead of the curve.' }];


export default function CompanyOverview() {
  return (
    <section className="section-padding bg-secondary/30 dark:bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}>
            
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Our Story
            </span>
            <h2 className="font-poppins font-bold text-foreground text-3xl md:text-4xl lg:text-5xl mb-6">
              Securing Your Future Through Land & Real Estate
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              Since 2016, Baylat Properties has been driven by a simple conviction: every Nigerian deserves access to verified, high-yield real estate. While we boast a diverse property portfolio across Nigeria, we specialize heavily in securing and developing premium lands across Lagos.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              Registered with the Corporate Affairs Commission (RC-7145654) and a proud member of NIESV, we offer unparalleled expertise in land acquisition to help you build your dream home or a profitable investment portfolio.
            </p>

            {/* Mission / Vision */}
            <div className="space-y-4 mb-8">
              <div className="flex gap-4 p-4 bg-card rounded-xl border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Target size={20} />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-card-foreground text-sm mb-1">Our Mission</h4>
                  <p className="text-muted-foreground text-sm">To provide experinced, knowlegable real estate professionals, a friendly and supportive environment, to learn and grow in,
                    while offering a spirit of co-operation, camaraderie, trust and building of relationship.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-card rounded-xl border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Eye size={20} />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-card-foreground text-sm mb-1">Our Vision</h4>
                  <p className="text-muted-foreground text-sm">To be the leader in the real estate, with a renowned reputation of honesty, integrity, impeccable customer service, helping others, and serving our community.</p>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div>
              <h4 className="font-poppins font-semibold text-foreground text-base mb-4">Core Values</h4>
              <div className="flex flex-wrap gap-3">
                {VALUES?.map((v) =>
                <div key={v?.key} className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
                    <span className="text-primary">{v?.icon}</span>
                    <span className="text-primary font-semibold text-sm">{v?.title}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right — Image collage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-48">
                  <img
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_1fe0fb071-1785303192273.png"
                    alt="Baylat Properties office team meeting in Lagos — real estate professionals at work"
                    className="w-full h-full object-cover"
                    loading="lazy" />
                  
                </div>
                <div className="rounded-2xl overflow-hidden h-32">
                  <img
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_10560dc6a-1773999099127.png"
                    alt="Property handover ceremony — Baylat Properties client receiving keys to new home in Abuja"
                    className="w-full h-full object-cover"
                    loading="lazy" />
                  
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden h-32">
                  <img
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_1863083f9-1785303191283.png"
                    alt="Baylat Heights estate development project in Abuja — aerial view of completed residential estate"
                    className="w-full h-full object-cover"
                    loading="lazy" />
                  
                </div>
                <div className="rounded-2xl overflow-hidden h-48">
                  <img
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_1d6bf1ef0-1772867581541.png"
                    alt="Modern luxury living room interior in a Baylat Properties listing — premium Lagos apartment"
                    className="w-full h-full object-cover"
                    loading="lazy" />
                  
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);



}