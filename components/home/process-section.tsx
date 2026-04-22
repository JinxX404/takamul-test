"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { MapPin, PenTool, Wrench, Play, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion"
import { usePathname } from "next/navigation"
import { useIsRtl } from "@/hooks/use-is-rtl"

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
  const sectionRef = useRef<HTMLElement | null>(null)
  const [journeyCompleted, setJourneyCompleted] = useState(false)
  const pathname = usePathname() || "/"
  const isEnglish = pathname.startsWith("/en")
  const currentLang = isEnglish ? "en" : "ar"
  const isRtl = useIsRtl()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 35%"],
  })

  const desktopLineScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const mobileLineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.98) {
      setJourneyCompleted(true)
    }
  })

  return (
    <section ref={sectionRef} className="py-20 bg-primary text-primary-foreground overflow-hidden" id="protection-journey">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            {isEnglish ? "Your Protection Journey" : "رحلة الحماية مع تكامل"}
          </h2>
          <p className="text-primary-foreground/70 leading-relaxed">
            {isEnglish ? "A precise 4-step workflow from site visit to full operation." : "خطوات بسيطة تضمن لك أفضل تجربة مع تكامل"}
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute right-0 left-0 top-11 h-[2px] bg-primary-foreground/20" />
          <motion.div
            className="hidden lg:block absolute right-0 left-0 top-11 h-[2px] bg-gradient-to-l from-accent via-accent to-accent/40 shadow-[0_0_20px_hsl(var(--accent)/0.45)]"
            style={{
              scaleX: desktopLineScale,
              originX: isRtl ? 1 : 0,
            }}
          />

        {/* Steps */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 relative z-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative"
              variants={{
                initial: { opacity: 0, y: 24 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              <div className="relative z-10 flex flex-col items-center text-center pb-2">
                {/* Icon Circle */}
                <motion.div 
                  className="flex h-24 w-24 items-center justify-center rounded-full bg-accent/20 border-2 border-accent mb-6 relative"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.25 }}
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
                <h3 className="text-xl font-semibold mb-3">
                  {isEnglish
                    ? index === 0
                      ? "Site Visit"
                      : index === 1
                        ? "System Design"
                        : index === 2
                          ? "Professional Install"
                          : "Operation"
                    : step.title}
                </h3>
                
                {/* Description */}
                <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-[260px] mx-auto">
                  {isEnglish
                    ? index === 0
                      ? "Our experts inspect your site and define exact security priorities."
                      : index === 1
                        ? "We build a tailored architecture for cameras, alarms, and access control."
                        : index === 2
                          ? "Certified technicians install and calibrate every component."
                          : "We launch your system and train your team for full daily control."
                    : step.description}
                </p>

                {index === steps.length - 1 && (
                  <AnimatePresence>
                    {journeyCompleted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.35 }}
                        className="mt-5"
                      >
                        <Button size="sm" variant="secondary" asChild>
                          <Link href={`/${currentLang}/quote`} className="gap-2">
                            {isEnglish ? "Instant Quote" : "عرض سعر فوري"}
                            <ArrowLeft className="h-4 w-4" />
                          </Link>
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Mobile Vertical Connecting Line */}
              {index !== steps.length - 1 && (
                <div className="lg:hidden flex justify-center py-4">
                  <div className="h-16 w-[3px] bg-primary-foreground/20 rounded-full relative overflow-hidden">
                    <motion.div 
                      className="absolute top-0 w-full bg-gradient-to-b from-accent to-accent/40"
                      initial={{ height: 0 }}
                      whileInView={{ height: "100%" }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <Button size="lg" variant="secondary" asChild className="shadow-xl">
            <Link href={`/${currentLang}/quote`} className="gap-2">
              {isEnglish ? "Request Quote" : "اطلب عرض سعر الآن"}
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
