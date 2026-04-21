import type { Metadata, Viewport } from "next";
import { Tajawal, Cairo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "../globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://takamulsecurity.sa"),
  title: "تكامل - حلول أمنية متكاملة",
  description:
    "نوفر لك أنظمة مراقبة وذكاء عالية مع زيارة فنية وتركيب احترافي وأسعار مناسبة - مع إمكانية التقسيط بكل سهولة",
  generator: "v0.app",
  keywords: [
    "كاميرات مراقبة",
    "أنظمة أمنية",
    "حلول أمنية",
    "تكامل",
    "السعودية",
  ],
  icons: {
    icon: "/site logo.png",
    apple: "/site logo.png",
  },
  openGraph: {
    type: "website",
    siteName: "Takamul Security",
    title: "تكامل - حلول أمنية متكاملة",
    description:
      "نوفر لك أنظمة مراقبة وذكاء عالية مع زيارة فنية وتركيب احترافي وأسعار مناسبة - مع إمكانية التقسيط بكل سهولة",
    images: ["/site logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "تكامل - حلول أمنية متكاملة",
    description:
      "نوفر لك أنظمة مراقبة وذكاء عالية مع زيارة فنية وتركيب احترافي وأسعار مناسبة - مع إمكانية التقسيط بكل سهولة",
    images: ["/site logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="bg-background"
      data-scroll-behavior="smooth"
    >
      <body
        className={`${tajawal.variable} ${cairo.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
