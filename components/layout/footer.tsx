import Link from "next/link"
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { CONTACT_INFO } from "@/lib/config/contact"

const footerLinks = {
  services: {
    title: "خدماتنا",
    links: [
      { href: "/services/home", label: "أنظمة المنازل" },
      { href: "/services/business", label: "حلول الأعمال" },
      { href: "/services/integrated", label: "أنظمة متكاملة" },
    ],
  },
  company: {
    title: "الشركة",
    links: [
      { href: "/about", label: "من نحن" },
      { href: "/projects", label: "مشاريعنا" },
      { href: "/testimonials", label: "آراء العملاء" },
      { href: "/blog", label: "المدونة" },
    ],
  },
  support: {
    title: "الدعم",
    links: [
      { href: "/faq", label: "الأسئلة الشائعة" },
      { href: "/how-we-work", label: "كيف نعمل" },
      { href: "/contact", label: "تواصل معنا" },
      { href: "/quote", label: "طلب عرض سعر" },
    ],
  },
}

// const socialLinks = [
//   { href: "#", icon: Facebook, label: "Facebook" },
//   { href: "#", icon: Twitter, label: "Twitter" },
//   { href: "#", icon: Instagram, label: "Instagram" },
//   { href: "#", icon: Linkedin, label: "LinkedIn" },
// ]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3.5 mb-6">
              <img
                src="/site logo.png"
                alt="Takamul"
                className="h-20 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col justify-center -mt-2">
                <span className="text-3xl font-bold text-white tracking-tight leading-none mb-1.5">Takamul</span>
                <span className="text-[12px] font-medium text-white/60 uppercase tracking-widest leading-none">
                  Security Solutions | حلول أمنية
                </span>
              </div>
            </Link>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              الشركة الرائدة في مجال الأنظمة الأمنية. نوفر لك أنظمة مراقبة وذكاء عالية مع زيارة فنية وتركيب احترافي.
            </p>
            {/* <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 hover:bg-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div> */}
          </div>

          {/* Links Sections */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-primary-foreground/70">اتصل بنا</p>
                <p className="font-medium" dir="ltr">{CONTACT_INFO.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-primary-foreground/70">البريد الإلكتروني</p>
                <p className="font-medium">{CONTACT_INFO.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-primary-foreground/70">العنوان</p>
                <p className="font-medium">{CONTACT_INFO.location.ar}</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-primary-foreground/60 text-sm">
            <p>© {new Date().getFullYear()} تكامل. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
