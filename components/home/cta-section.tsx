"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, ArrowLeft, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { fadeUp, containerStagger } from "@/lib/motion-variants"
import { buildWhatsAppUrl } from "@/lib/config/contact"

export function CTASection() {
  const whatsappUrl = buildWhatsAppUrl("مرحباً، أريد عرض سعر سريع")

  return (
    <section className="relative py-24 overflow-hidden" id="final-cta-v2">
      {/* Background */}
      <div className="absolute inset-0 bg-primary/95">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(hsl(var(--accent)/0.16)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--accent)/0.16)_1px,transparent_1px)] [background-size:46px_46px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,hsl(var(--accent)/0.22),transparent_35%),radial-gradient(circle_at_85%_70%,hsl(var(--accent)/0.16),transparent_35%)]" />
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
          className="max-w-4xl mx-auto text-center rounded-3xl border border-primary-foreground/20 bg-primary-foreground/5 backdrop-blur px-6 md:px-12 py-10 md:py-14"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={containerStagger}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 mb-6">
            <ShieldCheck className="h-4 w-4 text-accent" />
            <span className="text-xs md:text-sm font-semibold text-primary-foreground">Security Command Ready</span>
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance"
            variants={fadeUp}
          >
            جهز نظامك الأمني اليوم
          </motion.h2>
          <motion.p 
            className="text-lg text-primary-foreground/80 mb-8 leading-relaxed"
            variants={fadeUp}
          >
            احصل على خطة حماية دقيقة لموقعك مع عرض سعر واضح وزمن تنفيذ سريع.
          </motion.p>
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4"
            variants={fadeUp}
          >
            <Button size="lg" variant="secondary" asChild className="shadow-xl shadow-black/20 transition-all hover:-translate-y-0.5">
              <Link href="/ar/quote" className="gap-2">
                اطلب عرض سعر
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all hover:-translate-y-0.5" asChild>
              <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                <Phone className="h-4 w-4" />
                واتساب مباشر
              </Link>
            </Button>
          </motion.div>

          <motion.p variants={fadeUp} className="text-primary-foreground/70 text-sm mt-6">
            استجابة أولية خلال 10 دقائق في أوقات العمل.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
