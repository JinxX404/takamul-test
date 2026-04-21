"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Phone, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { fadeUp, fadeIn, containerStagger, slowScaleUp } from "@/lib/motion-variants"

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/desktop_slider.jpeg')",
        }}
        variants={slowScaleUp}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 bg-gradient-to-l from-primary/95 via-primary/80 to-primary/60" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-2xl"
          variants={containerStagger}
          initial="initial"
          animate="animate"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            variants={fadeUp}
          >
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground">الشركة الرائدة في الأنظمة الأمنية</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 text-balance"
            variants={fadeUp}
          >
            حلول أمنية متكاملة
            <span className="block text-accent mt-2">تحمي أمن بيت منزلك</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg text-primary-foreground/80 mb-8 leading-relaxed max-w-xl"
            variants={fadeUp}
          >
            نوفر لك أنظمة مراقبة وذكاء عالية مع زيارة فنية وتركيب احترافي وأسعار مناسبة - مع إمكانية التقسيط بكل سهولة
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            variants={fadeUp}
          >
            <Button size="lg" variant="secondary" asChild>
              <Link href="/quote" className="gap-2">
                احجز زيارة
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/contact" className="gap-2">
                <Phone className="h-4 w-4" />
                اتصل بالدعم
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-primary-foreground/20"
            variants={containerStagger}
          >
            <motion.div className="flex items-center gap-2 text-primary-foreground/80" variants={fadeUp}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <span className="text-sm">ضمان شامل</span>
            </motion.div>
            <motion.div className="flex items-center gap-2 text-primary-foreground/80" variants={fadeUp}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                <span className="text-accent font-bold">24/7</span>
              </div>
              <span className="text-sm">دعم فني متواصل</span>
            </motion.div>
            <motion.div className="flex items-center gap-2 text-primary-foreground/80" variants={fadeUp}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                <span className="text-accent font-bold">+500</span>
              </div>
              <span className="text-sm">مشروع منجز</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
