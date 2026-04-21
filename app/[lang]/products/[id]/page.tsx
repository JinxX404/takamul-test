import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, MessageCircle, ShoppingCart, Shield, Zap } from "lucide-react"

import { getProductBySlug, getCategoryProductsFallback } from "@/lib/api/services/products.service"
import { buildSEO } from "@/lib/seo/generate-metadata"
import { ProductGallery } from "@/components/products/product-gallery"
import { ENABLE_PRODUCTS } from "@/lib/config/features"
import { buildWhatsAppUrl } from "@/lib/config/contact"

interface PageProps {
  params: Promise<{ lang: string, id: string }>
}

const safeImageUrl = (url?: string) => url || '';

const parseHtmlList = (text?: string) => {
  if (!text) return [];
  let parsed = text.replace(/<\/p>/gi, "|").replace(/<br\s*\/?>/gi, "|");
  parsed = parsed.replace(/<[^>]*>?/gm, "");
  const items = parsed.split(/\||\n/);
  return items.map((i) => i.trim()).filter((i) => i !== "");
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!ENABLE_PRODUCTS) {
    return { title: "Not Found" };
  }
  const { lang, id } = await params;
  const product = await getProductBySlug(decodeURIComponent(id), lang);

  if (!product) {
    return { title: lang === 'ar' ? "المنتج غير موجود" : "Product Not Found" }
  }

  return buildSEO(product.seo, product.title, lang);
}

export default async function ProductDetailPage({ params }: PageProps) {
  if (!ENABLE_PRODUCTS) {
    notFound();
  }
  const { lang, id } = await params;
  const cleanId = decodeURIComponent(id);
  const product = await getProductBySlug(cleanId, lang);

  if (!product) {
    notFound();
  }

  // Data Mapping
  const name = product.title || '';
  const description = product.content || ''; // HTML-only, for prose section below
  const productDescription = (product.productDescription || '').replace(/<[^>]*>?/gm, '').trim();
  const priceRaw = product.productPrice;
  const salePriceRaw = product.salePrice;

  const mainImage = safeImageUrl(product.featuredImage?.node?.sourceUrl);
  const galleryNodes = product.productGallery?.nodes || [];
  const galleryUrls = [
    mainImage,
    ...galleryNodes.map((n: any) => safeImageUrl(n.sourceUrl))
  ].filter(Boolean);

  const fullSpecs = product.techSpecs?.nodes || [];
  const quickSpecs = parseHtmlList(product.quickFeatures);
  const uses = parseHtmlList(product.uses);
  const extraSections = product.extraSections?.nodes || [];

  const categoryName = product.productcategories?.nodes?.[0]?.name || (lang === 'ar' ? 'المنتجات' : 'Products');
  const brand = product.brand || '';
  const badges = parseHtmlList(product.badgeText); // Each line → separate badge
  const inStock = true;

  // Fallback Logic
  let related = product.relatedProducts?.nodes || [];
  if (related.length === 0) {
    const fallbackCategory = product.productcategories?.nodes?.[0]?.slug;
    related = await getCategoryProductsFallback(product.databaseId, fallbackCategory);
  }

  return (
    <>
      <main className="min-h-screen bg-background pb-16">
        {/* Breadcrumb */}
        <section className="py-4 bg-secondary border-b border-border">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap pb-1">
              <Link href={`/${lang}`} className="hover:text-foreground">
                {lang === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
              <span>/</span>
              <Link href={`/${lang}/products`} className="hover:text-foreground">
                {lang === 'ar' ? 'المنتجات' : 'Products'}
              </Link>
              <span>/</span>
              <span className="text-foreground truncate">{name}</span>
            </nav>
          </div>
        </section>

        {/* Top Product Hero Layout */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Right Side (RTL Right): Gallery */}
              <div className="order-2 lg:order-1">
                <ProductGallery
                  name={name}
                  brand={brand}
                  inStock={inStock}
                  images={galleryUrls}
                  lang={lang}
                />
              </div>

              {/* Left Side (RTL Left): Info & Price */}
              <div className="order-1 lg:order-2 space-y-5">

                {/* Category + mostRequested Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary/70 bg-primary/8 px-3 py-1 rounded-full border border-primary/15">
                    {categoryName}
                  </span>
                  {product.mostRequested && (
                    <Badge className="bg-amber-500/90 text-white border-0 shadow-sm text-xs">
                      {lang === 'ar' ? 'الأكثر طلباً' : 'Most Requested'}
                    </Badge>
                  )}
                </div>

                {/* Name */}
                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  {name}
                </h1>

                {/* Short Description */}
                {productDescription && (
                  <p className="text-muted-foreground leading-relaxed line-clamp-4 text-[15px]">
                    {productDescription}
                  </p>
                )}

                {/* Price Display Block */}
                <div className="flex flex-wrap items-end gap-3 py-4 border-y border-border">
                  {salePriceRaw && !isNaN(Number(salePriceRaw)) ? (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-primary">{salePriceRaw}</span>
                        <span className="text-sm font-semibold text-muted-foreground">{lang === 'ar' ? 'ر.س' : 'SAR'}</span>
                      </div>
                      <div className="text-muted-foreground/60 line-through text-xl mb-0.5">
                        {priceRaw} {lang === 'ar' ? 'ر.س' : 'SAR'}
                      </div>
                      <Badge variant="destructive" className="mb-1 text-xs">
                        {lang === 'ar' ? 'تخفيض' : 'Sale'}
                      </Badge>
                    </>
                  ) : (priceRaw && !isNaN(Number(priceRaw)) && Number(priceRaw) > 0) ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-primary">{priceRaw}</span>
                      <span className="text-sm font-semibold text-muted-foreground">{lang === 'ar' ? 'ر.س' : 'SAR'}</span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-primary leading-tight">
                      {lang === 'ar' ? 'السعر حسب المواصفات المطلوبة' : 'Price according to specifications'}
                    </span>
                  )}
                  {/* Badges row inside price section */}
                  {badges.length > 0 && (
                    <div className="space-y-2.5 w-full pt-4 border-t border-border mt-1">
                      {badges.map((badge, i) => (
                        <div 
                          key={i} 
                          className="flex items-center gap-3 p-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-sm hover:translate-x-1 transition-transform cursor-default rtl:hover:-translate-x-1"
                        >
                          <Zap className="w-4 h-4 fill-current shrink-0" />
                          <span className="text-sm leading-tight">{badge}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Main CTA */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {(() => {
                    const quoteParams = new URLSearchParams({
                      type: 'product',
                      name: name,
                      slug: cleanId,
                      ...(priceRaw ? { price: String(priceRaw) } : {}),
                      ...(salePriceRaw ? { salePrice: String(salePriceRaw) } : {}),
                      ...(categoryName ? { category: categoryName } : {}),
                      ...(badges.length > 0 ? { badges: badges.join('|') } : {}),
                    });
                    const quoteUrl = `/${lang}/quote?${quoteParams.toString()}`;
                    return (
                      <>
                        <Button size="lg" className="gap-2 h-12 text-base bg-primary hover:bg-primary/90 text-primary-foreground flex-1 min-w-[140px]" disabled={!inStock} asChild>
                          <Link href={quoteUrl}>
                            <ShoppingCart className="h-4 w-4" />
                            {lang === 'ar' ? 'اطلب الآن' : 'Order Now'}
                          </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 text-base border-primary/20 hover:bg-primary hover:text-primary-foreground gap-2 flex-1 min-w-[160px]" asChild>
                          <a
                            href={buildWhatsAppUrl(lang === 'ar' ? 'أريد الاستفسار عن المنتج: ' + name : 'I want to inquire about: ' + name)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageCircle className="h-4 w-4" />
                            {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
                          </a>
                        </Button>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section (WP Editor) */}
        {description && (
          <section className="py-12 bg-secondary">
            <div className="container mx-auto px-4 max-w-5xl">
              <div
                className="prose prose-neutral dark:prose-invert prose-lg max-w-none bg-background p-8 md:p-12 rounded-2xl shadow-sm border border-border"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </section>
        )}

        {/* Tech Specs */}
        {fullSpecs.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-foreground">
                  {lang === 'ar' ? 'المواصفات التفصيلية' : 'Detailed Specifications'}
                </h2>
                <div className="w-24 h-1 bg-accent mx-auto mt-4 rounded-full" />
              </div>
              <Card className="border-border shadow-sm overflow-hidden rounded-xl">
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {fullSpecs.map((spec: any, index: number) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-muted/50 transition-colors">
                        <span className="text-muted-foreground sm:w-1/3 mb-1 sm:mb-0 font-medium">{spec.key}</span>
                        <span className="text-foreground sm:w-2/3 sm:text-left rtl:sm:text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Uses */}
        {uses.length > 0 && (
          <section className="py-12 bg-secondary/50 border-y border-border">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground">
                  {lang === 'ar' ? 'الاستخدامات' : 'Uses'}
                </h2>
                <div className="w-24 h-1 bg-accent mx-auto mt-4 rounded-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {uses.map((use, index) => (
                  <div key={index} className="flex items-center gap-3 py-2 px-4 rounded-lg bg-background border border-border">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15">
                      <Check className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <span className="text-foreground text-sm">{use}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Extra Sections (Custom Content Blocks) */}
        {extraSections.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 max-w-5xl space-y-16">
              {extraSections.map((section: any, idx: number) => {
                if (!section.content) return null;
                return (
                  <div key={idx}>
                    {section.title && (
                      <h3 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-accent/20 inline-block">
                        {section.title}
                      </h3>
                    )}
                    <div
                      className="prose prose-neutral dark:prose-invert prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Related Products Fallback Grid */}
        {related.length > 0 && (
          <section className="py-20 bg-secondary border-t border-border mt-12">
            <div className="container mx-auto px-4">
              <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <h2 className="text-3xl font-bold text-foreground">
                  {lang === 'ar' ? 'منتجات قد تعجبك' : 'Products You May Like'}
                </h2>
                <Button variant="ghost" className="text-accent hover:text-accent hover:bg-accent/10 gap-2 font-bold" asChild>
                  <Link href={`/${lang}/products`}>
                    {lang === 'ar' ? 'تصفح كل المنتجات' : 'View All Products'}
                    <ArrowLeft className={`w-4 h-4 rtl:-scale-x-100`} />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((rel: any) => {
                  const relPrice = rel.productPrice;
                  const relSale = rel.salePrice;
                  const isCustomRel = !relPrice || isNaN(Number(relPrice));

                  return (
                    <Card key={rel.slug} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-border bg-background flex flex-col">
                      <Link href={`/${lang}/products/${rel.slug}`} className="flex-1 flex flex-col">
                        <div className="relative h-56 bg-muted overflow-hidden">
                          {rel.featuredImage?.node?.sourceUrl ? (
                            <img
                              src={safeImageUrl(rel.featuredImage.node.sourceUrl)}
                              alt={rel.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-secondary">
                              <ShoppingCart className="w-10 h-10 text-muted-foreground opacity-20" />
                            </div>
                          )}
                          {/* Sale Badge */}
                          {relSale && (
                            <Badge variant="destructive" className="absolute top-3 right-3 shadow-md px-2 py-0.5 z-10">
                              {lang === 'ar' ? 'تخفيض' : 'Sale'}
                            </Badge>
                          )}
                        </div>
                        <CardContent className="pt-5 pb-3 flex-1">
                          <h3 className="font-bold text-lg text-foreground mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                            {rel.title}
                          </h3>
                        </CardContent>
                      </Link>

                      <CardFooter className="pt-0 pb-5">
                        <div className="w-full">
                          {relSale && !isNaN(Number(relSale)) ? (
                            <div className="flex flex-col gap-1">
                              <div className="text-xs text-muted-foreground line-through decoration-muted-foreground/50">{relPrice} {lang === 'ar' ? 'ر.س' : 'SAR'}</div>
                              <div className="text-xl font-bold text-primary flex items-baseline gap-1">
                                {relSale} <span className="text-xs">{lang === 'ar' ? 'ر.س' : 'SAR'}</span>
                              </div>
                            </div>
                          ) : (relPrice && !isNaN(Number(relPrice)) && Number(relPrice) > 0) ? (
                            <div className="text-xl font-bold text-primary flex items-baseline gap-1 mt-[20px]">
                              {relPrice} <span className="text-xs">{lang === 'ar' ? 'ر.س' : 'SAR'}</span>
                            </div>
                          ) : (
                            <div className="text-lg font-bold text-primary mt-[20px]">
                              {lang === 'ar' ? 'حسب الطلب' : 'On Request'}
                            </div>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <WhatsAppButton />
    </>
  )
}
