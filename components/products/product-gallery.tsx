"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface ProductGalleryProps {
  name: string;
  brand: string;
  inStock: boolean;
  images: string[];
  lang: string;
}

export function ProductGallery({ name, brand, inStock, images, lang }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-muted border border-border">
        {activeImage ? (
          <img
            src={activeImage}
            alt={name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <ShoppingCart className="w-16 h-16 text-muted-foreground opacity-20" />
          </div>
        )}

        {brand && (
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground shadow-lg px-3 py-1">
            {brand}
          </Badge>
        )}

        {!inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm">
            <Badge variant="destructive" className="text-lg px-6 py-2 shadow-xl">
              {lang === 'ar' ? 'غير متوفر حالياً' : 'Out of Stock'}
            </Badge>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(img)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${activeImage === img ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-accent'
                }`}
            >
              <img src={img} alt={`${name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
