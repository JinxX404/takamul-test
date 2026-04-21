"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  CheckCircle,
  MessageCircle,
  Phone,
  Home,
  Building2,
  Store,
  Factory,
  ChevronLeft,
  Package,
  ShoppingBag,
} from "lucide-react";
import {
  buildWhatsAppMessage,
  buildEmailBody,
  buildQuoteEmailSubject,
  type QuoteContext,
  type QuoteFormData,
} from "@/lib/quote/quote";
import { buildWhatsAppUrl } from "@/lib/config/contact";
import { CONTACT_INFO } from "@/lib/config/contact";

const projectTypes = [
  { id: "منزل", label: "منزل", icon: Home },
  { id: "شقة", label: "شقة", icon: Home },
  { id: "فيلا", label: "فيلا", icon: Home },
  { id: "مكتب", label: "مكتب", icon: Building2 },
  { id: "محل تجاري", label: "محل تجاري", icon: Store },
  { id: "شركة", label: "شركة", icon: Building2 },
  { id: "مستودع", label: "مستودع", icon: Factory },
  { id: "أخرى", label: "أخرى", icon: Building2 },
];

const services = [
  { id: "كاميرات مراقبة", label: "كاميرات مراقبة" },
  { id: "أنظمة إنذار", label: "أنظمة إنذار" },
  { id: "التحكم بالدخول", label: "التحكم بالدخول" },
  { id: "شبكات واتصالات", label: "شبكات واتصالات" },
  { id: "سنترالات", label: "سنترالات" },
  { id: "غيرها", label: "غيرها" },
];

function QuoteFormInner() {
  const searchParams = useSearchParams();

  // Parse context from URL query params
  const context: QuoteContext = {
    type: (searchParams.get("type") as QuoteContext["type"]) || "general",
    name: searchParams.get("name") || "",
    slug: searchParams.get("slug") || undefined,
    price: searchParams.get("price") || undefined,
    salePrice: searchParams.get("salePrice") || undefined,
    category: searchParams.get("category") || undefined,
    badges: searchParams.get("badges")
      ? searchParams.get("badges")!.split("|").filter(Boolean)
      : undefined,
  };

  const hasContext = context.type !== "general" && !!context.name;

  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [sentVia, setSentVia] = useState<"whatsapp" | "email" | null>(null);
  const [selectedType, setSelectedType] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [notes, setNotes] = useState("");

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  const buildPayload = () => {
    const formData: QuoteFormData = {
      fullName,
      phone,
      email,
      city,
      district,
      projectType: selectedType,
      services: selectedServices,
      notes,
    };
    return {
      formData,
      whatsappMessage: buildWhatsAppMessage(context, formData),
      emailBody: buildEmailBody(context, formData),
      emailSubject: buildQuoteEmailSubject(context),
    };
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || selectedServices.length === 0) return;

    setFormState("submitting");
    setSentVia("whatsapp");
    const { whatsappMessage } = buildPayload();
    const url = buildWhatsAppUrl(whatsappMessage);

    // Small delay for UX feedback, then open WhatsApp
    setTimeout(() => {
      window.open(url, "_blank");
      setFormState("success");
    }, 600);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || selectedServices.length === 0) return;

    setFormState("submitting");
    setSentVia("email");
    const { emailBody, emailSubject } = buildPayload();
    const url = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    setTimeout(() => {
      window.location.href = url;
      setFormState("success");
    }, 300);
  };

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
                طلب عرض سعر
              </h1>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                {hasContext
                  ? `أكمل بياناتك وسنتواصل معك فوراً عبر واتساب بتفاصيل ${context.type === "product" ? "المنتج" : "الباقة"}.`
                  : "املأ النموذج وسيتواصل معك أحد مستشارينا خلال 24 ساعة."}
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Form */}
              <div className="lg:col-span-2">
                {formState === "success" ? (
                  <Card className="border-accent">
                    <CardContent className="pt-6 text-center py-16">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 mx-auto mb-6">
                        <MessageCircle className="h-10 w-10 text-green-500" />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground mb-4">
                        {sentVia === "email" ? "تم فتح البريد الإلكتروني!" : "تم فتح واتساب!"}
                      </h2>
                      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        {sentVia === "email"
                          ? "تم إنشاء رسالة طلب عرض السعر تلقائياً. أرسلها عبر بريدك وسيتواصل معك فريقنا في أقرب وقت."
                          : "تم إنشاء رسالتك تلقائياً. أرسلها عبر واتساب وسيتواصل معك فريقنا في أقرب وقت."}
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <Button onClick={() => setFormState("idle")}>
                          إرسال طلب آخر
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href="/">العودة للرئيسية</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <form className="space-y-8">

                    {/* Context Card (Product/Package Summary) */}
                    {hasContext && (
                      <Card className="border-accent/30 bg-accent/5">
                        <CardContent className="p-5 flex items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                            {context.type === "product" ? (
                              <ShoppingBag className="h-5 w-5" />
                            ) : (
                              <Package className="h-5 w-5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">
                              {context.type === "product" ? "المنتج المختار" : "الباقة المختارة"}
                            </p>
                            <p className="font-bold text-foreground text-lg truncate">{context.name}</p>
                            {context.category && (
                              <p className="text-sm text-muted-foreground mt-0.5">{context.category}</p>
                            )}
                            {context.badges && context.badges.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {context.badges.map((b, i) => (
                                  <Badge key={i} variant="outline" className="text-xs border-accent/40 text-accent">
                                    {b}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          {/* Price */}
                          <div className="text-left shrink-0">
                            {context.salePrice ? (
                              <>
                                <p className="text-xl font-bold text-primary">{context.salePrice} <span className="text-xs">ر.س</span></p>
                                <p className="text-xs text-muted-foreground line-through">{context.price} ر.س</p>
                              </>
                            ) : context.price && !isNaN(Number(context.price)) ? (
                              <p className="text-xl font-bold text-primary">{context.price} <span className="text-xs">ر.س</span></p>
                            ) : (
                              <p className="text-sm font-bold text-primary">سعر مخصص</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Personal Info */}
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-4">المعلومات الشخصية</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="fullName" className="text-sm font-medium text-foreground">الاسم الكامل *</label>
                          <Input id="fullName" placeholder="أدخل اسمك" required value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={formState === "submitting"} />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium text-foreground">رقم الجوال *</label>
                          <Input id="phone" type="tel" placeholder="05xxxxxxxx" required value={phone} onChange={(e) => setPhone(e.target.value)} disabled={formState === "submitting"} />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <label htmlFor="email" className="text-sm font-medium text-foreground">البريد الإلكتروني <span className="text-muted-foreground">(اختياري)</span></label>
                          <Input id="email" type="email" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={formState === "submitting"} />
                        </div>
                      </div>
                    </div>

                    {/* Project Type */}
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-4">نوع المشروع *</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {projectTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setSelectedType(type.id)}
                            disabled={formState === "submitting"}
                            className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${selectedType === type.id
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-accent/50"
                              }`}
                          >
                            <type.icon className={`h-6 w-6 ${selectedType === type.id ? "text-accent" : "text-muted-foreground"}`} />
                            <span className={`text-sm font-medium ${selectedType === type.id ? "text-accent" : "text-foreground"}`}>
                              {type.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Services */}
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-4">الخدمات المطلوبة *</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {services.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => toggleService(service.id)}
                            disabled={formState === "submitting"}
                            className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${selectedServices.includes(service.id)
                              ? "border-accent bg-accent/10"
                              : "border-border hover:border-accent/50"
                              }`}
                          >
                            <div className={`flex h-5 w-5 items-center justify-center rounded border ${selectedServices.includes(service.id) ? "bg-accent border-accent" : "border-muted-foreground"
                              }`}>
                              {selectedServices.includes(service.id) && (
                                <CheckCircle className="h-3 w-3 text-accent-foreground" />
                              )}
                            </div>
                            <span className={`text-sm font-medium ${selectedServices.includes(service.id) ? "text-accent" : "text-foreground"}`}>
                              {service.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-4">الموقع</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="city" className="text-sm font-medium text-foreground">المدينة *</label>
                          <Input id="city" placeholder="مثال: الدمام" required value={city} onChange={(e) => setCity(e.target.value)} disabled={formState === "submitting"} />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="district" className="text-sm font-medium text-foreground">الحي</label>
                          <Input id="district" placeholder="مثال: حي الملقا" value={district} onChange={(e) => setDistrict(e.target.value)} disabled={formState === "submitting"} />
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-4">ملاحظات إضافية</h2>
                      <Textarea
                        placeholder="أي تفاصيل إضافية تود إخبارنا بها..."
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        disabled={formState === "submitting"}
                      />
                    </div>

                    {/* Submit */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Button
                        type="button"
                        size="lg"
                        className="w-full gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white h-14 text-base"
                        onClick={handleSendWhatsApp}
                        disabled={formState === "submitting" || !selectedType || selectedServices.length === 0 || !fullName || !phone || !city}
                      >
                        <MessageCircle className="h-5 w-5" />
                        {formState === "submitting" && sentVia === "whatsapp" ? "جاري فتح واتساب..." : "إرسال عبر واتساب"}
                      </Button>
                      <Button
                        type="button"
                        size="lg"
                        variant="outline"
                        className="w-full gap-2 h-14 text-base"
                        onClick={handleSendEmail}
                        disabled={formState === "submitting" || !selectedType || selectedServices.length === 0 || !fullName || !phone || !city}
                      >
                        <Send className="h-5 w-5" />
                        {formState === "submitting" && sentVia === "email" ? "جاري فتح البريد..." : "إرسال عبر البريد"}
                      </Button>
                    </div>
                    <p className="text-xs text-center text-muted-foreground -mt-4">
                      سيتم تجهيز رسالة الطلب تلقائياً بصياغة عربية واضحة ثم فتح القناة التي تختارها.
                    </p>
                  </form>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Contact */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-4">تواصل سريع</h3>
                    <div className="space-y-4">
                      <a
                        href={`tel:${CONTACT_INFO.phone}`}
                        className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Phone className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">اتصل بنا</p>
                          <p className="font-medium text-foreground" dir="ltr">{CONTACT_INFO.phone}</p>
                        </div>
                        <ChevronLeft className="h-5 w-5 text-muted-foreground mr-auto" />
                      </a>
                      <a
                        href={buildWhatsAppUrl("أريد طلب عرض سعر")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white">
                          <MessageCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">واتساب</p>
                          <p className="font-medium text-foreground">تواصل الآن</p>
                        </div>
                        <ChevronLeft className="h-5 w-5 text-muted-foreground mr-auto" />
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Why Choose Us */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-4">لماذا تكامل؟</h3>
                    <ul className="space-y-3">
                      {[
                        "زيارة مجانية ومعاينة بدون التزام",
                        "أسعار تنافسية وشفافة",
                        "ضمان شامل على جميع المنتجات",
                        "دعم فني 24/7",
                        "فريق تركيب محترف",
                        "إمكانية التقسيط",
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <WhatsAppButton />
    </>
  );
}

export default function QuotePage() {
  return (
    <Suspense>
      <QuoteFormInner />
    </Suspense>
  );
}
