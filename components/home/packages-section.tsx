import Link from "next/link"
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
      <section className="py-20 bg-secondary" dir="rtl">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">فشل تحميل الباقات الأمنية حالياً، يرجى المحاولة لاحقاً.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-secondary overflow-hidden" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <MotionWrapper 
          className="text-center max-w-2xl mx-auto mb-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            اختر باقتك الأمنية
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            أسعار تنافسية وباقات مرنة تناسب متطلباتك
          </p>
        </MotionWrapper>

        {/* Packages Grid - Client component for interactive animations */}
        <PackagesGrid packages={nodes} />

        {/* View All Packages CTA */}
        <MotionWrapper 
          className="mt-12 text-center flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button size="lg" asChild className="px-8 min-w-[200px] shadow-lg hover:shadow-primary/20 transition-all">
            <Link href="/ar/packages">عرض جميع الباقات</Link>
          </Button>
        </MotionWrapper>

      </div>
    </section>
  )
}
