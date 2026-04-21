import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getBlogs } from "@/lib/api/services/blogs.service";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { BlogArchiveClient } from "@/components/blog/blog-archive-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const articles = await getBlogs(lang);

  // Default SEO if no articles (should theoretically use the first article's SEO if available)
  const firstPost = articles[0];

  return {
    title:
      lang === "ar"
        ? "المدونة | تكامل - حلول أمنية"
        : "Blog | Takamul Security",
    description:
      lang === "ar"
        ? "مقالات ونصائح مفيدة حول الأنظمة الأمنية وأحدث التقنيات في عالم الحماية."
        : "Articles and tips about security systems and the latest tech.",
    alternates: {
      canonical: `https://takamulsecurity.sa/${lang}/blog`,
      languages: {
        en: "https://takamulsecurity.sa/en/blog",
        ar: "https://takamulsecurity.sa/ar/blog",
      },
    },
    openGraph: {
      title:
        firstPost?.seo?.opengraphTitle ||
        (lang === "ar" ? "المدونة | تكامل" : "Blog | Takamul"),
      description:
        firstPost?.seo?.opengraphDescription ||
        (lang === "ar"
          ? "مقالات ونصائح مفيدة حول الأنظمة الأمنية"
          : "Articles and tips about security systems"),
      images: [firstPost?.seo?.opengraphImage?.sourceUrl || "/placeholder.jpg"],
      url: `https://takamulsecurity.sa/${lang}/blog`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: lang === "ar" ? "المدونة | تكامل" : "Blog | Takamul",
      description:
        lang === "ar"
          ? "مقالات ونصائح مفيدة حول الأنظمة الأمنية وأحدث التقنيات في عالم الحماية."
          : "Articles and tips about security systems and the latest tech.",
      images: [firstPost?.seo?.opengraphImage?.sourceUrl || "/placeholder.jpg"],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isArabic = lang === "ar";
  const articles = await getBlogs(lang);

  return (
    <div className="min-h-screen bg-background pb-20 font-body">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${lang}`}>
                {isArabic ? "الرئيسية" : "Home"}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{isArabic ? "المدونة" : "Blog"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <BlogArchiveClient articles={articles} lang={lang} />

      <WhatsAppButton />
    </div>
  );
}
