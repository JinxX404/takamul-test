import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ReadingProgressBar } from "@/components/blog/reading-progress-bar";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { BlogSchema } from "@/components/blog/blog-schema";
import { getBlogBySlug, getBlogs } from "@/lib/api/services/blogs.service";
import { buildSEO } from "@/lib/seo/generate-metadata";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

function stripHtml(input?: string) {
  return (input || "").replace(/<[^>]*>?/gm, "").trim();
}

function normalizeFrontendUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  const frontendBase = process.env.NEXT_PUBLIC_SITE_URL || "https://takamulsecurity.sa";
  const wpBase = (process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || "https://api.takamulsecurity.sa/graphql")
    .replace("/graphql", "")
    .replace("http://", "https://");
  return url.replace("http://", "https://").replace(wpBase, frontendBase);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getBlogBySlug(slug, lang);

  if (!post) return buildSEO(undefined, "Post Not Found", lang);
  const canonical =
    normalizeFrontendUrl(post.seo?.canonical) ||
    `${process.env.NEXT_PUBLIC_SITE_URL || "https://takamulsecurity.sa"}/${lang}/blog/${post.slug}`;
  const cleanDescription = post.seo?.metaDesc || stripHtml(post.excerpt);
  const ogImage = normalizeFrontendUrl(
    post.seo?.opengraphImage?.sourceUrl || post.featuredImage?.node?.sourceUrl || ""
  );
  const twitterImage = normalizeFrontendUrl(
    post.seo?.twitterImage?.mediaItemUrl || post.seo?.opengraphImage?.sourceUrl
  );

  return {
    title: post.seo?.title || post.title,
    description: cleanDescription,
    alternates: {
      canonical,
      languages: {
        en: canonical.replace(`/${lang}/`, "/en/"),
        ar: canonical.replace(`/${lang}/`, "/ar/"),
      },
    },
    openGraph: {
      title: post.seo?.opengraphTitle || post.title,
      description: post.seo?.opengraphDescription || cleanDescription,
      images: ogImage ? [ogImage] : undefined,
      url: canonical,
      locale: lang === "ar" ? "ar_SA" : "en_US",
      type: "article",
      publishedTime: post.date,
      authors: [post.author?.node?.name || "Takamul Security"],
    },
    robots: {
      index: post.seo?.metaRobotsNoindex !== "noindex",
      follow: post.seo?.metaRobotsNofollow !== "nofollow",
    },
    twitter: {
      card: twitterImage ? "summary_large_image" : "summary",
      title: post.seo?.twitterTitle || post.seo?.title || post.title,
      description: post.seo?.twitterDescription || cleanDescription,
      images: twitterImage ? [twitterImage] : undefined,
    },
  };
}

// Utility to inject IDs into headings for TOC
function injectHeadingIds(content: string) {
  const usedIds = new Set<string>();

  return content.replace(
    /<(h[23])([^>]*)>(.*?)<\/h[23]>/g,
    (match, tag, attrs, text) => {
      if (attrs.includes("id=")) return match;

      let id = text
        .toLowerCase()
        .replace(/<[^>]*>?/gm, "")
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      // Ensure uniqueness
      let uniqueId = id;
      let counter = 1;
      while (usedIds.has(uniqueId)) {
        uniqueId = `${id}-${counter}`;
        counter++;
      }
      usedIds.add(uniqueId);

      return `<${tag}${attrs} id="${uniqueId}">${text}</${tag}>`;
    },
  );
}

export async function generateStaticParams() {
  const [arArticles, enArticles] = await Promise.all([getBlogs("ar"), getBlogs("en")]);
  return [
    ...arArticles.map((post) => ({ lang: "ar", slug: post.slug })),
    ...enArticles.map((post) => ({ lang: "en", slug: post.slug })),
  ];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const isArabic = lang === "ar";

  const post = await getBlogBySlug(slug, lang);
  if (!post) notFound();

  const allPosts = await getBlogs(lang);
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const processedContent = injectHeadingIds(post.content || "");
  const postUrl =
    post.seo?.canonical ||
    `https://takamulsecurity.sa${post.uri || `/${lang}/blog/${post.slug}`}`;
  const tldrContent = (post.excerpt || "").replace(
    /\s*\[(?:\s*\.{3}\s*)?\]\s*(?=<\/p>\s*$|$)/i,
    "",
  );
  const primaryCategoryName =
    post.categories?.nodes?.[0]?.name || (isArabic ? "المدونة" : "Blog");
  const shareLinks = [
    {
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
      label: "Facebook",
    },
    {
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`,
      label: "Twitter",
    },
    {
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
      label: "LinkedIn",
    },
  ];
  const date = new Date(post.date).toLocaleDateString(
    isArabic ? "ar-SA" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <>
      <BlogSchema post={post} lang={lang} />
      <ReadingProgressBar />

      <main className="min-h-screen bg-background pb-20">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${lang}`}>
                  {isArabic ? "الرئيسية" : "Home"}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${lang}/blog`}>
                  {isArabic ? "المدونة" : "Blog"}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  {post.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero Section */}
        <header className="container mx-auto px-4 mb-12">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              {post.categories?.nodes?.map((cat) => (
                <Badge
                  key={cat.slug}
                  variant="secondary"
                  className="px-4 py-1 font-tajawal"
                >
                  {cat.name}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-tajawal font-bold mb-8 leading-tight tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground font-medium font-cairo">
              <div className="flex items-center gap-2">
                <span>{primaryCategoryName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{date}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {post.seo?.readingTime ||
                    (isArabic ? "8 دقائق للقراءة" : "8 min read")}
                </span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border">
            <Image
              src={post.featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
              alt={post.featuredImage?.node?.altText || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Content Layout */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
            {/* Main Content */}
            <article className="lg:col-span-8">
              {/* TL;DR Box */}
              <div className="bg-primary/5 border-l-4 border-primary p-8 rounded-2xl mb-12 shadow-sm">
                <h3 className="text-xl font-tajawal font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  {isArabic ? "ملخص سريع" : "Quick Summary"}
                </h3>
                <div
                  className="text-lg leading-relaxed text-muted-foreground italic font-cairo"
                  dangerouslySetInnerHTML={{ __html: tldrContent }}
                />
              </div>

              {/* Body Content */}
              <div
                className="prose prose-xl dark:prose-invert max-w-none font-cairo
                  prose-headings:font-tajawal prose-headings:font-bold prose-headings:tracking-tight
                  prose-p:leading-relaxed prose-p:text-muted-foreground
                  prose-img:rounded-3xl prose-img:shadow-xl
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-bold
                  prose-ul:list-disc prose-ol:list-decimal"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* Share & Tags */}
              <div className="mt-16 pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-8 font-tajawal">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider mr-2">
                    {isArabic ? "الوسوم:" : "Tags:"}
                  </span>
                  {post.tags?.nodes?.map((tag) => (
                    <Badge
                      key={tag.slug}
                      variant="outline"
                      className="px-4 py-1 hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    {isArabic ? "مشاركة:" : "Share:"}
                  </span>
                  <div className="flex gap-2">
                    {shareLinks.map(({ icon: Icon, href, label }, i) => (
                      <a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex items-center justify-center size-9 rounded-full border shadow-sm hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Related Posts: Now moved inside the main content column, at the bottom */}
              {relatedPosts.length > 0 && (
                <section className="mt-20 pt-20 border-t">
                  <h3 className="text-3xl font-tajawal font-bold mb-10 flex items-center gap-3">
                    <ArrowRight
                      className={`w-8 h-8 text-primary ${isArabic ? "rotate-180" : ""}`}
                    />
                    {isArabic ? "مقالات قد تهمك" : "Related Articles"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedPosts.map((rp) => (
                      <Link
                        key={rp.slug}
                        href={`/${lang}/blog/${rp.slug}`}
                        className="group block"
                      >
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 shadow-md">
                          <Image
                            src={
                              rp.featuredImage?.node?.sourceUrl ||
                              "/placeholder.jpg"
                            }
                            alt={rp.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-110 duration-500"
                          />
                        </div>
                        <h4 className="font-tajawal font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                          {rp.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Sidebar with Table of Contents First */}
            <aside className="lg:col-span-4 space-y-12">
              <div className="sticky top-24 space-y-12">
                {/* 1. Table of Contents */}
                <TableOfContents content={processedContent} lang={lang} />

                {/* 2. CTA Box */}
                <div className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-tajawal font-bold mb-4">
                      {isArabic
                        ? "هل تحتاج لحل أمني؟"
                        : "Need a Security Solution?"}
                    </h3>
                    <p className="text-primary-foreground/80 mb-8 leading-relaxed font-cairo">
                      {isArabic
                        ? "نحن نقدم استشارات مجانية وخطط مخصصة لاحتياجاتك."
                        : "We provide free consultations and custom plans tailored to your needs."}
                    </p>
                    <Button
                      asChild
                      variant="secondary"
                      size="lg"
                      className="w-full rounded-xl font-tajawal font-bold py-6 group/btn shadow-lg"
                    >
                      <Link href={`/${lang}/quote`}>
                        {isArabic ? "احصل على عرض سعر" : "Get a Free Quote"}
                        <ArrowLeft
                          className={`ml-2 w-5 h-5 transition-transform ${isArabic ? "group-hover:-translate-x-1" : "group-hover:translate-x-1 rotate-180"}`}
                        />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <WhatsAppButton />
    </>
  );
}
