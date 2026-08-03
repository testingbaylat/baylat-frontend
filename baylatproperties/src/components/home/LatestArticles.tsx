'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, User } from 'lucide-react';
import { MOCK_BLOG_POSTS, formatDate } from '@/lib/mockData';

export default function LatestArticles() {
  const posts = MOCK_BLOG_POSTS?.slice(0, 4);

  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Insights
            </span>
            <h2 className="font-poppins font-bold text-foreground text-3xl md:text-4xl lg:text-5xl">
              Latest from Our Blog
            </h2>
          </motion.div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            View all articles <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts?.map((post, i) => (
            <motion.div
              key={post?.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link href={`/blog/${post?.slug}`} className="block group">
                <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={post?.image}
                      alt={`${post?.title} — Baylat Properties blog article cover`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-white text-xs font-semibold rounded-lg">
                      {post?.type}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-poppins font-semibold text-card-foreground text-sm leading-snug mb-3 flex-1 line-clamp-3 group-hover:text-primary transition-colors">
                      {post?.title}
                    </h3>
                    <div className="flex items-center gap-3 text-muted-foreground text-xs">
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {post?.author}
                      </span>
                      <span className="flex items-center gap-1 ml-auto">
                        <Clock size={12} />
                        {post?.readTime} min read
                      </span>
                    </div>
                    <div className="text-muted-foreground text-xs mt-2">
                      {formatDate(post?.publishedAt)}
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