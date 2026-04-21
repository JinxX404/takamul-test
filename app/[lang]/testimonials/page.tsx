import { Metadata } from "next"
import Link from "next/link"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ArrowLeft } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const title =
    lang === "ar" ? "آراء العملاء | تكامل - حلول أمنية متكاملة" : "Testimonials | Takamul Security";
  const description =
    lang === "ar"
      ? "اقرأ آراء وتجارب عملائنا مع خدماتنا ومنتجاتنا الأمنية."
      : "Read customer experiences with our security services and products.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://takamulsecurity.sa/${lang}/testimonials`,
      languages: {
        ar: "https://takamulsecurity.sa/ar/testimonials",
        en: "https://takamulsecurity.sa/en/testimonials",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://takamulsecurity.sa/${lang}/testimonials`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const testimonials = [
  {
    name: "أحمد الغامدي",
    role: "صاحب فيلا",
    location: "الرياض",
    rating: 5,
    text: "منذ تركيب نظام تكامل الأمني، شعرت بتحسن كبير في مستوى الأمان في منزلي. الفريق محترف جداً والخدمة ممتازة. أنصح بهم بشدة لكل من يبحث عن حلول أمنية موثوقة.",
    date: "منذ 3 أشهر",
    project: "نظام مراقبة منزلي",
  },
  {
    name: "فيصل بن جديد",
    role: "مدير شركة",
    location: "جدة",
    rating: 5,
    text: "تعاملنا مع تكامل لتأمين مقر شركتنا والمستودعات. النظام يعمل بشكل ممتاز والدعم الفني سريع الاستجابة. شكراً لفريق تكامل على الاحترافية العالية.",
    date: "منذ 6 أشهر",
    project: "نظام أمني للشركات",
  },
  {
    name: "محمد العتيبي",
    role: "صاحب محل",
    location: "الرياض",
    rating: 5,
    text: "خدمة ممتازة وأسعار تنافسية. تم تركيب الكاميرات في محلي خلال يوم واحد فقط. جودة الصورة رائعة وأستطيع المراقبة من جوالي في أي وقت. شكراً تكامل!",
    date: "منذ شهر",
    project: "كاميرات مراقبة للمحل",
  },
  {
    name: "سارة الحربي",
    role: "ربة منزل",
    location: "الدمام",
    rating: 5,
    text: "كنت قلقة من عملية التركيب لكن الفريق كان محترفاً جداً ونظيفاً في العمل. الآن أشعر بأمان أكبر وأستطيع مراقبة المنزل حتى وأنا في العمل.",
    date: "منذ 4 أشهر",
    project: "نظام أمان منزلي",
  },
  {
    name: "عبدالله القحطاني",
    role: "مدير عقارات",
    location: "الرياض",
    rating: 5,
    text: "قمنا بتركيب أنظمة تكامل في 5 مجمعات سكنية. الجودة ممتازة والأسعار مناسبة. التعامل معهم سهل ومريح. أنصح بهم لجميع مشاريع العقارات.",
    date: "منذ 8 أشهر",
    project: "أنظمة مراقبة للمجمعات",
  },
  {
    name: "نورة السبيعي",
    role: "صاحبة حضانة",
    location: "جدة",
    rating: 5,
    text: "ركبنا نظام مراقبة في الحضانة للاطمئنان على الأطفال. أولياء الأمور سعداء جداً بإمكانية متابعة أطفالهم. شكراً تكامل على الحل الرائع.",
    date: "منذ 5 أشهر",
    project: "نظام مراقبة للحضانة",
  },
  {
    name: "خالد المطيري",
    role: "صاحب مصنع",
    location: "الرياض",
    rating: 4,
    text: "نظام متكامل وشامل لمصنعنا. الكاميرات الحرارية ممتازة للمراقبة الليلية. الدعم الفني متعاون جداً ويستجيب بسرعة.",
    date: "منذ 7 أشهر",
    project: "نظام أمني صناعي",
  },
  {
    name: "ريم الشمري",
    role: "طبيبة",
    location: "الدمام",
    rating: 5,
    text: "ركبت نظام أمان في عيادتي وأنا راضية تماماً. الجودة عالية والتطبيق سهل الاستخدام. أشكر فريق تكامل على الخدمة المتميزة.",
    date: "منذ شهرين",
    project: "نظام أمان للعيادة",
  },
]

const stats = [
  { number: "98%", label: "نسبة رضا العملاء" },
  { number: "4.9", label: "متوسط التقييم" },
  { number: "+300", label: "تقييم إيجابي" },
]

export default function TestimonialsPage() {
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
                آراء عملائنا
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
                نفخر بثقة عملائنا بنا. اقرأ تجاربهم الحقيقية مع خدماتنا ومنتجاتنا.
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mt-10">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-accent">{stat.number}</p>
                    <p className="text-sm text-primary-foreground/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    {/* Quote Icon */}
                    <Quote className="h-8 w-8 text-accent/30 mb-4" />
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? "fill-accent text-accent" : "text-muted"}`} 
                        />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-foreground/80 leading-relaxed mb-4">
                      {`"${testimonial.text}"`}
                    </p>

                    {/* Project Badge */}
                    <p className="text-xs text-accent bg-accent/10 rounded-full px-3 py-1 inline-block mb-4">
                      {testimonial.project}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role} - {testimonial.location}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                انضم إلى عملائنا السعداء
              </h2>
              <p className="text-muted-foreground mb-8">
                احصل على نظام أمني متكامل واستمتع بخدمة تفوق توقعاتك.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/quote" className="gap-2">
                    احجز زيارة مجانية
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/packages">تصفح الباقات</Link>
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
