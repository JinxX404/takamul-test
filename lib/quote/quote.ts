import { CONTACT_INFO } from "@/lib/config/contact";

/**
 * Quote Form Data - single source of truth for all channels (WhatsApp, email in future)
 */
export interface QuoteContext {
  type: 'product' | 'package' | 'general';
  name: string;        // product/package title
  slug?: string;
  price?: string;
  salePrice?: string;
  category?: string;
  badges?: string[];
}

export interface QuoteFormData {
  // Personal Info
  fullName: string;
  phone: string;
  email: string;
  // Location
  city: string;
  district: string;
  // Project
  projectType: string;
  services: string[];
  // Extra
  notes: string;
}

const wrapRtl = (text: string) => `\u202B${text}\u202C`;

/**
 * Builds the WhatsApp message from quote context + form data.
 * Pure function – no side effects. Easy to adapt for email in the future.
 */
export function buildWhatsAppMessage(context: QuoteContext, form: QuoteFormData): string {
  const lines: string[] = [];

  lines.push('🔐 *طلب عرض سعر - تكامل للأمن*');
  lines.push('─────────────────────────');

  // What they're inquiring about
  if (context.type !== 'general') {
    lines.push(`📦 *${context.type === 'product' ? 'المنتج' : 'الباقة'}:* ${context.name}`);
    if (context.category) lines.push(`🏷️ *التصنيف:* ${context.category}`);
    if (context.badges && context.badges.length > 0) lines.push(`✨ *المميزات:* ${context.badges.join(' • ')}`);
    if (context.salePrice) {
      lines.push(`💰 *السعر:* ${context.salePrice} ر.س (كان ${context.price} ر.س)`);
    } else if (context.price && !isNaN(Number(context.price))) {
      lines.push(`💰 *السعر:* ${context.price} ر.س`);
    }
  }

  lines.push('─────────────────────────');
  lines.push('👤 *بيانات العميل*');
  lines.push(`• الاسم: ${form.fullName}`);
  lines.push(`• الجوال: ${form.phone}`);
  if (form.email) lines.push(`• البريد: ${form.email}`);
  if (form.city) lines.push(`• المدينة: ${form.city}${form.district ? ` - ${form.district}` : ''}`);
  if (form.projectType) lines.push(`• نوع المشروع: ${form.projectType}`);
  if (form.services.length > 0) lines.push(`• الخدمات: ${form.services.join('، ')}`);
  if (form.notes) {
    lines.push('─────────────────────────');
    lines.push(`📝 *ملاحظات:* ${form.notes}`);
  }

  lines.push('─────────────────────────');
  lines.push('_تم إرسال هذا الطلب عبر الموقع الإلكتروني_');

  return wrapRtl(lines.join('\n'));
}

/**
 * Builds a structured email body (for future use).
 */
export function buildEmailBody(context: QuoteContext, form: QuoteFormData): string {
  return wrapRtl(`
طلب عرض سعر جديد - تكامل للأمن

--- تفاصيل الطلب ---
${context.type !== 'general' ? `${context.type === 'product' ? 'المنتج' : 'الباقة'}: ${context.name}` : 'طلب عام'}
${context.category ? `التصنيف: ${context.category}` : ''}
${context.salePrice ? `السعر: ${context.salePrice} ر.س (كان ${context.price} ر.س)` : context.price && !isNaN(Number(context.price)) ? `السعر: ${context.price} ر.س` : ''}

--- بيانات العميل ---
الاسم: ${form.fullName}
الجوال: ${form.phone}
البريد الإلكتروني: ${form.email || 'غير محدد'}
المدينة: ${form.city || 'غير محدد'}${form.district ? ` - ${form.district}` : ''}
نوع المشروع: ${form.projectType || 'غير محدد'}
الخدمات المطلوبة: ${form.services.join('، ') || 'غير محدد'}

--- ملاحظات ---
${form.notes || 'لا توجد ملاحظات'}
  `.trim());
}

export function buildQuoteEmailSubject(context: QuoteContext): string {
  return context.type !== "general" && context.name
    ? `طلب عرض سعر - ${context.name}`
    : "طلب عرض سعر - تكامل";
}

export const WHATSAPP_NUMBER = CONTACT_INFO.whatsappNumber;
