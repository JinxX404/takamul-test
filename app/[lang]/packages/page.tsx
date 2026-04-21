import { Metadata } from "next"
import Link from "next/link"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, ArrowLeft, Phone } from "lucide-react"

import { fetchGraphQL } from "@/lib/api/client"
import { buildSEO } from "@/lib/seo/generate-metadata"

const GET_TAKAMUL_PACKAGES_QUERY = `
  query GetTakamulPackageCards {
    takamulpackages(first: 100, where: { orderby: [{ field: DATE, order: ASC }] }) {
      nodes {
        id
        databaseId
        date
        slug
        title
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

const parseHtmlList = (text?: string) => {
  if (!text) return [];
  let parsed = text.replace(/<\/p>/gi, "|").replace(/<br\s*\/?>/gi, "|");
  parsed = parsed.replace(/<[^>]*>?/gm, "");
  const items = parsed.split(/\||\n/);
  return items.map((i) => i.trim()).filter((i) => i !== "");
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildSEO(
    undefined,
    lang === 'ar' ? "الباقات | تكامل - حلول أمنية" : "Packages | Takamul",
    lang,
    lang === "ar"
      ? "اختر الباقة الأمنية الأنسب لاحتياجك مع تركيب ودعم فني متخصص."
      : "Choose the security package that fits your needs with expert installation and support.",
    `/${lang}/packages`
  );
}

export default async function PackagesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  let nodes: any[] = [];
  try {
    const data = await fetchGraphQL<any>(GET_TAKAMUL_PACKAGES_QUERY);
    nodes = (data?.takamulpackages?.nodes || []).sort(
      (a: any, b: any) => (a.databaseId || 0) - (b.databaseId || 0),
    );
  } catch (error) {
    console.warn("GraphQL API not ready, using empty packages array.");
  }

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
                {lang === 'ar' ? 'باقاتنا الأمنية' : 'Our Security Packages'}
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                {lang === 'ar' ? 'اختر الباقة المناسبة لاحتياجاتك من بين مجموعة متنوعة من الباقات المصممة لتوفير أقصى حماية بأفضل الأسعار.' : 'Choose the right package for your needs from a variety of packages designed to provide maximum protection.'}
              </p>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {nodes.length === 0 ? (
              <div className="text-center text-muted-foreground py-10">لا توجد باقات حالياً / No packages available</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
                {nodes.map((pkg) => {
                  const isPopular = Boolean(pkg.mostRequested);
                  const badges = parseHtmlList(pkg.badgeText);
                  const features = parseHtmlList(pkg.packageFeatures);
                  const priceRaw = pkg.packagePrice;
                  const isPriceNumeric = priceRaw && !isNaN(Number(priceRaw)) && Number(priceRaw) > 0;
                  const fallbackPrice = lang === 'ar' ? "حسب الطلب" : "On Request";
                  const imageNode = pkg.featuredImage?.node;

                  return (
                    <Card
                      key={pkg.id}
                      className={`relative flex flex-col overflow-hidden transition-all hover:shadow-xl pt-0 ${isPopular ? "border-accent border-2 shadow-accent/20" : "border-border"
                        }`}
                    >
                      {isPopular && (
                        <div className="absolute top-4 left-4 z-10">
                          <Badge className="bg-accent text-accent-foreground gap-1 px-4 py-1.5">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            {lang === 'ar' ? 'الأكثر طلباً' : 'Most Popular'}
                          </Badge>
                        </div>
                      )}

                      {/* Full cover image */}
                      <div className="relative h-52 w-full bg-muted shrink-0">
                        {imageNode?.sourceUrl ? (
                          <img
                            src={imageNode.sourceUrl}
                            alt={imageNode.altText || pkg.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground text-xs">{pkg.title}</span>
                          </div>
                        )}
                      </div>

                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{pkg.title}</h3>
                            {pkg.suitableFor && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {pkg.suitableFor.replace(/<[^>]*>?/gm, "").trim()}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Dynamic Badges List */}
                        {badges.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {badges.map((badgeText, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs font-normal">
                                {badgeText}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="mt-4">
                          {isPriceNumeric ? (
                            <div className="flex items-baseline gap-1">
                              <span className="text-4xl font-bold text-primary">{priceRaw}</span>
                              <span className="text-muted-foreground">{lang === 'ar' ? 'ر.س' : 'SAR'}</span>
                            </div>
                          ) : (
                            <span className="text-2xl font-bold text-primary">{fallbackPrice}</span>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="flex-1">
                        {/* Features List */}
                        <div className="grid grid-cols-2 gap-3">
                          {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 shrink-0">
                                <Check className="h-3 w-3 text-accent" />
                              </div>
                              <span className="text-sm text-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>

                      <CardFooter className="pt-6 mt-auto">
                        <Button
                          className="w-full"
                          variant={isPopular ? "default" : "outline"}
                          size="lg"
                          asChild
                        >
                          <Link href={`/${lang}/packages/${pkg.slug}`}>
                            {lang === 'ar' ? 'عرض التفاصيل' : 'View Details'}
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

        {/* Comparison Note */}
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {lang === 'ar' ? 'هل تحتاج مساعدة في اختيار الباقة المناسبة؟' : 'Need help choosing the right package?'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {lang === 'ar'
                  ? 'فريقنا جاهز لمساعدتك في اختيار الباقة الأنسب لاحتياجاتك وميزانيتك. احجز استشارة مجانية الآن.'
                  : 'Our team is ready to help you choose the best package for your needs and budget. Book a free consultation now.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href={`/${lang}/quote`} className="gap-2">
                    {lang === 'ar' ? 'احجز استشارة مجانية' : 'Book a Free Consultation'}
                    <ArrowLeft className={`h-4 w-4 ${lang !== 'ar' && 'hidden'}`} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={`/${lang}/contact`} className="gap-2">
                    <Phone className="h-4 w-4" />
                    {lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-16 bg-background border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                {lang === 'ar' ? 'أسئلة شائعة حول الباقات' : 'Frequently Asked Questions'}
              </h2>
              <div className="space-y-4">
                {[
                  {
                    q: lang === 'ar' ? "هل يمكن تخصيص الباقات؟" : "Can packages be customized?",
                    a: lang === 'ar' ? "نعم، جميع باقاتنا قابلة للتخصيص حسب احتياجاتك. تواصل معنا لمناقشة متطلباتك." : "Yes, all our packages are fully customizable. Contact us to discuss your requirements.",
                  },
                  {
                    q: lang === 'ar' ? "ما هي مدة التركيب؟" : "How long does installation take?",
                    a: lang === 'ar' ? "يعتمد ذلك على حجم المشروع، لكن معظم المشاريع المنزلية تتم خلال يوم واحد." : "It depends on the project size, but most residential projects are completed within one day.",
                  },
                  {
                    q: lang === 'ar' ? "هل يشمل السعر التركيب؟" : "Does the price include installation?",
                    a: lang === 'ar' ? "نعم، جميع أسعار الباقات تشمل التركيب المجاني والتدريب على الاستخدام." : "Yes, all package prices include free installation and user training.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary">
                    <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="ghost" asChild>
                  <Link href={`/${lang}/faq`} className="gap-2">
                    {lang === 'ar' ? 'عرض جميع الأسئلة الشائعة' : 'View All FAQs'}
                    <ArrowLeft className={`h-4 w-4 ${lang !== 'ar' && 'hidden'}`} />
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
