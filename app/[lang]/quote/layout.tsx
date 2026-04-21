import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const title = lang === "ar" ? "طلب عرض سعر | تكامل" : "Request a Quote | Takamul Security";
  const description =
    lang === "ar"
      ? "أرسل طلب عرض السعر وسيتواصل معك فريق تكامل للحلول الأمنية."
      : "Submit your quote request and Takamul security team will contact you.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://takamulsecurity.sa/${lang}/quote`,
      languages: {
        ar: "https://takamulsecurity.sa/ar/quote",
        en: "https://takamulsecurity.sa/en/quote",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://takamulsecurity.sa/${lang}/quote`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
