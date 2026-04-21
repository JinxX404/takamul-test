import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const title = lang === "ar" ? "تواصل معنا | تكامل" : "Contact Us | Takamul Security";
  const description =
    lang === "ar"
      ? "تواصل مع فريق تكامل للحصول على استشارة أمنية وعرض سعر مناسب."
      : "Contact Takamul for security consultation and a tailored quotation.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://takamulsecurity.sa/${lang}/contact`,
      languages: {
        ar: "https://takamulsecurity.sa/ar/contact",
        en: "https://takamulsecurity.sa/en/contact",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://takamulsecurity.sa/${lang}/contact`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
