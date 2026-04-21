import { Metadata } from "next"
import Link from "next/link"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  PenTool,
  Wrench,
  Play,
  ArrowLeft,
  CheckCircle,
  Clock,
  Shield,
  Headphones
} from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const title =
    lang === "ar" ? "كيف نعمل | تكامل - حلول أمنية متكاملة" : "How We Work | Takamul Security";
  const description =
    lang === "ar"
      ? "تعرف على خطوات العمل معنا من المعاينة إلى التركيب والتشغيل."
      : "Learn about our delivery process from site inspection to installation and handover.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://takamulsecurity.sa/${lang}/how-we-work`,
      languages: {
        ar: "https://takamulsecurity.sa/ar/how-we-work",
        en: "https://takamulsecurity.sa/en/how-we-work",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://takamulsecurity.sa/${lang}/how-we-work`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "زيارة ومعاينة",
    subtitle: "الخطوة الأولى",
    description: "نبدأ بزيارة مجانية لموقعك لفهم احتياجاتك الأمنية بشكل كامل.",
    details: [
      "زيارة الموقع من قبل فريق متخصص",
      "تحليل نقاط الضعف الأمنية",
      "تحديد أفضل مواقع الكاميرات والأجهزة",
      "الاستماع لمتطلباتك وتوقعاتك",
      "تقديم استشارة مجانية بدون التزام",
    ],
    duration: "30-60 دقيقة",
    image: "/How_we_work2.jpeg",
  },
  {
    number: "02",
    icon: PenTool,
    title: "تصميم النظام",
    subtitle: "الخطوة الثانية",
    description: "نصمم لك نظاماً أمنياً متكاملاً يناسب متطلباتك وميزانيتك.",
    details: [
      "إعداد مخطط تفصيلي للنظام",
      "اختيار المنتجات المناسبة",
      "تحديد مسارات الأسلاك والتوصيلات",
      "حساب التكلفة الإجمالية",
      "تقديم عرض سعر شفاف ومفصل",
    ],
    duration: "1-3 أيام عمل",
    image: "/How_we_work1.jpeg",
  },
  {
    number: "03",
    icon: Wrench,
    title: "التركيب الاحترافي",
    subtitle: "الخطوة الثالثة",
    description: "فنيون محترفون يقومون بتركيب الأنظمة بأعلى معايير الجودة والدقة.",
    details: [
      "تركيب احترافي من فنيين معتمدين",
      "استخدام أدوات ومعدات متطورة",
      "الالتزام بمعايير السلامة",
      "تركيب أنيق بدون فوضى",
      "اختبار كل مكون على حدة",
    ],
    duration: "يوم واحد للمشاريع الصغيرة",
    image: "/How_we_work3.jpeg",
  },
  {
    number: "04",
    icon: Play,
    title: "التشغيل والتدريب",
    subtitle: "الخطوة الرابعة",
    description: "نختبر النظام بالكامل ونوفر لك تدريباً شاملاً على استخدامه.",
    details: [
      "اختبار شامل لجميع الأنظمة",
      "ضبط إعدادات الكاميرات والتسجيل",
      "تدريب عملي على استخدام التطبيق",
      "شرح جميع الميزات والوظائف",
      "تسليم دليل المستخدم والضمان",
    ],
    duration: "1-2 ساعة",
    image: "/How_we_work4.jpeg",
  },
]

const benefits = [
  {
    icon: Clock,
    title: "سرعة في التنفيذ",
    description: "ننجز المشاريع في أقصر وقت ممكن دون التأثير على الجودة",
  },
  {
    icon: Shield,
    title: "ضمان شامل",
    description: "ضمان على جميع المنتجات والخدمات يصل حتى 5 سنوات",
  },
  {
    icon: Headphones,
    title: "دعم مستمر",
    description: "فريق دعم فني متاح على مدار الساعة لمساعدتك",
  },
  {
    icon: CheckCircle,
    title: "جودة مضمونة",
    description: "نستخدم أفضل المنتجات العالمية ونلتزم بأعلى المعايير",
  },
]

export default function HowWeWorkPage() {
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
                كيف نعمل
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                نتبع منهجية عمل واضحة ومدروسة لضمان تقديم أفضل الحلول الأمنية لك. تعرف على خطوات العمل معنا.
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-24">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "" : ""
                    }`}
                >
                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[400px] rounded-2xl overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                    </div>
                    {/* Step Number */}
                    <div className="absolute -bottom-6 -right-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg">
                      <span className="text-3xl font-bold">{step.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                        <step.icon className="h-6 w-6 text-accent" />
                      </div>
                      <span className="text-sm font-medium text-accent">{step.subtitle}</span>
                    </div>

                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      {step.title}
                    </h2>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {step.description}
                    </p>

                    <ul className="space-y-3 mb-6">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20">
                            <CheckCircle className="h-3 w-3 text-accent" />
                          </div>
                          <span className="text-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary inline-flex">
                      <Clock className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium text-foreground">المدة المتوقعة: {step.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
              لماذا تختار تكامل؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/20 mx-auto mb-4">
                      <benefit.icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                جاهز للبدء؟
              </h2>
              <p className="text-primary-foreground/80 mb-8">
                احجز زيارتك المجانية الآن ودعنا نساعدك في تأمين منزلك أو عملك.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/quote" className="gap-2">
                    احجز زيارة مجانية
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
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
