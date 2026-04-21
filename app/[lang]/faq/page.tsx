import { Metadata } from "next"
import Link from "next/link"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MessageCircle, Phone } from "lucide-react"
import { buildWhatsAppUrl } from "@/lib/config/contact"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const title =
    lang === "ar" ? "الأسئلة الشائعة | تكامل - حلول أمنية متكاملة" : "FAQ | Takamul Security";
  const description =
    lang === "ar"
      ? "إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا ومنتجاتنا الأمنية."
      : "Answers to the most common questions about our security services and products.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://takamulsecurity.sa/${lang}/faq`,
      languages: {
        ar: "https://takamulsecurity.sa/ar/faq",
        en: "https://takamulsecurity.sa/en/faq",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://takamulsecurity.sa/${lang}/faq`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const faqCategories = [
  {
    id: "general",
    title: "أسئلة عامة",
    faqs: [
      {
        question: "ما هي الخدمات التي تقدمها تكامل؟",
        answer: "نقدم مجموعة شاملة من الحلول الأمنية تشمل: كاميرات المراقبة بجميع أنواعها، أنظمة الإنذار ضد السرقة والحريق، أنظمة التحكم بالدخول، الأقفال الذكية، وأنظمة الاتصال الداخلي. كما نوفر خدمات التصميم والتركيب والصيانة.",
      },
      {
        question: "هل تخدمون جميع مناطق المملكة؟",
        answer: "نعم، نقدم خدماتنا في جميع مناطق المملكة العربية السعودية. لدينا فرق عمل في الرياض وجدة والدمام، ويمكننا الوصول إلى أي منطقة أخرى.",
      },
      {
        question: "هل تقدمون استشارات مجانية؟",
        answer: "نعم، نقدم زيارة معاينة واستشارة مجانية بدون أي التزام. سيقوم فريقنا بزيارة موقعك وتقييم احتياجاتك وتقديم عرض سعر مفصل.",
      },
    ],
  },
  {
    id: "products",
    title: "المنتجات والأسعار",
    faqs: [
      {
        question: "ما هي العلامات التجارية التي تتعاملون معها؟",
        answer: "نتعامل مع أفضل العلامات التجارية العالمية في مجال الأنظمة الأمنية مثل: Hikvision، Dahua، Axis، Samsung، وغيرها من العلامات المعروفة بجودتها وموثوقيتها.",
      },
      {
        question: "كيف يتم تحديد السعر؟",
        answer: "يعتمد السعر على عدة عوامل: نوع وعدد الكاميرات المطلوبة، مساحة الموقع، نوع التركيب المطلوب، والخدمات الإضافية مثل أنظمة الإنذار والتحكم بالدخول. نقدم عروض أسعار مفصلة وشفافة بعد المعاينة.",
      },
      {
        question: "هل يمكن شراء المنتجات بدون التركيب؟",
        answer: "نعم، يمكنك شراء المنتجات فقط. لكننا ننصح بالاستفادة من خدمة التركيب الاحترافي لضمان أفضل أداء وللحصول على الضمان الكامل.",
      },
      {
        question: "هل تتوفر خدمة التقسيط؟",
        answer: "نعم، نوفر خدمة التقسيط المريح بالتعاون مع عدة جهات تمويلية. تواصل معنا لمعرفة التفاصيل والشروط.",
      },
    ],
  },
  {
    id: "installation",
    title: "التركيب والضمان",
    faqs: [
      {
        question: "كم تستغرق عملية التركيب؟",
        answer: "تعتمد مدة التركيب على حجم المشروع. المشاريع المنزلية الصغيرة (4-8 كاميرات) عادة تتم في يوم واحد. المشاريع الكبيرة قد تستغرق عدة أيام حسب عدد الكاميرات وتعقيد النظام.",
      },
      {
        question: "ما هي مدة الضمان؟",
        answer: "نقدم ضمان يتراوح من سنة إلى 5 سنوات حسب المنتج والباقة المختارة. يشمل الضمان جميع الأعطال الصناعية ولا يشمل الأضرار الناتجة عن سوء الاستخدام أو الكوارث الطبيعية.",
      },
      {
        question: "هل تقدمون خدمات صيانة؟",
        answer: "نعم، نقدم عقود صيانة دورية تشمل: الفحص الدوري، التنظيف، تحديث البرمجيات، وإصلاح الأعطال. كما نوفر خدمة صيانة طارئة على مدار الساعة.",
      },
      {
        question: "هل التركيب يحتاج تكسير الجدران؟",
        answer: "في معظم الحالات، نستخدم تقنيات التركيب الحديثة التي تقلل الحاجة للتكسير. نستخدم مسارات الكيبلات الموجودة أو نضيف مسارات جديدة بشكل أنيق. في حال الحاجة لأي أعمال بناء، نخبرك مسبقاً.",
      },
    ],
  },
  {
    id: "technical",
    title: "أسئلة تقنية",
    faqs: [
      {
        question: "هل يمكنني مراقبة الكاميرات من جوالي؟",
        answer: "نعم، جميع أنظمتنا تدعم المراقبة عن بعد عبر تطبيقات الجوال (iOS و Android). يمكنك مشاهدة البث المباشر، تصفح التسجيلات، واستقبال التنبيهات من أي مكان في العالم.",
      },
      {
        question: "كم مدة التخزين المتاحة للتسجيلات؟",
        answer: "تعتمد مدة التخزين على سعة القرص الصلب المستخدم وعدد الكاميرات وجودة التسجيل. عادة نوفر تخزين يتراوح من 7 أيام إلى 90 يوم أو أكثر. يمكن أيضاً استخدام التخزين السحابي للاحتفاظ بالتسجيلات لفترات أطول.",
      },
      {
        question: "هل تعمل الكاميرات في الليل؟",
        answer: "نعم، جميع كاميراتنا مزودة بتقنية الرؤية الليلية بالأشعة تحت الحمراء. بعض الموديلات توفر رؤية ليلية ملونة باستخدام تقنيات الإضاءة المتقدمة.",
      },
      {
        question: "ماذا يحدث عند انقطاع الكهرباء أو الإنترنت؟",
        answer: "أنظمتنا مصممة للتعامل مع هذه الحالات: عند انقطاع الكهرباء، يستمر التسجيل على البطارية الاحتياطية (إن وجدت) أو يستأنف تلقائياً عند عودة الكهرباء. عند انقطاع الإنترنت، يستمر التسجيل محلياً ويتم المزامنة عند عودة الاتصال.",
      },
    ],
  },
  {
    id: "support",
    title: "الدعم الفني",
    faqs: [
      {
        question: "كيف يمكنني التواصل مع الدعم الفني؟",
        answer: "يمكنك التواصل معنا عبر: الهاتف على الرقم 0501942420، واتساب، البريد الإلكتروني، أو من خلال نموذج الاتصال في الموقع. فريق الدعم متاح 24/7 للحالات الطارئة.",
      },
      {
        question: "هل تقدمون تدريب على استخدام النظام؟",
        answer: "نعم، نقدم تدريباً شاملاً مجانياً عند التركيب يشمل: كيفية استخدام التطبيق، تصفح التسجيلات، ضبط الإعدادات، والتعامل مع التنبيهات. كما نوفر دليل مستخدم مفصل.",
      },
      {
        question: "ماذا أفعل إذا واجهت مشكلة في النظام؟",
        answer: "أولاً، تحقق من دليل المستخدم أو قسم الأسئلة الشائعة. إذا استمرت المشكلة، تواصل مع الدعم الفني وسنساعدك في حلها. في حالات الأعطال، يمكن لفريقنا زيارة موقعك خلال 24-48 ساعة.",
      },
    ],
  },
]

export default function FAQPage() {
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
                الأسئلة الشائعة
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا ومنتجاتنا. إذا لم تجد إجابة سؤالك، لا تتردد في التواصل معنا.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {faqCategories.map((category) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="px-4 py-2 rounded-full bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium"
                >
                  {category.title}
                </a>
              ))}
            </div>

            {/* FAQ Sections */}
            <div className="max-w-3xl mx-auto space-y-12">
              {faqCategories.map((category) => (
                <div key={category.id} id={category.id}>
                  <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">
                    {category.title}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.id}-${index}`}
                        className="border border-border rounded-lg px-4 data-[state=open]:bg-secondary/50"
                      >
                        <AccordionTrigger className="hover:no-underline text-right">
                          <span className="font-medium text-foreground">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                لم تجد إجابة سؤالك؟
              </h2>
              <p className="text-muted-foreground mb-8">
                فريقنا جاهز لمساعدتك والإجابة على جميع استفساراتك.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <a 
                    href={buildWhatsAppUrl("لدي استفسار")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    تواصل عبر واتساب
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact" className="gap-2">
                    <Phone className="h-4 w-4" />
                    صفحة التواصل
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
