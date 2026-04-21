import { Metadata } from "next"
import Link from "next/link"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { 
  Home, 
  Building2, 
  Layers, 
  Camera, 
  Shield, 
  Wifi, 
  Bell, 
  Lock,
  Monitor,
  ArrowLeft,
  Check
} from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const title = lang === "ar" ? "الخدمات | تكامل - حلول أمنية متكاملة" : "Services | Takamul Security";
  const description =
    lang === "ar"
      ? "نقدم حلول أمنية متكاملة للمنازل والأعمال والمنشآت الكبيرة مع أحدث التقنيات والأنظمة."
      : "Integrated security solutions for homes, businesses, and large facilities.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://takamulsecurity.sa/${lang}/services`,
      languages: {
        ar: "https://takamulsecurity.sa/ar/services",
        en: "https://takamulsecurity.sa/en/services",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://takamulsecurity.sa/${lang}/services`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const serviceCategories = [
  {
    id: "home",
    icon: Home,
    title: "أنظمة المنازل",
    description: "حماية شاملة لمنزلك وعائلتك مع أحدث أنظمة المراقبة والإنذار الذكية.",
    image: "/1.jpeg",
    features: [
      "كاميرات مراقبة داخلية وخارجية",
      "أنظمة إنذار ضد السرقة",
      "أقفال ذكية وتحكم عن بعد",
      "مراقبة عبر الجوال على مدار الساعة",
    ],
    services: [
      { icon: Camera, name: "كاميرات مراقبة HD/4K" },
      { icon: Bell, name: "أنظمة إنذار ذكية" },
      { icon: Lock, name: "أقفال إلكترونية" },
      { icon: Wifi, name: "شبكات لاسلكية آمنة" },
    ],
  },
  {
    id: "business",
    icon: Building2,
    title: "حلول الأعمال",
    description: "أنظمة أمان متطورة مصممة خصيصاً للشركات والمحلات التجارية.",
    image: "/2.jpeg",
    features: [
      "أنظمة مراقبة متعددة النقاط",
      "التحكم في الدخول والخروج",
      "أنظمة إنذار الحريق",
      "تقارير وتحليلات متقدمة",
    ],
    services: [
      { icon: Monitor, name: "غرف مراقبة مركزية" },
      { icon: Shield, name: "أنظمة التحكم بالدخول" },
      { icon: Bell, name: "إنذار الحريق والطوارئ" },
      { icon: Camera, name: "كاميرات بتقنية الذكاء الاصطناعي" },
    ],
  },
  {
    id: "integrated",
    icon: Layers,
    title: "أنظمة متكاملة",
    description: "حلول شاملة للمنشآت الكبيرة تجمع بين جميع أنظمة الأمان في منصة واحدة.",
    image: "/3.jpeg",
    features: [
      "تكامل جميع الأنظمة الأمنية",
      "إدارة مركزية موحدة",
      "تحليلات بالذكاء الاصطناعي",
      "دعم فني متخصص 24/7",
    ],
    services: [
      { icon: Layers, name: "تكامل الأنظمة" },
      { icon: Monitor, name: "لوحات تحكم مركزية" },
      { icon: Shield, name: "حماية متعددة المستويات" },
      { icon: Wifi, name: "اتصال سحابي آمن" },
    ],
  },
]

export default function ServicesPage() {
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
                خدماتنا الأمنية
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                نقدم مجموعة شاملة من الحلول الأمنية المتكاملة التي تناسب جميع احتياجاتك سواء كنت تبحث عن حماية منزلك أو شركتك أو منشأتك.
              </p>
            </div>
          </div>
        </section>

        {/* Services Categories */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {serviceCategories.map((category, index) => (
                <div 
                  key={category.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`relative ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative h-[400px] rounded-2xl overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
                    </div>
                    <div className="absolute -bottom-6 -right-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg">
                      <category.icon className="h-10 w-10" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      {category.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {category.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3 mb-6">
                      {category.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20">
                            <Check className="h-4 w-4 text-accent" />
                          </div>
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Services Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {category.services.map((service, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                          <service.icon className="h-5 w-5 text-accent" />
                          <span className="text-sm font-medium text-foreground">{service.name}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <Button asChild>
                        <Link href={`/services/${category.id}`} className="gap-2">
                          استكشف التفاصيل
                          <ArrowLeft className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/quote">اطلب عرض سعر</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                لست متأكداً من الخدمة المناسبة لك؟
              </h2>
              <p className="text-muted-foreground mb-8">
                فريقنا المتخصص جاهز لمساعدتك في اختيار الحل الأمني الأمثل لاحتياجاتك.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/quote">احجز زيارة مجانية</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">تواصل معنا</Link>
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
