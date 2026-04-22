"use client"

import { motion } from "framer-motion"
import { useIsRtl } from "@/hooks/use-is-rtl"

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
  const isRtl = useIsRtl()
  // Double the partners to ensure extremely wide 4K screens never see the end of half the track
  const trackItems = [...partners, ...partners]

  return (
    <section className="py-16 bg-background border-y border-border overflow-hidden relative" id="partners-trust-v2">
      <div className="absolute inset-0 pointer-events-none opacity-50 [background-image:linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] [background-size:52px_52px]" />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-background/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-background/40 to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-4 mb-10 text-center relative z-20">
        <p className="text-xs font-bold text-muted-foreground/70 uppercase tracking-[0.2em] mb-2">
          Trust Layer
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground">
          شركاء التقنية الذين نعتمد عليهم
        </h3>
      </div>

      <div className="flex whitespace-nowrap relative z-20 w-full overflow-hidden">
        <motion.div 
          className="flex w-max gap-4 md:gap-6"
          animate={{ x: isRtl ? ["0%", "50%"] : ["0%", "-50%"] }}
          transition={{ 
            duration: 45,
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {[1, 2].map((trackIdx) => (
            <div key={trackIdx} className="flex gap-4 md:gap-6 items-center shrink-0">
              {trackItems.map((partner, index) => (
                <div key={`${trackIdx}-${index}`} className="shrink-0">
                  <span className="inline-flex items-center justify-center min-w-[180px] md:min-w-[220px] rounded-2xl border border-border/60 bg-muted/35 px-6 py-5 text-xl md:text-2xl font-extrabold tracking-tight text-muted-foreground/70 hover:text-primary hover:border-accent/40 transition-all uppercase shadow-sm">
                    {partner.logo}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
