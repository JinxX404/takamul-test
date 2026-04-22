"use client"

import { MessageCircle } from "lucide-react"
import { buildWhatsAppUrl } from "@/lib/config/contact"

export function WhatsAppButton() {
  const message = "مرحباً، أريد الاستفسار عن خدماتكم"
  const whatsappUrl = buildWhatsAppUrl(message)

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-accent text-accent-foreground px-4 py-3 rounded-full border border-accent-foreground/20 shadow-xl shadow-accent/35 hover:bg-accent/90 transition-all hover:-translate-y-0.5"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="font-semibold hidden sm:inline">واتساب فوري</span>
    </a>
  )
}
