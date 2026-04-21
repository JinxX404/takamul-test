"use client"

import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { fadeUp, containerStagger } from "@/lib/motion-variants"

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
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            ماذا يقول عملاؤنا
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            آراء حقيقية من عملائنا الكرام
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerStagger}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={fadeUp}>
              <Card className="border-border/50 hover:shadow-2xl transition-all h-full group relative overflow-hidden">
                <CardContent className="pt-6">
                  {/* Quote Icon */}
                  <Quote className="h-8 w-8 text-accent/20 mb-4 transition-colors group-hover:text-accent/40" />
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-foreground/80 leading-relaxed mb-6 italic">
                    {`"${testimonial.text}"`}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <motion.div 
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold shadow-inner"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {testimonial.name.charAt(0)}
                    </motion.div>
                    <div>
                      <p className="font-medium text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
                
                {/* Decorative background element on hover */}
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-16 h-16 bg-accent/5 rounded-full blur-2xl transition-all group-hover:bg-accent/10 group-hover:scale-150" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
