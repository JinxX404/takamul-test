"use client"

import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const partners = [
  { name: "Hikvision", logo: "HIKVISION" },
  { name: "Dahua", logo: "dahua" },
  { name: "Samsung", logo: "SAMSUNG" },
  { name: "Axis", logo: "AXIS" },
  { name: "Pravis", logo: "PRAVIS" },
  { name: "Wepra", logo: "WEPRA" },
  { name: "Arecont Vision", logo: "Arecont Vision" },
]

export function PartnersSection() {
  const singleSetRef = useRef<HTMLDivElement>(null)
  const [setWidth, setSetWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => {
      if (singleSetRef.current) {
        setSetWidth(singleSetRef.current.scrollWidth)
      }
    }

    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    if (singleSetRef.current) observer.observe(singleSetRef.current)
    window.addEventListener("resize", updateWidth)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", updateWidth)
    }
  }, [])

  return (
    <section className="py-12 bg-muted/30 border-y border-border overflow-hidden relative">
      {/* Soft edge fades for premium feel */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-background/40 to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-4 mb-8 text-center relative z-20">
        <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">
          شركاء النجاح
        </p>
      </div>

      <div className="flex whitespace-nowrap">
        <motion.div 
          className="flex min-w-max"
          animate={setWidth > 0 ? { x: [0, -setWidth] } : {}}
          transition={{ 
            duration: 35, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <div ref={singleSetRef} className="flex items-center shrink-0">
            {partners.map((partner, index) => (
              <div key={`a-${index}`} className="px-12 md:px-20 text-muted-foreground/40 hover:text-foreground transition-all shrink-0">
                <span className="text-2xl md:text-4xl font-extrabold tracking-tight opacity-50 hover:opacity-100 transition-all hover:scale-110 inline-block uppercase">
                  {partner.logo}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center shrink-0" aria-hidden="true">
            {partners.map((partner, index) => (
              <div key={`b-${index}`} className="px-12 md:px-20 text-muted-foreground/40 hover:text-foreground transition-all shrink-0">
                <span className="text-2xl md:text-4xl font-extrabold tracking-tight opacity-50 hover:opacity-100 transition-all hover:scale-110 inline-block uppercase">
                  {partner.logo}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
