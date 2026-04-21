"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Blog } from "@/lib/types/models";

function stripHtml(input?: string) {
  return (input || "").replace(/<[^>]*>?/gm, "");
}

function isRecentPost(date: string, days = 14) {
  const published = new Date(date).getTime();
  const now = Date.now();
  return now - published <= days * 24 * 60 * 60 * 1000;
}

export function BlogArchiveClient({
  articles,
  lang,
}: {
  articles: Blog[];
  lang: string;
}) {
  const isArabic = lang === "ar";
  const [search, setSearch] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(
    undefined,
  );

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(isArabic ? "ar-SA" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [isArabic],
  );

  const categories = useMemo(
    () =>
      Array.from(
        new Map(
          articles
            .flatMap((post) => post.categories?.nodes || [])
            .map((cat) => [cat.databaseId, cat] as const),
        ).values(),
      ).filter((cat) => cat.databaseId),
    [articles],
  );

  const sortedArticles = useMemo(
    () =>
      [...articles].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [articles],
  );

  const searchTerm = search.trim().toLowerCase();
  const filteredArticles = useMemo(
    () =>
      sortedArticles.filter((post) => {
        const matchesCategory = selectedCategoryId
          ? post.categories?.nodes?.some((cat) => cat.databaseId === selectedCategoryId)
          : true;
        if (!matchesCategory) return false;
        if (!searchTerm) return true;
        const haystack = `${post.title} ${stripHtml(post.excerpt)}`.toLowerCase();
        return haystack.includes(searchTerm);
      }),
    [searchTerm, selectedCategoryId, sortedArticles],
  );

  const hasFilters = Boolean(searchTerm || selectedCategoryId);
  const featuredArticle = hasFilters
    ? undefined
    : filteredArticles.find((post) => post.isSticky) || filteredArticles[0];
  const regularArticles = hasFilters
    ? filteredArticles
    : filteredArticles.filter((post) => post.id !== featuredArticle?.id);

  return (
    <>
      <header className="container mx-auto px-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-tajawal font-bold text-right mb-4">
          {isArabic ? "المدونة" : "Our Blog"}
        </h1>
        <p className="text-muted-foreground text-lg text-right max-w-2xl">
          {isArabic
            ? "اكتشف أحدث المقالات والنصائح في عالم الأنظمة الأمنية والذكية."
            : "Explore the latest articles and tips in the world of security and smart systems."}
        </p>

        <div className="mt-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-end">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isArabic ? "ابحث في المقالات..." : "Search articles..."}
            className="h-10 rounded-md border bg-background px-3 text-sm"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2 md:justify-end">
          <button
            type="button"
            onClick={() => setSelectedCategoryId(undefined)}
            className={`px-3 py-1 rounded-full border text-sm ${!selectedCategoryId ? "bg-primary text-primary-foreground border-primary" : "hover:bg-secondary"}`}
          >
            {isArabic ? "الكل" : "All"}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.databaseId}
              type="button"
              onClick={() => setSelectedCategoryId(cat.databaseId)}
              className={`px-3 py-1 rounded-full border text-sm ${selectedCategoryId === cat.databaseId ? "bg-primary text-primary-foreground border-primary" : "hover:bg-secondary"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </header>

      {featuredArticle && (
        <section className="container mx-auto px-4 mb-16">
          <div className="relative rounded-3xl overflow-hidden bg-card border shadow-xl flex flex-col lg:flex-row group">
            <div className="flex-1 relative aspect-video lg:aspect-auto min-h-[300px] lg:min-h-[500px]">
              <Image
                src={featuredArticle.featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
                alt={featuredArticle.featuredImage?.node?.altText || featuredArticle.title}
                width={featuredArticle.featuredImage?.node?.mediaDetails?.width || 1200}
                height={featuredArticle.featuredImage?.node?.mediaDetails?.height || 675}
                className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
            </div>
            <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-card">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge
                  variant="secondary"
                  className="px-4 py-1 text-sm bg-primary/10 text-primary border-none"
                >
                  {!hasFilters && featuredArticle.isSticky
                    ? isArabic
                      ? "📌 مـثبت"
                      : "📌 Pinned"
                    : isArabic
                      ? "مقال مميز"
                      : "Featured"}
                </Badge>
                {featuredArticle.seo?.readingTime && (
                  <Badge variant="outline" className="px-4 py-1 text-sm">
                    <Clock className="w-3 h-3 ml-1 mr-0" />
                    {featuredArticle.seo.readingTime}
                  </Badge>
                )}
              </div>
              <h2 className="text-3xl md:text-5xl font-tajawal font-bold mb-6 leading-tight text-right hover:text-primary transition-colors duration-300">
                <Link href={`/${lang}/blog/${featuredArticle.slug}`}>{featuredArticle.title}</Link>
              </h2>
              <div
                className="text-muted-foreground text-lg mb-8 line-clamp-3 text-right leading-relaxed"
                dangerouslySetInnerHTML={{ __html: featuredArticle.excerpt || "" }}
              />
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 justify-end">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {dateFormatter.format(new Date(featuredArticle.date))}
                </div>
              </div>
              <Button
                asChild
                size="lg"
                className="w-fit rounded-full px-8 self-end font-tajawal group/btn shadow-lg"
              >
                <Link href={`/${lang}/blog/${featuredArticle.slug}`}>
                  {isArabic ? "اقرأ المقال الكامل" : "Read Full Article"}
                  {isArabic ? (
                    <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4">
        {filteredArticles.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            {isArabic ? "لا توجد نتائج مطابقة." : "No matching articles found."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Link
                  href={`/${lang}/blog/${post.slug}`}
                  className="relative aspect-[16/10] overflow-hidden"
                >
                  <Image
                    src={post.featuredImage?.node?.sourceUrl || "/placeholder.jpg"}
                    alt={post.featuredImage?.node?.altText || post.title}
                    width={post.featuredImage?.node?.mediaDetails?.width || 600}
                    height={post.featuredImage?.node?.mediaDetails?.height || 400}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70" />
                  {!hasFilters && post.isSticky && (
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-none">
                      {isArabic ? "📌 مـثبت" : "📌 Pinned"}
                    </Badge>
                  )}
                  {isRecentPost(post.date) && (
                    <Badge className="absolute top-4 right-4 bg-emerald-600 text-white border-none">
                      {isArabic ? "جديد" : "New"}
                    </Badge>
                  )}
                </Link>
                <div className="p-6 flex flex-col flex-1 text-right">
                  {post.categories?.nodes?.[0] && (
                    <div className="mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {post.categories.nodes[0].name}
                      </Badge>
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 justify-end">
                    {post.seo?.readingTime && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.seo.readingTime}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {dateFormatter.format(new Date(post.date))}
                    </span>
                  </div>
                  <h3 className="text-xl font-tajawal font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                    <Link href={`/${lang}/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <div
                    className="text-muted-foreground text-sm line-clamp-3 mb-6 leading-relaxed flex-1"
                    dangerouslySetInnerHTML={{ __html: post.excerpt || "" }}
                  />
                  <Link
                    href={`/${lang}/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary self-end group/link"
                  >
                    {isArabic ? "اقرأ المزيد" : "Read More"}
                    {isArabic ? (
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    ) : (
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
