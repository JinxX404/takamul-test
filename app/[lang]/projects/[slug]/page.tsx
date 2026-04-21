import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  CheckCircle2,
} from "lucide-react"

import {
  getProjectBySlug,
  getRelatedProjects,
} from "@/lib/api/services/projects.service"
import { buildSEO } from "@/lib/seo/generate-metadata"
import { Project } from "@/lib/types/models"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatArabicDate(raw?: string | null) {
  if (!raw) return null
  try {
    return new Date(raw).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return raw
  }
}

// ─── SEO ─────────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const project = await getProjectBySlug(slug, lang)
  if (!project) return { title: "Project Not Found" }
  return buildSEO(project.seo, project.title, lang)
}

// ─── Related Project Card ────────────────────────────────────────────────────

function RelatedProjectCard({
  project,
  lang,
}: {
  project: Project
  lang: string
}) {
  const imageUrl = project.featuredImage?.node?.sourceUrl || "/placeholder.svg"
  const imageAlt = project.featuredImage?.node?.altText || project.title
  const formattedDate = formatArabicDate(project.dateOfAccomplish)
  const categories = project.projecttypes?.nodes || []

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-accent/50 hover:shadow-lg transition-all duration-300 pt-0 relative">
      <Link
        href={`/${lang}/projects/${project.slug}`}
        className="absolute inset-0 z-10"
        aria-label={project.title}
      />
      <div className="relative h-44 overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
      </div>
      <CardContent className="pt-3 pb-4 relative z-20 pointer-events-none">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {categories.slice(0, 1).map((cat) => (
              <Badge
                key={cat.slug}
                variant="secondary"
                className="text-xs border-0"
              >
                {cat.name}
              </Badge>
            ))}
          </div>
        )}
        <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-2">
          {project.title}
        </h3>
        {project.address && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 text-accent shrink-0" />
            <span className="line-clamp-1">{project.address}</span>
          </div>
        )}
        {formattedDate && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
            <Calendar className="h-3 w-3 text-accent shrink-0" />
            <span>{formattedDate}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SingleProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params

  let project: Project | null = null
  try {
    project = await getProjectBySlug(slug, lang)
  } catch (error) {
    console.error("Error fetching project:", error)
  }

  if (!project) notFound()

  const {
    title,
    featuredImage,
    projecttypes,
    address,
    dateOfAccomplish,
    projectDescription,
    projectResults,
    imageGallery,
    extraSections,
    id,
  } = project

  const imageUrl = featuredImage?.node?.sourceUrl || "/placeholder.svg"
  const imageAlt = featuredImage?.node?.altText || title
  const categories = projecttypes?.nodes || []
  const galleryImages = imageGallery?.nodes || []
  const extraBlocks = extraSections?.nodes || []
  const formattedDate = formatArabicDate(dateOfAccomplish)

  // Fetch related projects using first category
  const primaryCategorySlug = categories[0]?.slug
  let relatedProjects: Project[] = []
  if (primaryCategorySlug) {
    relatedProjects = await getRelatedProjects(primaryCategorySlug, id).catch(
      () => []
    )
  }

  return (
    <>
      <main className="bg-background">
        {/* ── Back Breadcrumb ── */}
        <div className="border-b border-border bg-secondary/30">
          <div className="container mx-auto px-4 py-4">
            <Link
              href={`/${lang}/projects`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {lang === "ar" ? (
                <>
                  <ArrowRight className="h-4 w-4" />
                  العودة للمشاريع
                </>
              ) : (
                <>
                  <ArrowLeft className="h-4 w-4" />
                  Back to Projects
                </>
              )}
            </Link>
          </div>
        </div>

        {/* ── Hero ── */}
        <section className="relative w-full h-[45vh] md:h-[65vh] overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />

          <div className="absolute bottom-0 start-0 w-full">
            <div className="container mx-auto px-4 pb-12">
              {/* Category tags */}
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map((cat) => (
                    <Badge
                      key={cat.slug}
                      className="bg-accent text-accent-foreground text-sm px-3 py-1 border-0"
                    >
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              )}

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 max-w-4xl">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                {address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    <span className="text-base">{address}</span>
                  </div>
                )}
                {formattedDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    <span className="text-base">{formattedDate}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Metadata Bar ── */}
        {(address || formattedDate) && (
          <section className="border-b border-border bg-secondary/40">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center gap-0 divide-x divide-x-reverse divide-border">
                {address && (
                  <div className="flex items-center gap-3 px-6 py-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 shrink-0">
                      <MapPin className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">
                        {lang === "ar" ? "الموقع" : "Location"}
                      </p>
                      <p className="font-medium text-foreground text-sm">
                        {address}
                      </p>
                    </div>
                  </div>
                )}
                {formattedDate && (
                  <div className="flex items-center gap-3 px-6 py-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 shrink-0">
                      <Calendar className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">
                        {lang === "ar" ? "تاريخ الإنجاز" : "Completion Date"}
                      </p>
                      <p className="font-medium text-foreground text-sm">
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                )}
                {categories.length > 0 && (
                  <div className="flex items-center gap-3 px-6 py-5">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1.5">
                        {lang === "ar" ? "التصنيف" : "Category"}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {categories.map((cat) => (
                          <Badge
                            key={cat.slug}
                            variant="secondary"
                            className="text-xs"
                          >
                            {cat.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── Main Content ── */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* 1. Project Description */}
            {projectDescription && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {lang === "ar" ? "وصف المشروع" : "Project Description"}
                </h2>
                <div
                  className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: projectDescription }}
                />
              </div>
            )}

            {/* 2. Project Results */}
            {projectResults && (
              <div className="bg-secondary/50 rounded-2xl p-8 lg:p-12 mb-16 border border-border">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {lang === "ar"
                      ? "نتائج وإنجازات المشروع"
                      : "Project Outcomes & Results"}
                  </h2>
                </div>
                <div
                  className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed
                    prose-li:marker:text-accent prose-strong:text-foreground"
                  dangerouslySetInnerHTML={{ __html: projectResults }}
                />
              </div>
            )}

            {/* 3. Image Gallery */}
            {galleryImages.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  {lang === "ar" ? "معرض الصور" : "Photo Gallery"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative overflow-hidden rounded-xl group bg-muted"
                      style={{
                        height: idx % 5 === 0 ? "320px" : "220px",
                        gridColumn:
                          idx % 5 === 0 && galleryImages.length > 2
                            ? "span 1"
                            : "span 1",
                      }}
                    >
                      <Image
                        src={img.sourceUrl}
                        alt={img.altText || `صورة المشروع ${idx + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-0 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Extra Content Sections */}
            {extraBlocks.length > 0 && (
              <div className="mb-16 space-y-10">
                {extraBlocks.map((block, idx) => (
                  <div key={idx}>
                    {block.title && (
                      <h2 className="text-xl font-bold text-foreground mb-4">
                        {block.title}
                      </h2>
                    )}
                    {block.content && (
                      <div
                        className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: block.content }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Related Projects ── */}
        {relatedProjects.length > 0 && (
          <section className="py-16 bg-secondary/30 border-t border-border">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                {lang === "ar" ? "مشاريع ذات صلة" : "Related Projects"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((rp) => (
                  <RelatedProjectCard key={rp.id} project={rp} lang={lang} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {lang === "ar"
                ? "هل تطمح لنجاح مشابه؟"
                : "Ready for similar success?"}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 leading-relaxed">
              {lang === "ar"
                ? "تواصل مع فريق الخبراء لدينا اليوم لتحليل احتياجاتك الأمنية والحصول على دراسة مبدئية مجانية لمشروعك."
                : "Contact our expert team today to analyze your security needs and get a free preliminary study for your project."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 border-0"
                asChild
              >
                <Link href={`/${lang}/quote`}>
                  {lang === "ar"
                    ? "اطلب استشارة مجانية"
                    : "Request Free Consultation"}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground"
                asChild
              >
                <Link href={`/${lang}/contact`}>
                  {lang === "ar" ? "اتصل بنا" : "Contact Us"}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppButton />
    </>
  )
}
