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
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#20BA5C] transition-all hover:scale-105"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="font-medium hidden sm:inline">واتساب</span>
    </a>
  )
}
