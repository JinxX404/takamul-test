import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { HeroSection } from "@/components/home/hero-section"
import { SolutionsSection } from "@/components/home/solutions-section"
import { PackagesSection } from "@/components/home/packages-section"
import { ProcessSection } from "@/components/home/process-section"
import { PartnersSection } from "@/components/home/partners-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"
import { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const title =
    lang === "ar" ? "تكامل - حلول أمنية متكاملة" : "Takamul Security - Integrated Security Solutions";
  const description =
    lang === "ar"
      ? "حلول أمنية متكاملة تشمل كاميرات المراقبة والإنذار والتحكم بالدخول مع تركيب احترافي."
      : "Integrated security solutions including CCTV, alarms, and access control with professional installation.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://takamulsecurity.sa/${lang}`,
      languages: {
        en: "https://takamulsecurity.sa/en",
        ar: "https://takamulsecurity.sa/ar",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://takamulsecurity.sa/${lang}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SolutionsSection />
      <PackagesSection />
      <ProcessSection />
      <PartnersSection />
      <TestimonialsSection />
      <CTASection />
      <WhatsAppButton />
    </>
  )
}
