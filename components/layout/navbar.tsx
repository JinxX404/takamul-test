"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, Shield, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ENABLE_PRODUCTS } from "@/lib/config/features"
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
  const pathname = usePathname() || "/"

  // Detect current language from pathname
  const isEnglish = pathname.startsWith("/en")
  const currentLang = isEnglish ? "en" : "ar"
  const targetLang = isEnglish ? "ar" : "en"

  // Build the target path for the language switcher
  const rawPath = pathname.replace(`/${currentLang}`, "") || "/"
  const targetUrl = `/${targetLang}${rawPath === "/" ? "" : rawPath}`

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <Link href={`/${currentLang}`} className="flex items-center gap-3.5">
            <img
              src="/site logo.png"
              alt="Takamul"
              className="h-20 w-auto object-contain shrink-0"
            />
            <div className="flex flex-col justify-center -mt-2">
              <span className="text-3xl font-bold text-primary tracking-tight leading-none mb-1.5">Takamul</span>
              <span className="text-[12px] font-medium text-muted-foreground uppercase tracking-widest leading-none">
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
            <Button size="sm" asChild>
              <Link href={`/${currentLang}/contact`}>
                {isEnglish ? 'Contact' : 'تواصل معنا'}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu & Quick Switcher */}
          <div className="lg:hidden flex items-center gap-2">
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
  )
}
