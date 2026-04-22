"use client"

import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useIsRtl } from "@/hooks/use-is-rtl"

const testimonials = [
  {
    name: "أحمد الغامدي",
    location: "الرياض",
    rating: 5,
    text: "منذ تركيب نظام تكامل الأمني، شعرت بتحسن كبير في مستوى الأمان في منزلي. الفريق محترف والخدمة ممتازة.",
  },
  {
    name: "فيصل بن جديد",
    location: "جدة",
    rating: 5,
    text: "منذ تركيب نظام تكامل الأمني، شعرت بتحسن كبير في مستوى الأمان. الفريق محترف والخدمة ممتازة وأسعارهم منافسة.",
  },
  {
    name: "محمد العتيبي",
    location: "الرياض",
    rating: 5,
    text: "خدمة ممتازة وأسعار تنافسية. أنصح بهم بشدة لكل من يبحث عن حلول أمنية متكاملة وموثوقة.",
  },
]

export function TestimonialsSection() {
  const pathname = usePathname() || "/"
  const isEnglish = pathname.startsWith("/en")
  const isRtl = useIsRtl()
  const trackItems = [...testimonials, ...testimonials, ...testimonials]

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {isEnglish ? "Trusted by Clients Across Saudi Arabia" : "ماذا يقول عملاؤنا"}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {isEnglish ? "Real feedback from homeowners and business operators." : "آراء حقيقية من عملائنا الكرام"}
          </p>
        </motion.div>

        {/* Premium Testimonial Marquee */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />

          <motion.div
            className="flex w-max gap-6"
            animate={{ x: isRtl ? ["0%", "50%"] : ["0%", "-50%"] }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[1, 2].map((trackIdx) => (
              <div key={trackIdx} className="flex gap-6 shrink-0">
                {trackItems.map((testimonial, index) => (
                  <Card key={`${trackIdx}-${index}`} className="w-[320px] md:w-[360px] border-border/50 hover:shadow-2xl transition-all h-full group relative overflow-hidden shrink-0">
                    <CardContent className="pt-6">
                      <Quote className="h-8 w-8 text-accent/20 mb-4 transition-colors group-hover:text-accent/40" />
                      
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                        ))}
                      </div>

                      <p className="text-foreground/80 leading-relaxed mb-6 italic">
                        {`"${testimonial.text}"`}
                      </p>

                      <div className="flex items-center gap-3 pt-4 border-t border-border">
                        <motion.div 
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold shadow-inner"
                          whileHover={{ scale: 1.05 }}
                        >
                          {testimonial.name.charAt(0)}
                        </motion.div>
                        <div>
                          <p className="font-medium text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                      </div>
                    </CardContent>
                    
                    <div className="absolute top-0 right-0 -mr-6 -mt-6 w-16 h-16 bg-accent/5 rounded-full blur-2xl transition-all group-hover:bg-accent/10 group-hover:scale-150" />
                  </Card>
                ))}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
