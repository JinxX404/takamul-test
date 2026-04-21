import { Check, Phone, MessageCircle, Shield, Clock, Wrench, Star, ShoppingCart, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { notFound } from "next/navigation"
import { fetchGraphQL } from "@/lib/api/client"
import { PackageGallery } from "@/components/packages/package-gallery"
import { buildWhatsAppUrl } from "@/lib/config/contact"
import { Metadata } from "next"
import { getPackageBySlug } from "@/lib/api/services/packages.service"
import { buildSEO } from "@/lib/seo/generate-metadata"

const GET_SINGLE_PACKAGE_QUERY = `
query GetSingleTakamulPackage($id: ID!) {
  takamulpackage(id: $id, idType: SLUG) {
    id
    databaseId
    title
    slug
    content           
    packageDescription
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    packagePrice
    badgeText
    suitableFor
    mostRequested
    packageFeatures
    packageContent
    packageImages {
      nodes {
        sourceUrl
        altText
      }
    }
    techSpecs {
      nodes {
        key
        value
      }
    }
    enableCustomLayout
    customHtmlContent {
      edges {
        node {
          id
          title
          content
        }
      }
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

// Handle Namecheap fallback SSL error natively
const safeImageUrl = (url?: string) => url || '';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const pkg = await getPackageBySlug(decodeURIComponent(slug));
  if (!pkg) return { title: lang === "ar" ? "الباقة غير موجودة" : "Package Not Found" };
  return buildSEO(pkg.seo, pkg.title, lang);
}

export default async function PackageDetailPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
  const { lang, slug } = await params
  
  const cleanSlug = decodeURIComponent(slug);

  let pkg: any = null;
  let otherPackages: any[] = [];

  try {
    const data = await fetchGraphQL<any>(GET_SINGLE_PACKAGE_QUERY, {
      variables: { id: cleanSlug }
    });
    pkg = data?.takamulpackage;
    
    // Fetch related packages dynamically for the footer section
    const otherData = await fetchGraphQL<any>(`
      query GetOther {
        takamulpackages(first: 4) {
          nodes {
            slug
            title
            content
            packagePrice
            featuredImage { node { sourceUrl } }
          }
        }
      }
    `);
    otherPackages = (otherData?.takamulpackages?.nodes || [])
      .filter((p: any) => p.slug !== cleanSlug)
      .slice(0, 3);

  } catch (error) {
    console.error("Single package GraphQL fail:", error);
  }

  if (!pkg) {
    notFound();
  }

  // Map Data
  const isPopular = pkg.mostRequested;
  const subtitle = (pkg.suitableFor || '').replace(/<[^>]*>?/gm, "").trim();
  const priceRaw = pkg.packagePrice;
  const isPriceNumeric = priceRaw && !isNaN(Number(priceRaw)) && Number(priceRaw) > 0;
  const fallbackPrice = lang === 'ar' ? "السعر حسب المواصفات المطلوبة" : "Price according to specifications";
  
  const mainImage = safeImageUrl(pkg.featuredImage?.node?.sourceUrl);
  const gallery = pkg.packageImages?.nodes || [];
  const galleryUrls = gallery.map((img: any) => safeImageUrl(img.sourceUrl)).filter(Boolean);
  
  const features = parseHtmlList(pkg.packageFeatures);
  const packageContents = parseHtmlList(pkg.packageContent);
  const specs = pkg.techSpecs?.nodes || [];

  // Used strictly as flat string description for Hero block, as per instructions.
  const descriptionText = (pkg.packageDescription || '').replace(/<[^>]*>?/gm, "").trim(); 
  
  const enableCustom = pkg.enableCustomLayout;
  const customHtmlEdges = pkg.customHtmlContent?.edges || [];
  const badges = parseHtmlList(pkg.badgeText);

  // Build quote URL with full context
  const quoteParams = new URLSearchParams({
    type: 'package',
    name: pkg.title,
    slug: cleanSlug,
    ...(isPriceNumeric ? { price: String(priceRaw) } : {}),
    ...(subtitle ? { category: subtitle } : {}),
    ...(badges.length > 0 ? { badges: badges.join('|') } : {}),
  });
  const quoteUrl = `/${lang}/quote?${quoteParams.toString()}`;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-16 bg-primary overflow-hidden">
        {mainImage && (
          <div className="absolute inset-0 opacity-10">
            <img src={mainImage} alt={pkg.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            {isPopular && (
              <span className="inline-flex items-center gap-1 bg-accent text-white px-3 py-1 rounded-full text-sm mb-4">
                <Star className="w-4 h-4 fill-current" />
                {lang === 'ar' ? 'الأكثر طلباً' : 'Most Popular'}
              </span>
            )}
            {subtitle && <p className="text-white/70 mb-2">{subtitle}</p>}
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{pkg.title}</h1>
            
            {descriptionText && (
              <p className="text-xl text-white/80 mb-6">{descriptionText}</p>
            )}

            <div className="flex items-baseline gap-2 mb-8">
              {isPriceNumeric ? (
                <>
                  <span className="text-4xl font-bold text-white">{priceRaw}</span>
                  <span className="text-white/70">{lang === 'ar' ? 'ر.س' : 'SAR'}</span>
                </>
              ) : (
                <span className="text-2xl font-bold text-white leading-tight">{fallbackPrice}</span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="px-8 py-4 bg-white text-primary hover:bg-white/90">
                <Link href={quoteUrl}>
                  <ShoppingCart className="w-4 h-4" />
                  {lang === 'ar' ? 'اطلب عرض سعر' : 'Request Quote'}
                </Link>
              </Button>
              <Button asChild size="lg" className="px-8 py-4 border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary">
                <Link href={`/${lang}/contact`} className="flex items-center gap-2 text-base">
                  <Phone className="w-4 h-4" />
                  {lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Main Content Rendered HTML */}
              {pkg.content && (
                <div 
                  className="prose prose-neutral dark:prose-invert max-w-none w-full" 
                  dangerouslySetInnerHTML={{ __html: pkg.content }} 
                />
              )}



              {/* Features - Conditional Rendering */}
              {features.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {lang === 'ar' ? 'مميزات الباقة' : 'Package Features'}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                        <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-accent" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications - Conditional Rendering */}
              {specs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {lang === 'ar' ? 'المواصفات التقنية' : 'Technical Specifications'}
                  </h2>
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {specs.map((spec: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-4">
                            <span className="text-muted-foreground">{spec.key}</span>
                            <span className="font-medium text-foreground">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* What's Included - Conditional Rendering */}
              {packageContents.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {lang === 'ar' ? 'محتويات الباقة' : 'Package Content'}
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {packageContents.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Section */}
              {(mainImage || galleryUrls.length > 0) && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    {lang === 'ar' ? 'معرض الصور' : 'Gallery'}
                  </h2>
                  <PackageGallery mainImage={mainImage} galleryUrls={galleryUrls} title={pkg.title} />
                </div>
              )}

              {/* Ideal For */}
              {subtitle && (
                <Card className="border-accent/20 bg-accent/5">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-foreground mb-2">
                      {lang === 'ar' ? 'مثالية لـ' : 'Ideal For'}
                    </h3>
                    <p className="text-muted-foreground">{subtitle}</p>
                  </CardContent>
                </Card>
              )}

              {/* Dynamic Custom Layout Sections */}
              {enableCustom && customHtmlEdges.length > 0 && (
                <div className="space-y-12 mt-12">
                  {customHtmlEdges.map((edge: any) => {
                    const htmlToRender = edge?.node?.content || edge?.node?.customHtml || '';
                    const sectionTitle = edge?.node?.title || '';
                    if (!htmlToRender) return null;
                    return (
                      <div key={edge.node.id}>
                        {sectionTitle && (
                          <h2 className="text-2xl font-bold text-foreground mb-6">
                            {sectionTitle}
                          </h2>
                        )}
                        <div 
                          className="prose prose-neutral dark:prose-invert max-w-none w-full" 
                          dangerouslySetInnerHTML={{ __html: htmlToRender }} 
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                
                {/* Highlights / Badges Section */}
                {badges.length > 0 && (
                  <div className="space-y-3">
                    {badges.map((badge, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-3 p-4 bg-primary text-primary-foreground rounded-2xl font-bold shadow-md hover:translate-x-1 transition-transform cursor-default rtl:hover:-translate-x-1"
                      >
                        <Zap className="w-5 h-5 fill-current shrink-0" />
                        <span className="text-[15px] leading-tight">{badge}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Price Card */}
                <Card className="border-2 border-primary">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      {isPriceNumeric ? (
                        <>
                          <div className="text-4xl font-bold text-primary mb-1">{priceRaw}</div>
                          <div className="text-sm text-muted-foreground">{lang === 'ar' ? 'ريال سعودي' : 'SAR'}</div>
                        </>
                      ) : (
                        <div className="text-xl font-bold text-primary leading-tight">{fallbackPrice}</div>
                      )}
                    </div>
                    <div className="space-y-3">
                      <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                        <Link href={quoteUrl}>{lang === 'ar' ? 'اطلب الآن' : 'Order Now'}</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" size="lg">
                        <a href={buildWhatsAppUrl("أريد الاستفسار عن الباقة: " + pkg.title)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Benefits */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-foreground mb-4">
                      {lang === 'ar' ? 'لماذا تختار تكامل؟' : 'Why Takamul?'}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <Shield className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{lang === 'ar' ? 'ضمان شامل' : 'Comprehensive Warranty'}</h4>
                          <p className="text-sm text-muted-foreground">{lang === 'ar' ? 'ضمان على جميع المنتجات' : 'Warranty on all products'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <Wrench className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{lang === 'ar' ? 'تركيب مجاني' : 'Free Installation'}</h4>
                          <p className="text-sm text-muted-foreground">{lang === 'ar' ? 'فريق فني متخصص' : 'Specialized technical team'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{lang === 'ar' ? 'دعم 24/7' : '24/7 Support'}</h4>
                          <p className="text-sm text-muted-foreground">{lang === 'ar' ? 'خدمة عملاء على مدار الساعة' : 'Customer service around the clock'}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Scenario */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              {lang === 'ar' ? 'كيف تعمل الباقة؟' : 'How the Package Works?'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-accent/20">
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-4">
                    {lang === 'ar' ? 'السيناريو اليومي' : 'Daily Scenario'}
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>{lang === 'ar' ? '• عند مغادرتك المنزل، يتم تشغيل النظام تلقائياً' : '• When leaving home, the system arms automatically'}</p>
                    <p>{lang === 'ar' ? '• الكاميرات تراقب جميع المداخل والنوافذ على مدار الساعة' : '• Cameras monitor all entrances 24/7'}</p>
                    <p>{lang === 'ar' ? '• في حال اكتشاف حركة مشبوهة، يتم إرسال تنبيه فوري لهاتفك' : '• Instant alerts sent to your phone on suspicious motion'}</p>
                    <p>{lang === 'ar' ? '• يمكنك مراقبة البث المباشر من أي مكان في العالم' : '• Monitor live feeds from anywhere globally'}</p>
                    <p>{lang === 'ar' ? '• النظام يعمل بالطاقة الاحتياطية في حال انقطاع الكهرباء' : '• System relies on backup power during outages'}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-accent/20">
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-4">
                    {lang === 'ar' ? 'في حالات الطوارئ' : 'In Emergencies'}
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>{lang === 'ar' ? '• أجهزة الإنذار تفعل صوتاً عالياً لإخافة المتسللين' : '• Alarms trigger loud sirens to deter intruders'}</p>
                    <p>{lang === 'ar' ? '• يتم إشعار الجيران والسلطات المختصة تلقائياً' : '• Authorities are notified automatically'}</p>
                    <p>{lang === 'ar' ? '• التسجيل المستمر يحفظ الأدلة للشرطة' : '• Continuous recording secures evidence for police'}</p>
                    <p>{lang === 'ar' ? '• نظام النسخ الاحتياطي يضمن عدم فقدان البيانات' : '• Backup systems ensure nothing is lost'}</p>
                    <p>{lang === 'ar' ? '• فريق الدعم الفني متاح 24/7 للمساعدة' : '• Support team is available 24/7 to assist'}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              {lang === 'ar' ? 'آراء عملائنا' : 'Customer Reviews'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-accent/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    {lang === 'ar' ? '"نظام رائع جداً! سهل الاستخدام والكاميرات واضحة جداً. أشعر بالأمان التام الآن."' : '"Amazing system! Easy to use and cameras are perfectly clear."'}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">أ.س</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{lang === 'ar' ? 'أحمد السعد' : 'Ahmed Alsaad'}</p>
                      <p className="text-sm text-muted-foreground">{lang === 'ar' ? 'مالك فيلا' : 'Villa Owner'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-accent/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    {lang === 'ar' ? '"الباقة ذهبية فاقت توقعاتي. الدعم الفني متميز والصيانة منتظمة."' : '"The package exceeded my expectations. Top support and regular maintenance."'}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">م.ع</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{lang === 'ar' ? 'محمد العمري' : 'Mohammed Alamri'}</p>
                      <p className="text-sm text-muted-foreground">{lang === 'ar' ? 'مدير شركة' : 'Company Manager'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              {lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
            </h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-3">{lang === 'ar' ? 'كم يستغرق تركيب النظام؟' : 'How long does installation take?'}</h3>
                  <p className="text-muted-foreground">{lang === 'ar' ? 'يستغرق التركيب عادة 2-4 ساعات حسب حجم النظام، ويتم خلال يوم واحد.' : 'Usually takes 2-4 hours depending on system size, finished in one day.'}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-3">{lang === 'ar' ? 'هل يمكنني مراقبة النظام من خارج المملكة؟' : 'Can I monitor the system from abroad?'}</h3>
                  <p className="text-muted-foreground">{lang === 'ar' ? 'نعم، جميع أنظمتنا تدعم المراقبة عن بعد من أي مكان في العالم عبر تطبيق الجوال.' : 'Yes, all our systems support remote monitoring globally.'}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {lang === 'ar' ? 'لا تدع أمان عائلتك ينتظر!' : 'Don\'t let your family\'s safety wait!'}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
              {lang === 'ar' ? 'احصل على نظام أمان متكامل اليوم واستمتع براحة البال والحماية الشاملة لمنزلك وعائلتك.' : 'Get a complete security system today and enjoy peace of mind and comprehensive protection for your home.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8 py-4 border-2 border-white bg-transparent text-white hover:bg-white hover:text-secondary hover:text-primary transition-colors">
                <Link href={quoteUrl}>
                  {lang === 'ar' ? 'اطلب عرض سعر مجاني' : 'Request a Free Quote'}
                </Link>
              </Button>
              <Button asChild size="lg" className="px-8 py-4 border-2 border-white bg-transparent text-white hover:bg-white hover:text-secondary hover:text-primary transition-colors">
                <Link href={`/${lang}/contact`} className="flex items-center gap-2 text-base">
                  <Phone className="w-5 h-5" />
                  {lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                </Link>
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/60 mt-6 font-bold">
              {lang === 'ar' ? '✓ استشارة مجانية ✓ تركيب احترافي ✓ ضمان شامل ✓ دعم 24/7' : '✓ Free Consultation ✓ Pro Install ✓ Comprehensive Warranty ✓ 24/7 Support'}
            </p>
          </div>
        </div>
      </section>

      {/* Other Packages */}
      {otherPackages.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">{lang === 'ar' ? 'باقات أخرى قد تهمك' : 'Other Packages You May Like'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPackages.map((otherPkg) => (
                <Card key={otherPkg.slug} className="overflow-hidden hover:shadow-lg transition-shadow pt-0">
                  <div className="relative h-40 bg-muted">
                    {otherPkg.featuredImage?.node?.sourceUrl && (
                      <img src={safeImageUrl(otherPkg.featuredImage.node.sourceUrl)} alt={otherPkg.title} className="absolute inset-0 w-full h-full object-cover" />
                    )}
                    <div className={`absolute inset-0 bg-primary opacity-40`} />
                    <div className="absolute inset-0 flex items-center justify-center text-center p-2">
                      <h3 className="text-xl font-bold text-white shadow-sm">{otherPkg.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4 flex flex-col justify-between" style={{ minHeight: '140px' }}>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                       {(otherPkg.content || '').replace(/<[^>]*>?/gm, "").trim()}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-bold text-primary text-sm">
                        {otherPkg.packagePrice && !isNaN(Number(otherPkg.packagePrice)) && Number(otherPkg.packagePrice) > 0 ? `${otherPkg.packagePrice} ${lang === 'ar' ? 'ريال' : 'SAR'}` : (lang === 'ar' ? 'حسب الطلب' : 'On Request')}
                      </span>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/${lang}/packages/${otherPkg.slug}`}>{lang === 'ar' ? 'التفاصيل' : 'Details'}</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  )
}
