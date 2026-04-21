import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const title =
    lang === "ar" ? "من نحن | تكامل - حلول أمنية متكاملة" : "About Us | Takamul Security";
  const description =
    lang === "ar"
      ? "تعرف على شركة تكامل وخبرتنا في تقديم الحلول الأمنية المتكاملة في السعودية."
      : "Learn about Takamul and our experience delivering integrated security solutions in Saudi Arabia.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://takamulsecurity.sa/${lang}/about`,
      languages: {
        ar: "https://takamulsecurity.sa/ar/about",
        en: "https://takamulsecurity.sa/en/about",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://takamulsecurity.sa/${lang}/about`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
