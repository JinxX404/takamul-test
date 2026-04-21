"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { fadeUp, containerStagger } from "@/lib/motion-variants"

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={containerStagger}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance"
            variants={fadeUp}
          >
            حلولنا الأمنية الذكية، لمستقبل آمن
          </motion.h2>
          <motion.p 
            className="text-lg text-primary-foreground/80 mb-8 leading-relaxed"
            variants={fadeUp}
          >
            نحن هنا لنحمي ما يهمك بأحدث التقنيات وأفضل الكوادر الفنية.
          </motion.p>
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4"
            variants={fadeUp}
          >
            <Button size="lg" variant="secondary" asChild className="shadow-xl shadow-black/20 hover:scale-105 transition-transform">
              <Link href="/quote" className="gap-2">
                اطلب عرض سعر
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-transform" asChild>
              <Link href="/contact" className="gap-2">
                <Phone className="h-4 w-4" />
                تواصل معنا
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
