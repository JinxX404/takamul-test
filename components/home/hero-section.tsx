"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Shield, Phone, ArrowLeft, CheckCircle2, Home, Building2, Factory, Radar } from "lucide-react"
import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useScroll, useTransform, useMotionTemplate } from "framer-motion"
import { containerStagger, slowScaleUp } from "@/lib/motion-variants"
import { buildWhatsAppUrl } from "@/lib/config/contact"

function CountUpValue({
  to,
  suffix,
  duration = 1400,
}: {
  to: number
  suffix?: string
  duration?: number
}) {
  const [value, setValue] = useState(0)
  const valueRef = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(valueRef, { once: true, margin: "-80px" })

  useEffect(() => {
    if (!isInView) {
      return
    }

    const start = performance.now()
    let raf = 0

    const tick = (time: number) => {
      const elapsed = time - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(to * eased))

      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [duration, isInView, to])

  return (
    <span ref={valueRef} className="text-accent font-bold tabular-nums">
      {value}
      {suffix || ""}
    </span>
  )
}

export function HeroSection() {
  const [showBootOverlay, setShowBootOverlay] = useState(true)
  const [activeMode, setActiveMode] = useState<"home" | "business" | "enterprise">("home")
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 65, damping: 18 })
  const smoothY = useSpring(mouseY, { stiffness: 65, damping: 18 })
  const pathname = usePathname() || "/"
  const isEnglish = pathname.startsWith("/en")
  const currentLang = isEnglish ? "en" : "ar"
  const whatsappUrl = buildWhatsAppUrl(isEnglish ? "Hello, I need a security quote" : "مرحباً، أريد عرض سعر للنظام الأمني")

  const heroLines = isEnglish
    ? ["Integrated Security", "That Protects Your Home & Business"]
    : ["حلول أمنية متكاملة", "تحمي منزلك وأعمالك"]

  const modeContent = {
    home: {
      label: isEnglish ? "Home" : "سكني",
      description: isEnglish
        ? "Smart cameras, instant alerts, and remote monitoring for family safety."
        : "كاميرات ذكية وتنبيهات فورية ومتابعة عن بعد لحماية العائلة.",
      cta: isEnglish ? "Get Home Quote" : "عرض سعر سكني",
      icon: Home,
    },
    business: {
      label: isEnglish ? "Business" : "تجاري",
      description: isEnglish
        ? "Reliable surveillance and access control built for operations and staff protection."
        : "مراقبة واعتماد دخول موثوقين لحماية التشغيل والموظفين.",
      cta: isEnglish ? "Get Business Quote" : "عرض سعر تجاري",
      icon: Building2,
    },
    enterprise: {
      label: isEnglish ? "Enterprise" : "منشآت",
      description: isEnglish
        ? "Integrated command-ready security architecture for large sites and facilities."
        : "بنية حماية متكاملة وجاهزة للتشغيل للمواقع والمنشآت الكبيرة.",
      cta: isEnglish ? "Get Enterprise Quote" : "عرض سعر منشآت",
      icon: Factory,
    },
  } as const

  const activeModeData = modeContent[activeMode]

  const isRtl = !isEnglish
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

  // The mask percentage shrinks from 100% to 0% clipping as you scroll through the 10%-85% mark of the hero
  const clipValue = useTransform(scrollYProgress, [0.1, 0.85], [100, 0])
  const ltrLinePos = useTransform(scrollYProgress, [0.1, 0.85], [0, 100])

  const clipRTL = useMotionTemplate`inset(0 0 0 ${clipValue}%)`
  const clipLTR = useMotionTemplate`inset(0 ${clipValue}% 0 0)`
  const resolvedClipPath = isRtl ? clipRTL : clipLTR

  const onHeroMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const nx = (event.clientX - rect.left) / rect.width - 0.5
    const ny = (event.clientY - rect.top) / rect.height - 0.5
    mouseX.set(nx * 10)
    mouseY.set(ny * 8)
  }

  const onHeroMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  useEffect(() => {
    const timer = setTimeout(() => setShowBootOverlay(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section ref={sectionRef} id="hero-shield-scan" className="relative h-[250vh] bg-primary">
      <div
        className="sticky top-0 h-screen w-full flex items-center overflow-hidden"
        onMouseMove={onHeroMouseMove}
        onMouseLeave={onHeroMouseLeave}
      >
        <AnimatePresence>
          {showBootOverlay && (
            <motion.div
              className="absolute inset-0 z-30 bg-primary/95 backdrop-blur-sm"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,hsl(var(--accent)/0.22)_45%,transparent_100%)] animate-pulse" />
              <div className="container mx-auto h-full px-4 flex flex-col items-center justify-center gap-5 text-primary-foreground">
                <p className="text-sm md:text-base tracking-[0.22em] uppercase text-accent font-semibold">
                  {isEnglish ? "Security Core Initializing" : "جاري تهيئة نظام الحماية"}
                </p>
                <div className="w-[240px] md:w-[320px] h-[3px] bg-primary-foreground/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent/60 via-accent to-accent/60"
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. Base Empty Background Container */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/scroll-frames/frame_0001.webp')" }}
        >
          {/* Base gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-l from-primary/95 via-primary/80 to-primary/55" />
        </div>

        {/* 2. Scroll-Masked Populated Foreground */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-[2]"
          style={{
            backgroundImage: "url('/scroll-frames/frame_0192.webp')",
            clipPath: resolvedClipPath
          }}
        >
          {/* Gradient overlay specifically for the revealed part so it visually matches */}
          <div className="absolute inset-0 bg-gradient-to-l from-primary/95 via-primary/80 to-primary/55 opacity-90" />
        </motion.div>

        {/* 3. Global Scanner Grid and FX Layout */}
        <div className="absolute inset-0 z-[3] opacity-35 pointer-events-none [background-image:linear-gradient(hsl(var(--accent)/0.18)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--accent)/0.18)_1px,transparent_1px)] [background-size:44px_44px]" />

        {/* 4. The Vertical Laser Scanner Line */}
        <motion.div
          className="pointer-events-none absolute top-0 bottom-0 w-[4px] bg-accent shadow-[0_0_30px_6px_hsl(var(--accent))] z-[4]"
          style={{
            left: isRtl 
                ? useMotionTemplate`${clipValue}%` 
                : useMotionTemplate`${ltrLinePos}%`,
            opacity: useTransform(scrollYProgress, [0.05, 0.1, 0.85, 0.9], [0, 1, 1, 0]),
            translateX: "-50%"
          }}
        />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-2xl"
          variants={containerStagger}
          initial="initial"
          animate="animate"
          style={{ x: smoothX, y: smoothY }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            variants={{
              initial: { opacity: 0, y: 18 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground">
              {isEnglish ? "Trusted Leader in Security Systems" : "الشركة الرائدة في الأنظمة الأمنية"}
            </span>
          </motion.div>

          {/* Heading */}
          <div className="mb-6 space-y-2">
            {heroLines.map((line) => (
              <motion.h1
                key={line}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight text-balance"
                variants={{
                  initial: { opacity: 0, y: 22, filter: "blur(4px)" },
                  animate: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                <span className={line === heroLines[1] ? "text-accent" : ""}>{line}</span>
              </motion.h1>
            ))}
          </div>

          {/* Description */}
          <motion.p
            className="text-lg text-primary-foreground/80 mb-8 leading-relaxed max-w-xl"
            variants={{
              initial: { opacity: 0, y: 18 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {activeModeData.description}
          </motion.p>

          {/* Interactive Security Mode Switch */}
          <motion.div
            className="mb-7 inline-flex items-center rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-1.5 backdrop-blur"
            variants={{
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
          >
            {(["home", "business", "enterprise"] as const).map((mode) => {
              const modeData = modeContent[mode]
              const Icon = modeData.icon
              const isActive = activeMode === mode

              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setActiveMode(mode)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3 md:px-4 py-2 text-xs md:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{modeData.label}</span>
                </button>
              )
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4 relative"
            variants={{
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <Button size="lg" variant="secondary" asChild className="shadow-xl shadow-primary/30">
              <Link href={`/${currentLang}/quote`} className="gap-2">
                {activeModeData.cta}
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                <Phone className="h-4 w-4" />
                {isEnglish ? "WhatsApp" : "واتساب"}
              </Link>
            </Button>

          </motion.div>

          {/* Quick Hero Actions */}
          <motion.div
            className="mt-5 flex flex-wrap items-center gap-2.5"
            variants={{
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0, transition: { delay: 0.08, duration: 0.5 } },
            }}
          >
            <Link
              href={`/${currentLang}/packages`}
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-2 text-xs md:text-sm font-medium text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            >
              <Radar className="h-3.5 w-3.5 text-accent" />
              {isEnglish ? "View Packages" : "شاهد الباقات"}
            </Link>
            <Link
              href={`/${currentLang}/projects`}
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-2 text-xs md:text-sm font-medium text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            >
              <Shield className="h-3.5 w-3.5 text-accent" />
              {isEnglish ? "View Projects" : "شاهد المشاريع"}
            </Link>
            <Link
              href={`/${currentLang}/contact`}
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-2 text-xs md:text-sm font-medium text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-accent" />
              {isEnglish ? "Contact Us" : "تواصل معنا"}
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-primary-foreground/20"
            variants={containerStagger}
          >
            <motion.div
              className="flex items-center gap-2 text-primary-foreground/80"
              variants={{ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 } }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <span className="text-sm">{isEnglish ? "Full Warranty" : "ضمان شامل"}</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 text-primary-foreground/80"
              variants={{ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 } }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                <CountUpValue to={24} suffix="/7" duration={1300} />
              </div>
              <span className="text-sm">{isEnglish ? "Technical Support" : "دعم فني متواصل"}</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 text-primary-foreground/80"
              variants={{ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 } }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                <CountUpValue to={500} suffix="+" duration={1500} />
              </div>
              <span className="text-sm">{isEnglish ? "Completed Projects" : "مشروع منجز"}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      </div>
    </section>
  )
}
