import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border">
      <div className="h-52 shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-6 w-36 shimmer rounded-lg" />
        <div className="h-5 w-full shimmer rounded-lg" />
        <div className="h-4 w-2/3 shimmer rounded-lg" />
        <div className="flex gap-4 pt-4 border-t border-border">
          <div className="h-4 w-16 shimmer rounded-lg" />
          <div className="h-4 w-16 shimmer rounded-lg" />
          <div className="h-4 w-20 shimmer rounded-lg ml-auto" />
        </div>
      </div>
    </div>
  );
}