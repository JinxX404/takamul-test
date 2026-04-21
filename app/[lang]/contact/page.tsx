"use client"

import { useState } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react"
import { CONTACT_INFO, buildWhatsAppUrl } from "@/lib/config/contact"

const contactInfo = [
  {
    icon: Phone,
    title: "اتصل بنا",
    details: [CONTACT_INFO.phone],
    action: `tel:${CONTACT_INFO.phone}`,
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    details: [CONTACT_INFO.email],
    action: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: MapPin,
    title: "العنوان",
    details: [CONTACT_INFO.location.ar],
    action: CONTACT_INFO.mapUrl,
  },
  {
    icon: Clock,
    title: "ساعات العمل",
    details: ["السبت - الخميس: 9 ص - 9 م", "الجمعة: مغلق"],
    action: null,
  },
]

export default function ContactPage() {
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const buildContactMessage = () => {
    const lines = [
      "طلب تواصل جديد من موقع تكامل",
      "─────────────────────────",
      `الاسم: ${fullName}`,
      `الجوال: ${phone}`,
      `البريد: ${email || "غير محدد"}`,
      `الموضوع: ${subject}`,
      "─────────────────────────",
      `الرسالة:\n${message}`,
    ]
    return `\u202B${lines.join("\n")}\u202C`
  }

  const canSend =
    fullName.trim() &&
    phone.trim() &&
    subject.trim() &&
    message.trim()

  const handleSendWhatsApp = () => {
    if (!canSend) return
    window.open(buildWhatsAppUrl(buildContactMessage()), "_blank", "noopener,noreferrer")
  }

  const handleSendEmail = () => {
    if (!canSend) return
    const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(buildContactMessage())}`
    window.location.href = mailtoUrl
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
                تواصل معنا
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                نحن هنا لمساعدتك. تواصل معنا عبر أي من القنوات التالية وسنرد عليك في أقرب وقت.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-16 relative z-20">
              {contactInfo.map((info) => (
                <Card key={info.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 mx-auto mb-4">
                      <info.icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, index) => (
                        <p key={index} className="text-sm text-muted-foreground">
                          {info.action && index === 0 ? (
                            <a href={info.action} className="hover:text-accent transition-colors">
                              {detail}
                            </a>
                          ) : (
                            detail
                          )}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  أرسل لنا رسالة
                </h2>

                  <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                          الاسم الكامل
                        </label>
                        <Input
                          id="name"
                          placeholder="أدخل اسمك"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-foreground">
                          رقم الجوال
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="05xxxxxxxx"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        البريد الإلكتروني
                      </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@email.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground">
                        الموضوع
                      </label>
                        <Input
                          id="subject"
                          placeholder="موضوع الرسالة"
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        />
                      </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        الرسالة
                      </label>
                        <Textarea
                          id="message"
                          placeholder="اكتب رسالتك هنا..."
                          rows={5}
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Button
                        type="button"
                        size="lg"
                        className="w-full gap-2 bg-[#25D366] hover:bg-[#20BA5C] text-white"
                        onClick={handleSendWhatsApp}
                        disabled={!canSend}
                      >
                        <MessageCircle className="h-4 w-4" />
                        إرسال عبر واتساب
                      </Button>
                      <Button
                        type="button"
                        size="lg"
                        variant="outline"
                        className="w-full gap-2"
                        onClick={handleSendEmail}
                        disabled={!canSend}
                      >
                        <Mail className="h-4 w-4" />
                        إرسال عبر البريد
                      </Button>
                    </div>
                  </form>
              </div>

              {/* Map & WhatsApp */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    موقعنا
                  </h2>
                  <div className="relative h-[300px] rounded-xl overflow-hidden bg-muted">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3575.4526685160416!2d50.155555!3d26.355555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49e8ba31367097%3A0xc07a8286a03975fa!2sIndustrial%20Area%2C%20Dammam%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="grayscale"
                    />
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <Card className="bg-[#25D366]/10 border-[#25D366]/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          تواصل عبر واتساب
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          للرد السريع، تواصل معنا مباشرة عبر واتساب
                        </p>
                        <Button asChild className="bg-[#25D366] hover:bg-[#20BA5C]">
                          <a
                            href={buildWhatsAppUrl("مرحباً، أريد الاستفسار عن خدماتكم")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gap-2"
                          >
                            <MessageCircle className="h-4 w-4" />
                            ابدأ المحادثة
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <WhatsAppButton />
    </>
  )
}
