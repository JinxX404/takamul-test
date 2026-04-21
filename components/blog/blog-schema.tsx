import { Blog } from "@/lib/types/models"

const FRONTEND_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://takamulsecurity.sa"
const WP_URL = (process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || "https://api.takamulsecurity.sa/graphql")
  .replace("/graphql", "")
  .replace("http://", "https://")

function normalizeSchemaDomain(schemaRaw: string): string {
  return schemaRaw
    .replaceAll("http://", "https://")
    .replaceAll(WP_URL, FRONTEND_URL)
}

export function BlogSchema({ post, lang }: { post: Blog; lang: string }) {
  if (post.seo?.schema?.raw) {
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: normalizeSchemaDomain(post.seo.schema.raw) }}
      />
    )
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.featuredImage?.node?.sourceUrl,
    "author": {
      "@type": "Organization",
      "name": "Takamul Security - تكامل للأنظمة الأمنية",
      "url": `https://takamulsecurity.sa/${lang}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Takamul Security",
      "logo": {
        "@type": "ImageObject",
        "url": "https://takamulsecurity.sa/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.modified || post.date,
    "description": post.excerpt?.replace(/<[^>]*>?/gm, ''),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://takamulsecurity.sa/${lang}/blog/${post.slug}`
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
