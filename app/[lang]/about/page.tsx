"use client"

import { Shield, Users, Award, Target, CheckCircle, Building2, Lightbulb, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { number: "500+", label: "عميل راضٍ" },
  { number: "1000+", label: "مشروع منجز" },
  { number: "10+", label: "سنوات خبرة" },
  { number: "50+", label: "فني متخصص" },
]

const values = [
  {
    icon: Shield,
    title: "الجودة",
    description: "نلتزم بأعلى معايير الجودة في جميع منتجاتنا وخدماتنا",
  },
  {
    icon: Users,
    title: "العملاء أولاً",
    description: "رضا العملاء هو أولويتنا القصوى ونسعى دائماً لتجاوز توقعاتهم",
  },
  {
    icon: Lightbulb,
    title: "الابتكار",
    description: "نواكب أحدث التقنيات ونقدم حلولاً مبتكرة تلبي احتياجات السوق",
  },
  {
    icon: Heart,
    title: "النزاهة",
    description: "نعمل بشفافية ومصداقية في جميع تعاملاتنا مع العملاء والشركاء",
  },
]

const milestones = [
  { year: "2014", title: "تأسيس الشركة", description: "بدأنا رحلتنا في مجال الحلول الأمنية" },
  { year: "2016", title: "التوسع الإقليمي", description: "افتتاح فروع جديدة في المنطقة الشرقية" },
  { year: "2018", title: "شراكات استراتيجية", description: "توقيع شراكات مع كبرى الشركات العالمية" },
  { year: "2020", title: "الريادة التقنية", description: "إطلاق حلول الذكاء الاصطناعي للأمن" },
  { year: "2022", title: "التميز والجوائز", description: "حصولنا على شهادات الجودة العالمية" },
  { year: "2024", title: "النمو المستمر", description: "خدمة أكثر من 500 عميل في المملكة" },
]

// const team = [
//   {
//     name: "أحمد الفهد",
//     role: "المدير التنفيذي",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
//   },
//   {
//     name: "محمد العتيبي",
//     role: "مدير العمليات",
//     image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
//   },
//   {
//     name: "خالد الدوسري",
//     role: "المدير الفني",
//     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
//   },
//   {
//     name: "سعود القحطاني",
//     role: "مدير المبيعات",
//     image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face",
//   },
// ]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">من نحن</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              شركة تكامل للحلول الأمنية
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              نحن شركة رائدة في مجال الحلول الأمنية المتكاملة، نقدم أحدث التقنيات وأفضل الخدمات لحماية منازلكم ومنشآتكم التجارية
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">قصتنا</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  تأسست شركة تكامل للحلول الأمنية عام 2014 برؤية واضحة لتقديم أفضل الحلول الأمنية المتكاملة في المملكة العربية السعودية. بدأنا رحلتنا بفريق صغير من المتخصصين الشغوفين بالتكنولوجيا والأمن.
                </p>
                <p>
                  على مدار السنوات، نمت الشركة لتصبح واحدة من الشركات الرائدة في مجال الحلول الأمنية، حيث نخدم مئات العملاء من المنازل والشركات والمؤسسات الحكومية.
                </p>
                <p>
                  نفخر بشراكاتنا الاستراتيجية مع أكبر الشركات العالمية في مجال الأمن والمراقبة، مما يتيح لنا تقديم أحدث التقنيات وأفضل المنتجات لعملائنا.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/How_we_work3.jpeg"
                alt="فريق تكامل"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm">سنوات من التميز</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">رؤيتنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  أن نكون الشركة الرائدة في تقديم الحلول الأمنية المتكاملة في المملكة العربية السعودية والخليج العربي، من خلال تبني أحدث التقنيات وتقديم خدمات استثنائية تفوق توقعات العملاء.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-accent/20 bg-accent/5">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">مهمتنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  توفير حلول أمنية متكاملة وموثوقة تحمي الأرواح والممتلكات، من خلال فريق متخصص ومنتجات عالية الجودة وخدمة عملاء متميزة، مع الالتزام بأعلى معايير الجودة والاحترافية.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">قيمنا</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نلتزم بمجموعة من القيم الأساسية التي توجه عملنا وتحدد هويتنا
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">رحلتنا</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              مراحل مهمة في مسيرة نمونا وتطورنا
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute right-8 top-0 bottom-0 w-0.5 bg-primary/20" />
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex gap-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 z-10">
                      {milestone.year}
                    </div>
                    <Card className="flex-1">
                      <CardContent className="p-4">
                        <h3 className="font-bold text-foreground mb-1">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">فريق القيادة</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              فريق من الخبراء المتخصصين يقودون الشركة نحو التميز
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">شهاداتنا واعتماداتنا</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نفخر بحصولنا على أهم الشهادات والاعتمادات العالمية
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["ISO 9001:2015", "ISO 27001", "شهادة الجودة السعودية", "عضوية غرفة التجارة"].map((cert, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-bold text-foreground">{cert}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">هل أنت مستعد للبدء؟</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            تواصل معنا اليوم للحصول على استشارة مجانية وعرض سعر مخصص لاحتياجاتك
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/quote">اطلب عرض سعر</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
              <Link href="/contact">تواصل معنا</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
