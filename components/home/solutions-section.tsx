"use client"

import Link from "next/link"
import { Home, Building2, Layers, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { fadeUp, containerStagger } from "@/lib/motion-variants"

const solutions = [
  {
    icon: Home,
    title: "أنظمة للمنازل",
    description: "حماية عالية لمنزلك مع أحدث أنظمة مراقبة منزلية وحلول الذكاء الاصطناعي لأمان شامل.",
    href: "/services/home",
    image: "/1.jpeg",
  },
  {
    icon: Building2,
    title: "حلول للأعمال",
    description: "أنظمة أمان متطورة وتقنيات ومواصفات عالمية للمحلات والشركات لضمان بيئة عمل آمنة.",
    href: "/services/business",
    image: "/2.jpeg",
  },
  {
    icon: Layers,
    title: "أنظمة متكاملة",
    description: "ربط كامل للتطبيقات والأنظمة الأمنية والحلول وأفضل تجربة متكاملة لأمن المباني الكبيرة.",
    href: "/services/integrated",
    image: "/3.jpeg",
  },
]

export function SolutionsSection() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            حلول تناسب احتياجاتك
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            سواءً كنت تبحث عن حماية منزلك أو نشاطك التجاري أو منشأتك الكبيرة، نقدم لك حلولاً مصممة خصيصاً لك.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerStagger}
        >
          {solutions.map((solution) => (
            <motion.div key={solution.title} variants={fadeUp}>
              <Card className="group overflow-hidden border-border/50 hover:border-accent/50 transition-all hover:shadow-xl pt-0 relative h-full">
                <motion.div
                  className="relative h-48 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 right-4">
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-lg"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                    >
                      <solution.icon className="h-6 w-6" />
                    </motion.div>
                  </div>
                </motion.div>
                <CardHeader className="pb-2">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                    {solution.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {solution.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="gap-2 group/btn" asChild>
                    <Link href={solution.href}>
                      اكتشف المزيد
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover/btn:-translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button size="lg" asChild className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
            <Link href="/services">
              اطلب زيارة الآن
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
