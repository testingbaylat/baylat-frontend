'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { MOCK_TESTIMONIALS } from '@/lib/mockData';

export default function TestimonialsCarousel() {
  return (
    <section className="section-padding bg-secondary/50 dark:bg-secondary/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3">
            Client Stories
          </span>
          <h2 className="font-poppins font-bold text-foreground text-3xl md:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>
        </motion.div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {MOCK_TESTIMONIALS?.map((testimonial) => (
            <SwiperSlide key={testimonial?.id}>
              <div className="bg-card rounded-2xl p-6 border border-border shadow-card h-full flex flex-col">
                {/* Quote Icon */}
                <div className="text-primary/20 mb-4">
                  <Quote size={36} />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial?.rating })?.map((_, idx) => (
                    <Star
                      key={`star-${testimonial?.id}-${idx}`}
                      size={16}
                      className="text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{testimonial?.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <img
                    src={testimonial?.avatar}
                    alt={`${testimonial?.name} — Baylat Properties client from ${testimonial?.location}`}
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-poppins font-semibold text-card-foreground text-sm">
                      {testimonial?.name}
                    </div>
                    <div className="text-muted-foreground text-xs">{testimonial?.location}</div>
                  </div>
                  <span className="ml-auto px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg font-medium">
                    {testimonial?.propertyType}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}