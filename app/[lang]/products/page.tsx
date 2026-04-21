import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Filter } from "lucide-react"

import { getProducts } from "@/lib/api/services/products.service"
import { buildSEO } from "@/lib/seo/generate-metadata"
import { Product } from "@/lib/types/models"
import { ENABLE_PRODUCTS } from "@/lib/config/features"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildSEO(
    undefined,
    lang === 'ar' ? "المنتجات | تكامل - حلول أمنية" : "Products | Takamul",
    lang,
    lang === "ar"
      ? "تصفح منتجاتنا الأمنية من الكاميرات وأجهزة الإنذار والتحكم بالدخول."
      : "Browse our security products including CCTV, alarms, and access control.",
    `/${lang}/products`
  );
}



export default async function ProductsPage({
  params,
  searchParams
}: {
  params: Promise<{ lang: string }>,
  searchParams: Promise<{ category?: string }>
}) {
  if (!ENABLE_PRODUCTS) notFound();
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const currentCategory = resolvedSearchParams.category || 'all';

  let products: Product[] = [];
  try {
    products = await getProducts(lang);
  } catch (error) {
    console.warn("GraphQL API not ready, using empty products array.");
  }

  // Extract unique categories dynamically from products
  const categoryMap = new Map<string, string>();
  products.forEach(p => {
    p.productcategories?.nodes?.forEach(c => {
      categoryMap.set(c.slug, c.name);
    });
  });

  const filterCategories = [
    { id: "all", name: lang === 'ar' ? 'الكل' : 'All' },
    ...Array.from(categoryMap.entries()).map(([slug, name]) => ({ id: slug, name }))
  ];

  // Apply filtering
  const filteredProducts = currentCategory === 'all'
    ? products
    : products.filter(p =>
      p.productcategories?.nodes?.some(c => c.slug === currentCategory)
    );

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-primary text-primary-foreground">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                {lang === 'ar' ? 'منتجاتنا الأمنية' : 'Security Products'}
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                {lang === 'ar' ? 'تصفح مجموعتنا الواسعة من المنتجات الأمنية عالية الجودة.' : 'Browse our wide range of high quality security products.'}
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 bg-secondary border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">{lang === 'ar' ? 'التصنيفات:' : 'Filters:'}</span>
              </div>
              <div className="flex items-center gap-2">
                {filterCategories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={currentCategory === cat.id ? "default" : "outline"}
                    size="sm"
                    className="shrink-0"
                    asChild
                  >
                    <Link href={`/${lang}/products${cat.id === 'all' ? '' : `?category=${cat.id}`}`}>
                      {cat.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center text-muted-foreground py-10">لا توجد منتجات حالياً / No products available</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
                  const { title, slug, featuredImage, brand, mostRequested, productPrice, salePrice, quickFeatures } = product;

                  // Highlighting logic setup
                  const cardBorder = mostRequested
                    ? "border-accent ring-1 ring-accent shadow-lg shadow-accent/10"
                    : "border-border/50 hover:border-accent/50";

                  return (
                    <Card key={product.id} className={`group overflow-hidden transition-all pt-0 relative ${cardBorder}`} dir="rtl">
                      {/* Entire Card Clickable Link overlay */}
                      <Link href={`/${lang}/products/${slug}`} className="absolute inset-0 z-10" aria-label={title}></Link>

                      <div className="relative h-48 overflow-hidden bg-muted">
                        <Image
                          src={featuredImage?.node?.sourceUrl || '/placeholder.svg'}
                          alt={featuredImage?.node?.altText || title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                        {mostRequested && (
                          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground z-20 pointer-events-none hover:bg-accent border-0 shadow-sm">
                            الأكثر طلباً
                          </Badge>
                        )}
                      </div>

                      <CardContent className="pt-4 pointer-events-none relative z-20">
                        {brand && (
                          <p className="text-xs text-muted-foreground font-medium mb-1">{brand}</p>
                        )}
                        <h3 className="font-semibold text-foreground mb-3 line-clamp-1">
                          {title}
                        </h3>

                        {/* Quick Specs HTML Injection */}
                        {quickFeatures && (
                          <div
                            className="prose prose-sm prose-neutral dark:prose-invert max-w-none mb-4 line-clamp-3 text-muted-foreground prose-p:my-0 prose-ul:my-0 prose-li:my-0"
                            dangerouslySetInnerHTML={{ __html: quickFeatures }}
                          />
                        )}

                        {/* Beautiful Pricing UI Layout exactly as requested */}
                        <div className="flex items-center gap-2 text-lg">
                          {salePrice && !isNaN(Number(salePrice)) ? (
                            <>
                              <span className="text-primary font-bold">{salePrice} ر.س</span>
                              <span className="text-gray-400 line-through text-sm">{productPrice} ر.س</span>
                            </>
                          ) : (productPrice && !isNaN(Number(productPrice)) && Number(productPrice) > 0) ? (
                            <span className="text-slate-900 font-bold dark:text-slate-100">{productPrice} ر.س</span>
                          ) : (
                            <span className="text-primary font-bold text-base">{lang === 'ar' ? 'حسب الطلب' : 'On Request'}</span>
                          )}
                        </div>
                      </CardContent>

                      <CardFooter className="pt-0 relative z-20 pointer-events-none">
                        <Button
                          variant="outline"
                          className="w-full gap-2 pointer-events-auto"
                          asChild
                        >
                          <Link href={`/${lang}/products/${slug}`}>
                            {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                            <ArrowLeft className="h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })}
              </div>
            )}

          </div>
        </section>
      </main>
      <WhatsAppButton />
    </>
  )
}
