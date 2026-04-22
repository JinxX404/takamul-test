"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Home, Building2, Layers, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { usePathname } from "next/navigation"
import { useIsRtl } from "@/hooks/use-is-rtl"

const solutions = [
  {
    icon: Home,
    title: "أنظمة للمنازل",
    description: "حماية عالية لمنزلك مع أحدث أنظمة مراقبة منزلية وحلول الذكاء الاصطناعي لأمان شامل.",
    href: "/services/home",
    image: "/1.jpeg",
    chapterTitle: "الفصل 01 - حماية البيت",
    chapterText: "تبدأ القصة من المنزل: كاميرات ذكية + تنبيهات فورية + وصول مباشر من الجوال.",
    chapterEnTitle: "Chapter 01 - Home Layer",
    chapterEnText: "Your story starts at home with smart cameras, instant alerts, and mobile visibility.",
  },
  {
    icon: Building2,
    title: "حلول للأعمال",
    description: "أنظمة أمان متطورة وتقنيات ومواصفات عالمية للمحلات والشركات لضمان بيئة عمل آمنة.",
    href: "/services/business",
    image: "/2.jpeg",
    chapterTitle: "الفصل 02 - استمرارية العمل",
    chapterText: "ثم ننتقل لموقعك التجاري: مراقبة التشغيل، حماية الموظفين، وتوثيق كل نقطة دخول.",
    chapterEnTitle: "Chapter 02 - Business Continuity",
    chapterEnText: "Then your business gets precision monitoring, staff protection, and tracked access points.",
  },
  {
    icon: Layers,
    title: "أنظمة متكاملة",
    description: "ربط كامل للتطبيقات والأنظمة الأمنية والحلول وأفضل تجربة متكاملة لأمن المباني الكبيرة.",
    href: "/services/integrated",
    image: "/3.jpeg",
    chapterTitle: "الفصل 03 - غرفة التحكم",
    chapterText: "النهاية تكون بمنظومة موحدة تربط الكاميرات والإنذار والتحكم بالدخول في لوحة واحدة.",
    chapterEnTitle: "Chapter 03 - Unified Control",
    chapterEnText: "Finally, all security systems are unified under one command-ready control workflow.",
  },
]

export function SolutionsSection() {
  const pathname = usePathname() || "/"
  const isEnglish = pathname.startsWith("/en")
  const currentLang = isEnglish ? "en" : "ar"
  const isRtl = useIsRtl()
  
  const containerRef = useRef<HTMLElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  })

  // The glowing progress line that fills the timeline trace
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-background relative overflow-hidden" id="services-story">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20 md:mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 text-balance tracking-tight">
            {isEnglish ? "A Security Story That Moves With You" : "قصة حماية تتحرك مع العميل"}
          </h2>
          <p className="text-muted-foreground leading-relaxed md:text-xl">
            {isEnglish
              ? "Follow the timeline to see how our scalable protection models come to life."
              : "تتبع مسار الأمان وشاهد كيف تتصاعد فصول الحماية، من المنزل حتى كبرى المنشآت."}
          </p>
        </motion.div>

        {/* Cinematic Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* The Central Line Trace (Desktop) */}
          <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-[2px] bg-border/60 transform md:-translate-x-1/2 rounded-full z-0 block" />
          
          {/* Animated Glow Line Progress Tracker */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute top-0 left-[28px] md:left-1/2 w-[3px] bg-gradient-to-b from-primary via-accent to-primary transform md:-translate-x-1/2 rounded-full z-10 block"
          />

          <div className="space-y-24 md:space-y-40 relative z-20 pb-20">
            {solutions.map((solution, index) => {
              const isEven = index % 2 === 0
              
              // Variables to handle alternating slide directions based on RTL + Even/Odd logic
              const slideTextX = isEven ? (isRtl ? -60 : -60) : (isRtl ? 60 : 60)
              const slideImgX = isEven ? (isRtl ? 60 : 60) : (isRtl ? -60 : -60)

              return (
                <div 
                  key={solution.title} 
                  className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isEven ? '' : 'md:flex-row-reverse'}`}
                >
                  
                  {/* Timeline Glowing Node Dot */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="absolute left-[28px] md:left-1/2 w-8 h-8 rounded-full border-[5px] border-background bg-accent transform -translate-x-1/2 hidden md:block z-30 shadow-[0_0_25px_rgba(var(--accent),0.6)]"
                  />
                  
                  {/* Content (Text Card) Slide-In */}
                  <motion.div 
                    initial={{ opacity: 0, x: slideTextX, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`w-full md:w-1/2 flex pl-16 md:pl-0 ${isEven ? "md:justify-end md:pr-16 md:rtl:pr-0 md:rtl:pl-16" : "md:justify-start md:pl-16 md:rtl:pl-0 md:rtl:pr-16"}`}
                  >
                    <Card className="w-full max-w-[500px] border-border/50 shadow-xl overflow-hidden group hover:border-accent/40 hover:shadow-2xl transition-all duration-500 bg-card/60 backdrop-blur-sm">
                      <CardHeader className="pb-4">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 text-accent px-4 py-1.5 text-xs font-bold uppercase tracking-widest self-start">
                          <solution.icon className="h-4 w-4" />
                          {isEnglish ? solution.chapterEnTitle : solution.chapterTitle}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2 leading-tight">
                          {isEnglish
                            ? index === 0
                              ? "Secure Your Home"
                              : index === 1
                                ? "Protect Operations"
                                : "Unify Security Control"
                            : solution.title}
                        </h3>
                      </CardHeader>

                      <CardContent className="pb-2">
                        <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
                          {isEnglish ? solution.chapterEnText : solution.chapterText}
                        </p>
                        <p className="text-muted-foreground/70 text-sm md:text-base border-t border-border/60 pt-4 font-medium italic">
                          {solution.description}
                        </p>
                      </CardContent>

                      <CardFooter className="pt-6 border-t border-border/40 bg-muted/20">
                        <Button asChild className="w-full sm:w-auto shadow-md group-hover:scale-105 transition-transform duration-300">
                          <Link href={`/${currentLang}${solution.href}`} className="gap-2 font-bold">
                            {isEnglish ? "Explore Chapter" : "استكشف هذا الفصل"}
                            <ArrowLeft className={`h-4 w-4 ${isRtl ? 'mr-1' : 'ml-1'} transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1`} />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                  
                  {/* Image Presentation Slide-In */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, x: slideImgX, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                    className="w-full md:w-1/2 flex pl-16 md:pl-0 order-first md:order-none relative"
                  >
                    {/* Mobile Only Timeline Node */}
                    <div className="absolute top-1/2 -left-[45px] rtl:-right-[45px] w-6 h-6 rounded-full border-4 border-background bg-accent md:hidden z-30 shadow-[0_0_15px_rgba(var(--accent),0.6)]" />

                    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] w-full max-w-[500px] border border-border/50 group">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                      <img 
                        src={solution.image} 
                        alt={solution.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" 
                      />
                      
                      <div className="absolute bottom-6 left-6 right-6 z-20">
                        <div className="inline-flex items-center gap-2 rounded-full bg-background/80 backdrop-blur-md text-foreground px-3 py-1 text-xs font-semibold shadow-xl border border-white/10">
                          <solution.icon className="h-3.5 w-3.5 text-accent" />
                          {isEnglish ? "Interactive Preview" : "معاينة تفاعلية"}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                </div>
              )
            })}
          </div>

        </div>

        {/* Final CTA Node mapped to the end of the timeline */}
        <motion.div
          className="text-center mt-12 relative z-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block p-1 rounded-full bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20 shadow-[0_0_30px_rgba(var(--accent),0.15)]">
            <Button size="lg" asChild className="rounded-full shadow-inner text-base md:text-lg h-14 md:h-16 px-8 md:px-12 hover:scale-105 transition-all duration-300">
              <Link href={`/${currentLang}/quote`}>
                {isEnglish ? "Advance To A Free Quote" : "انتقل لطلب عرض سعر مجاني"}
              </Link>
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
