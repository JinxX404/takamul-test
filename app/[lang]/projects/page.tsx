import { Metadata } from "next"
import Link from "next/link"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

import { getProjects, getProjectCategories } from "@/lib/api/services/projects.service"
import { buildSEO } from "@/lib/seo/generate-metadata"
import { ProjectsGridClient } from "@/components/projects/projects-grid-client"

// ─── SEO ─────────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  return buildSEO(
    undefined,
    lang === "ar" ? "مشاريعنا | تكامل - حلول أمنية" : "Our Projects | Takamul",
    lang,
    lang === "ar"
      ? "استعرض مشاريعنا المنجزة في حلول الأنظمة الأمنية للمنازل والأعمال."
      : "Explore our completed projects in security systems for homes and businesses.",
    `/${lang}/projects`
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────

const stats = [
  { number: "+500", label: "مشروع منجز" },
  { number: "+10,000", label: "كاميرا مركبة" },
  { number: "+300", label: "عميل راضٍ" },
  { number: "5", label: "سنوات خبرة" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  // Fetch data in parallel
  const [projects, categories] = await Promise.all([
    getProjects(lang).catch(() => []),
    getProjectCategories().catch(() => []),
  ])

  return (
    <>
      <main>
        {/* ── Hero ── */}
        <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                {lang === "ar" ? "مشاريعنا" : "Our Projects"}
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
                {lang === "ar"
                  ? "نفخر بتقديم أفضل الحلول الأمنية لعملائنا. تصفح بعض مشاريعنا المنجزة."
                  : "We pride ourselves in delivering the best security solutions. Browse our completed projects."}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-accent">
                      {stat.number}
                    </p>
                    <p className="text-sm text-primary-foreground/70">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Filter + Grid (Client Component) ── */}
        <ProjectsGridClient
          projects={projects}
          categories={categories}
          lang={lang}
        />

        {/* ── CTA ── */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {lang === "ar"
                  ? "هل تريد مشروعاً مشابهاً؟"
                  : "Want a similar project?"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {lang === "ar"
                  ? "تواصل معنا اليوم واحصل على استشارة مجانية وعرض سعر مخصص لمشروعك."
                  : "Contact us today for a free consultation and custom quote."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href={`/${lang}/quote`} className="gap-2">
                    {lang === "ar" ? "اطلب عرض سعر" : "Request Quote"}
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={`/${lang}/contact`}>
                    {lang === "ar" ? "تواصل معنا" : "Contact Us"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppButton />
    </>
  )
}
