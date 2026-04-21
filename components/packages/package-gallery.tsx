"use client"

import { useState } from "react"

export function PackageGallery({ mainImage, galleryUrls, title }: { mainImage: string, galleryUrls: string[], title: string }) {
  const [activeImg, setActiveImg] = useState(mainImage || galleryUrls[0] || "");

  if (!activeImg) return null;

  // Deduplicate main image from gallery urls just in case it's in both
  const allThumbnails = [mainImage, ...galleryUrls].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i);

  return (
    <div className="space-y-4 mb-8">
      {/* Main Big Image */}
      <div className="relative h-[300px] md:h-[450px] rounded-2xl overflow-hidden bg-muted border border-border shadow-sm">
        <img
          src={activeImg}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      {/* Thumbnails Slider */}
      {allThumbnails.length > 1 && (
        <div className="flex overflow-x-auto gap-3 pb-2 snap-x scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {allThumbnails.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImg(img)}
              className={`relative h-20 w-28 shrink-0 rounded-lg overflow-hidden snap-start bg-muted border-2 transition-all ${activeImg === img
                  ? "border-primary opacity-100 ring-2 ring-primary ring-offset-1 ring-offset-background"
                  : "border-transparent opacity-60 hover:opacity-100"
                }`}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
