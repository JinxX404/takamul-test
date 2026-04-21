"use client"

import Link from "next/link"
import { MapPin, PenTool, Wrench, Play, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { fadeUp, containerStagger, scaleIn } from "@/lib/motion-variants"

const steps = [
  {
    icon: MapPin,
    number: "01",
    title: "زيارة ومعاينة",
    description: "فريقنا يزور موقعك لتحليل احتياجاتك الأمنية وتقديم أفضل الحلول المناسبة.",
  },
  {
    icon: PenTool,
    number: "02",
    title: "تصميم النظام",
    description: "نصمم لك نظاماً أمنياً متكاملاً يناسب متطلباتك وميزانيتك.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "التركيب",
    description: "فنيون محترفون يقومون بتركيب الأنظمة بأعلى معايير الجودة والدقة.",
  },
  {
    icon: Play,
    number: "04",
    title: "التركيب والتشغيل",
    description: "نختبر النظام ونشغله ونوفر لك تدريباً شاملاً على استخدامه.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            كيف نجهز نظامك؟
          </h2>
          <p className="text-primary-foreground/70 leading-relaxed">
            خطوات بسيطة تضمن لك أفضل تجربة مع تكامل
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerStagger}
        >
          {steps.map((step, index) => (
            <motion.div key={step.number} className="relative" variants={fadeUp}>
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-primary-foreground/20 -translate-x-1/2"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon Circle */}
                <motion.div 
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-accent/20 border-2 border-accent mb-6"
                  variants={scaleIn}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--accent), 0.3)" }}
                >
                  <step.icon className="h-10 w-10 text-accent" />
                </motion.div>
                
                {/* Number */}
                <motion.span 
                  className="text-sm font-medium text-accent mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {step.number}
                </motion.span>
                
                {/* Title */}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                
                {/* Description */}
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Button size="lg" variant="secondary" asChild className="shadow-xl">
            <Link href="/quote" className="gap-2">
              اطلب زيارة الآن
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
