import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Home, 
  Building2, 
  Layers, 
  Check, 
  ArrowLeft, 
  Shield,
  Camera,
  Bell,
  Lock,
  Wifi,
  Monitor,
  Phone
} from "lucide-react"

const services = {
  home: {
    icon: Home,
    title: "أنظمة المنازل",
    subtitle: "حماية شاملة لمنزلك وعائلتك",
    description: "نوفر لك أحدث أنظمة المراقبة والإنذار الذكية المصممة خصيصاً للمنازل، لتمنحك راحة البال وتحافظ على أمان عائلتك على مدار الساعة.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    problem: "كثير من المنازل تفتقر لأنظمة أمان فعالة، مما يجعلها عرضة للسرقة والاختراق. الأنظمة التقليدية قد لا توفر الحماية الكافية أو المراقبة في الوقت الحقيقي.",
    solution: "نقدم أنظمة مراقبة ذكية متكاملة تجمع بين الكاميرات عالية الدقة وأجهزة الإنذار والأقفال الذكية، مع إمكانية المراقبة والتحكم عن بعد من أي مكان عبر تطبيق الجوال.",
    features: [
      {
        icon: Camera,
        title: "كاميرات مراقبة HD/4K",
        description: "كاميرات داخلية وخارجية بدقة عالية مع رؤية ليلية واضحة",
      },
      {
        icon: Bell,
        title: "أنظمة إنذار ذكية",
        description: "أجهزة استشعار للحركة والأبواب والنوافذ مع تنبيهات فورية",
      },
      {
        icon: Lock,
        title: "أقفال إلكترونية",
        description: "أقفال ذكية ببصمة الإصبع أو الرمز مع سجل للدخول والخروج",
      },
      {
        icon: Wifi,
        title: "تحكم عن بعد",
        description: "تطبيق جوال للمراقبة والتحكم في جميع الأنظمة من أي مكان",
      },
    ],
    steps: [
      {
        number: "01",
        title: "زيارة ومعاينة",
        description: "نزور منزلك لتقييم احتياجاتك الأمنية وتحديد أفضل المواقع للكاميرات",
      },
      {
        number: "02",
        title: "تصميم النظام",
        description: "نصمم نظاماً مخصصاً يناسب مساحة منزلك وميزانيتك",
      },
      {
        number: "03",
        title: "التركيب الاحترافي",
        description: "فريقنا المتخصص يقوم بتركيب جميع المكونات بدقة واحترافية",
      },
      {
        number: "04",
        title: "التدريب والتشغيل",
        description: "نشرح لك كيفية استخدام النظام ونضمن عمله بشكل مثالي",
      },
    ],
  },
  business: {
    icon: Building2,
    title: "حلول الأعمال",
    subtitle: "أنظمة أمان متطورة للشركات والمحلات",
    description: "حلول أمنية شاملة مصممة لبيئة الأعمال، توفر حماية متكاملة لموظفيك وممتلكاتك وعملائك مع أنظمة تحكم ومراقبة متقدمة.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    problem: "الشركات والمحلات التجارية تواجه تحديات أمنية متعددة من السرقة الداخلية والخارجية إلى إدارة صلاحيات الدخول ومراقبة الموظفين.",
    solution: "نوفر أنظمة متكاملة تشمل المراقبة بالكاميرات الذكية، والتحكم في الدخول، وأنظمة الإنذار المتقدمة، مع تقارير وتحليلات تفصيلية لمساعدتك في إدارة أمن منشأتك بكفاءة.",
    features: [
      {
        icon: Monitor,
        title: "غرف مراقبة مركزية",
        description: "شاشات متعددة للمراقبة المباشرة مع تسجيل مستمر",
      },
      {
        icon: Shield,
        title: "التحكم بالدخول",
        description: "أنظمة بصمة وبطاقات لإدارة صلاحيات الموظفين",
      },
      {
        icon: Bell,
        title: "إنذار الطوارئ",
        description: "أنظمة إنذار للحريق والسرقة مع إشعارات فورية",
      },
      {
        icon: Camera,
        title: "ذكاء اصطناعي",
        description: "كاميرات بتقنية التعرف على الوجوه وتحليل السلوك",
      },
    ],
    steps: [
      {
        number: "01",
        title: "تحليل المتطلبات",
        description: "دراسة شاملة لبيئة العمل وتحديد نقاط الضعف الأمنية",
      },
      {
        number: "02",
        title: "تصميم الحل",
        description: "تصميم نظام متكامل يناسب طبيعة عملك وحجم منشأتك",
      },
      {
        number: "03",
        title: "التركيب والاختبار",
        description: "تركيب احترافي مع اختبارات شاملة لضمان الأداء",
      },
      {
        number: "04",
        title: "التدريب والدعم",
        description: "تدريب فريقك على استخدام النظام مع دعم فني مستمر",
      },
    ],
  },
  integrated: {
    icon: Layers,
    title: "أنظمة متكاملة",
    subtitle: "حلول شاملة للمنشآت الكبيرة",
    description: "نظام أمني موحد يجمع جميع عناصر الحماية في منصة واحدة للمنشآت الكبيرة والمجمعات، مع إدارة مركزية وتحليلات متقدمة.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    problem: "المنشآت الكبيرة تحتاج إلى أنظمة أمنية معقدة ومتعددة، وإدارة هذه الأنظمة بشكل منفصل يؤدي إلى صعوبات في التنسيق وثغرات أمنية.",
    solution: "نقدم منصة موحدة تدمج جميع الأنظمة الأمنية (المراقبة، التحكم بالدخول، الإنذار، الاتصال الداخلي) في واجهة واحدة سهلة الإدارة مع تحليلات بالذكاء الاصطناعي.",
    features: [
      {
        icon: Layers,
        title: "تكامل الأنظمة",
        description: "ربط جميع الأنظمة الأمنية في منصة واحدة",
      },
      {
        icon: Monitor,
        title: "إدارة مركزية",
        description: "لوحة تحكم موحدة لإدارة جميع المواقع والأنظمة",
      },
      {
        icon: Shield,
        title: "حماية متعددة المستويات",
        description: "طبقات متعددة من الحماية مع صلاحيات مخصصة",
      },
      {
        icon: Wifi,
        title: "اتصال سحابي",
        description: "تخزين وإدارة البيانات عبر السحابة بشكل آمن",
      },
    ],
    steps: [
      {
        number: "01",
        title: "استشارة متخصصة",
        description: "فريق خبراء يدرس احتياجاتك ويضع خطة شاملة",
      },
      {
        number: "02",
        title: "هندسة النظام",
        description: "تصميم معماري متكامل يراعي جميع المتطلبات",
      },
      {
        number: "03",
        title: "التنفيذ المرحلي",
        description: "تركيب على مراحل لضمان استمرارية العمل",
      },
      {
        number: "04",
        title: "التشغيل والصيانة",
        description: "تشغيل كامل مع عقد صيانة ودعم شامل",
      },
    ],
  },
}

type ServiceSlug = keyof typeof services

interface PageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lang } = await params
  const service = services[slug as ServiceSlug]
  
  if (!service) {
    return { title: "الخدمة غير موجودة" }
  }

  return {
    title: `${service.title} | تكامل - حلول أمنية متكاملة`,
    description: service.description,
    alternates: {
      canonical: `https://takamulsecurity.sa/${lang}/services/${slug}`,
      languages: {
        ar: `https://takamulsecurity.sa/ar/services/${slug}`,
        en: `https://takamulsecurity.sa/en/services/${slug}`,
      },
    },
    openGraph: {
      title: `${service.title} | تكامل - حلول أمنية متكاملة`,
      description: service.description,
      type: "website",
      url: `https://takamulsecurity.sa/${lang}/services/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | تكامل - حلول أمنية متكاملة`,
      description: service.description,
    },
  }
}

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }))
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = services[slug as ServiceSlug]

  if (!service) {
    notFound()
  }

  const Icon = service.icon

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-primary via-primary/90 to-primary/80" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent">
                  <Icon className="h-7 w-7 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/70">{service.subtitle}</p>
                  <h1 className="text-3xl md:text-4xl font-bold">{service.title}</h1>
                </div>
              </div>
              <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/quote" className="gap-2">
                    اطلب عرض سعر
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link href="/contact" className="gap-2">
                    <Phone className="h-4 w-4" />
                    تواصل معنا
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Problem & Solution */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-destructive mb-4">المشكلة</h3>
                  <p className="text-foreground/80 leading-relaxed">{service.problem}</p>
                </CardContent>
              </Card>
              <Card className="border-accent/20 bg-accent/5">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-accent mb-4">الحل</h3>
                  <p className="text-foreground/80 leading-relaxed">{service.solution}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
              المميزات الرئيسية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/20 mx-auto mb-4">
                      <feature.icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
              خطوات التنفيذ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.steps.map((step, index) => (
                <div key={index} className="relative">
                  {index < service.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-0 w-full h-[2px] bg-border -translate-x-1/2" />
                  )}
                  <div className="relative z-10 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto mb-4">
                      <span className="text-lg font-bold">{step.number}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
              أمثلة على الاستخدام
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 mb-4">
                    <Home className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">المنازل والشقق</h3>
                  <p className="text-sm text-muted-foreground">
                    حماية شاملة للمنازل مع مراقبة المداخل والنوافذ، وإنذار فوري في حالات الطوارئ.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 mb-4">
                    <Building2 className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">المكاتب والشركات</h3>
                  <p className="text-sm text-muted-foreground">
                    إدارة الدخول والخروج للموظفين، وحماية الممتلكات والمعدات الثمينة.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20 mb-4">
                    <Layers className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">المجمعات التجارية</h3>
                  <p className="text-sm text-muted-foreground">
                    مراقبة شاملة للمساحات الكبيرة مع إدارة حركة الزوار والموظفين.
                  </p>
                </CardContent>
              </Card>
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
                احجز زيارة مجانية الآن ودع فريقنا يساعدك في اختيار الحل الأمثل لاحتياجاتك.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/quote">احجز زيارة مجانية</Link>
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
