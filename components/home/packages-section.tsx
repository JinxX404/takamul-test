import Link from "next/link"
import { ShieldCheck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchGraphQL } from "@/lib/api/client"
import { PackagesGrid } from "./packages-grid"
import { MotionWrapper } from "@/components/ui/motion-wrapper"
import { fadeUp } from "@/lib/motion-variants"

const GET_TAKAMUL_PACKAGES_QUERY = `
query GetTakamulPackageCards {
  takamulpackages(first: 6, where: { orderby: [{ field: DATE, order: ASC }] }) {
    nodes {
      id
      databaseId
      date
      slug
      title
      packageDescription
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
      }
      packagePrice
      packageFeatures
      badgeText
      suitableFor
      mostRequested
    }
  }
}
`;

export async function PackagesSection() {
  let nodes: any[] = [];
  
  try {
    const data = await fetchGraphQL<any>(GET_TAKAMUL_PACKAGES_QUERY);
    nodes = (data?.takamulpackages?.nodes || [])
      .sort((a: any, b: any) => (a.databaseId || 0) - (b.databaseId || 0))
      .slice(0, 6);
  } catch (error) {
    console.error("Failed to load packages via GraphQL", error);
  }

  if (nodes.length === 0) {
    return (
      <section className="py-20 bg-secondary" dir="rtl" id="packages-v2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">فشل تحميل الباقات الأمنية حالياً، يرجى المحاولة لاحقاً.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-secondary overflow-hidden relative" dir="rtl" id="packages-v2">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <MotionWrapper
          className="max-w-4xl mx-auto mb-12 relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="rounded-3xl border border-border/60 bg-background/80 backdrop-blur px-6 md:px-10 py-8 md:py-10 shadow-lg">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-2 text-xs font-semibold text-primary">
                <ShieldCheck className="h-4 w-4 text-accent" />
                باقات حماية معتمدة
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
                <Sparkles className="h-4 w-4 text-accent" />
                تركيب احترافي وضمان شامل
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance text-center">
              اختر باقتك الأمنية الجديدة
            </h2>
            <p className="text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
              نفس الخدمات الأساسية ولكن بتجربة أوضح وأسرع في المقارنة، لتصل إلى القرار وطلب العرض خلال دقائق.
            </p>
          </div>
        </MotionWrapper>

        {/* Packages Grid - Client component for interactive animations */}
        <PackagesGrid packages={nodes} />

        {/* View All Packages CTA */}
        <MotionWrapper
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="rounded-2xl border border-border/60 bg-background/80 backdrop-blur p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm md:text-base text-muted-foreground text-center md:text-right">
              تحتاج مساعدة سريعة في اختيار الباقة الأنسب؟ فريقنا يجهز لك توصية دقيقة خلال دقائق.
            </p>
            <div className="flex items-center gap-3">
              <Button size="lg" asChild variant="outline" className="px-6 min-w-[170px]">
                <Link href="/ar/packages">شاهد جميع الباقات</Link>
              </Button>
              <Button size="lg" asChild className="px-6 min-w-[170px] shadow-lg hover:shadow-primary/25 transition-all">
                <Link href="/ar/quote">اطلب عرض سعر</Link>
              </Button>
            </div>
          </div>
        </MotionWrapper>

      </div>
    </section>
  )
}
