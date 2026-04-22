"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Shield, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ENABLE_PRODUCTS } from "@/lib/config/features"
import { AnimatePresence, motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { href: "/", labelAr: "الرئيسية", labelEn: "Home" },
  { href: "/services", labelAr: "الخدمات", labelEn: "Services" },
  { href: "/packages", labelAr: "الباقات", labelEn: "Packages" },
  ...(ENABLE_PRODUCTS ? [{ href: "/products", labelAr: "المنتجات", labelEn: "Products" }] : []),
  { href: "/projects", labelAr: "المشاريع", labelEn: "Projects" },
  { href: "/how-we-work", labelAr: "كيف نعمل", labelEn: "How We Work" },
  { href: "/faq", labelAr: "الأسئلة الشائعة", labelEn: "FAQ" },
  { href: "/blog", labelAr: "المدونة", labelEn: "Blog" },
  { href: "/contact", labelAr: "تواصل معنا", labelEn: "Contact Us" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSmartCta, setShowSmartCta] = useState(false)
  const pathname = usePathname() || "/"

  // Detect current language from pathname
  const isEnglish = pathname.startsWith("/en")
  const currentLang = isEnglish ? "en" : "ar"
  const targetLang = isEnglish ? "ar" : "en"

  // Build the target path for the language switcher
  const rawPath = pathname.replace(`/${currentLang}`, "") || "/"
  const targetUrl = `/${targetLang}${rawPath === "/" ? "" : rawPath}`

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const hero = document.getElementById("hero-shield-scan")
      const trigger = hero ? hero.offsetHeight - 90 : 560

      setIsScrolled(y > 20)
      setShowSmartCta(y > trigger)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 h-24 w-full">
      <nav className="absolute top-0 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-16" : "h-24"}`}>
            {/* Logo */}
            <Link href={`/${currentLang}`} className="flex items-center gap-3.5">
              <img
                src="/site logo.png"
                alt="Takamul"
                className={`w-auto object-contain shrink-0 transition-all duration-300 ${isScrolled ? "h-12" : "h-20"}`}
              />
              <div className={`flex flex-col justify-center transition-all duration-300 ${isScrolled ? "-mt-0" : "-mt-2"}`}>
                <span className={`font-bold text-primary tracking-tight leading-none transition-all duration-300 ${isScrolled ? "text-2xl" : "text-3xl"}`}>Takamul</span>
                <span className={`font-medium text-muted-foreground uppercase tracking-widest leading-none transition-all duration-300 ${isScrolled ? "text-[10px]" : "text-[12px]"}`}>
                  Security Solutions | حلول أمنية
                </span>
              </div>
            </Link>
  
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.slice(0, 5).map((link) => {
                const localizedHref = link.href === "/" ? `/${currentLang}` : `/${currentLang}${link.href}`;
                return (
                  <Link
                    key={link.href}
                    href={localizedHref}
                    className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-secondary"
                  >
                    {isEnglish ? link.labelEn : link.labelAr}
                  </Link>
                )
              })}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-secondary">
                  {isEnglish ? "More" : "المزيد"}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {navLinks.slice(5).map((link) => {
                    const localizedHref = link.href === "/" ? `/${currentLang}` : `/${currentLang}${link.href}`;
                    return (
                      <DropdownMenuItem key={link.href} asChild>
                        <Link href={localizedHref}>
                          {isEnglish ? link.labelEn : link.labelAr}
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
  
            {/* CTA Buttons & Language Switcher */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switcher */}
              <Button variant="ghost" size="sm" className="gap-2 px-2" asChild title={isEnglish ? "العربية" : "English"}>
                <Link href={targetUrl}>
                  <Globe className="h-4 w-4" />
                  <span>{isEnglish ? 'AR' : 'EN'}</span>
                </Link>
              </Button>
  
              <Button variant="outline" size="sm" asChild>
                <Link href={`/${currentLang}/quote`}>
                  {isEnglish ? 'Request Quote' : 'طلب عرض سعر'}
                </Link>
              </Button>
  
              <AnimatePresence>
                {showSmartCta && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl shadow-accent/35 border border-accent-foreground/25" asChild>
                      <Link href={`/${currentLang}/quote`}>
                        {isEnglish ? "Get Started" : "ابدأ الآن"}
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
  
            {/* Mobile Menu & Quick Switcher */}
            <div className="lg:hidden flex items-center gap-2">
              <AnimatePresence>
                {showSmartCta && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Button size="sm" className="h-8 px-2 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/30 border border-accent-foreground/25" asChild>
                      <Link href={`/${currentLang}/quote`}>
                        {isEnglish ? "Start" : "ابدأ"}
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
  
              <Button variant="ghost" size="sm" className="px-2" asChild>
                <Link href={targetUrl}>
                  <Globe className="h-4 w-4" />
                  <span className="ml-1 text-xs font-bold">{isEnglish ? 'AR' : 'EN'}</span>
                </Link>
              </Button>
              <button
                className="p-2 rounded-md hover:bg-secondary"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
  
          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const localizedHref = link.href === "/" ? `/${currentLang}` : `/${currentLang}${link.href}`;
                  return (
                    <Link
                      key={link.href}
                      href={localizedHref}
                      className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-secondary"
                      onClick={() => setIsOpen(false)}
                    >
                      {isEnglish ? link.labelEn : link.labelAr}
                    </Link>
                  )
                })}
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/${currentLang}/quote`}>
                      {isEnglish ? 'Request A Quote' : 'طلب عرض سعر'}
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/${currentLang}/contact`}>
                      {isEnglish ? 'Contact Us' : 'تواصل معنا'}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
