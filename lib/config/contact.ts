export const CONTACT_INFO = {
  phone: "+9660595888996",
  email: "info@takamulsecurity.sa",
  location: {
    ar: "الدمام، المنطقة الصناعية، المملكة العربية السعودية",
    en: "Industrial Area, Dammam, Saudi Arabia",
  },
  mapUrl: "https://maps.google.com",
  whatsappNumber: "9660595888996",
} as const;

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

