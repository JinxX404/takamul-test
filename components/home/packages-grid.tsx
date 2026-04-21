"use client"

import Link from "next/link"
import Image from "next/image"
import { Check, Star } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { fadeUp, containerStagger } from "@/lib/motion-variants"

interface Package {
  id: string;
  slug: string;
  title: string;
  packageDescription: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  packagePrice: string;
  packageFeatures: string;
  badgeText: string;
  suitableFor: string;
  mostRequested: boolean;
}

interface PackagesGridProps {
  packages: Package[];
}

const parseHtmlList = (text?: string) => {
  if (!text) return [];
  let parsed = text.replace(/<\/p>/gi, "|").replace(/<br\s*\/?>/gi, "|");
  parsed = parsed.replace(/<[^>]*>?/gm, "");
  const items = parsed.split(/\||\n/);
  return items.map((i) => i.trim()).filter((i) => i !== "");
};

export function PackagesGrid({ packages }: PackagesGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerStagger}
    >
      {packages.map((pkg) => {
        const isPopular = Boolean(pkg.mostRequested);
        const badges = parseHtmlList(pkg.badgeText);
        const features = parseHtmlList(pkg.packageFeatures);
        const priceRaw = pkg.packagePrice;
        const isPriceNumeric = priceRaw && !isNaN(Number(priceRaw)) && Number(priceRaw) > 0;
        const fallbackPrice = "حسب الطلب";
        const imageNode = pkg.featuredImage?.node;
        const subtitleText = (pkg.suitableFor || '').replace(/<[^>]*>?/gm, "").trim();

        return (
          <motion.div key={pkg.id} variants={fadeUp}>
            <Card
              className={`flex flex-col relative overflow-hidden transition-all hover:shadow-2xl pt-0 h-full group ${isPopular ? "border-accent border-2 shadow-accent/10" : "border-border/50"
                }`}
            >
              {/* Entire Card Clickable Link overlay */}
              <Link href={`/ar/packages/${pkg.slug}`} className="absolute inset-0 z-10" aria-label={pkg.title}><span className="sr-only">{pkg.title}</span></Link>

              {isPopular && (
                <div className="absolute top-4 right-4 z-20 pointer-events-none">
                  <Badge className="bg-accent text-accent-foreground gap-1 border-0 shadow-sm pointer-events-none">
                    <Star className="h-3 w-3 fill-current" />
                    الأكثر طلباً
                  </Badge>
                </div>
              )}

              {/* Full cover image */}
              <div className="relative h-48 w-full bg-muted shrink-0 pointer-events-none overflow-hidden">
                {imageNode?.sourceUrl ? (
                  <Image
                    src={imageNode.sourceUrl}
                    alt={imageNode.altText || pkg.title}
                    fill
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">{pkg.title}</span>
                  </div>
                )}
              </div>

              <CardHeader className="pb-2 relative z-20 pointer-events-none">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">{pkg.title}</h3>
                    {subtitleText && (
                      <p className="text-sm text-muted-foreground mt-1">{subtitleText}</p>
                    )}
                  </div>
                </div>

                {/* Dynamic Badges List */}
                {badges.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {badges.map((badgeText, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="inline-block"
                      >
                        <Badge variant="secondary" className="text-xs font-normal">
                          {badgeText}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                )}

                <div className="mt-4">
                  {isPriceNumeric ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-primary">{priceRaw}</span>
                      <span className="text-sm text-muted-foreground">ر.س</span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-primary">{fallbackPrice}</span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1 relative z-20 pointer-events-none">
                {/* Features List */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 mt-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm leading-tight">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                        <Check className="h-3.5 w-3.5 text-accent" />
                      </div>
                      <span className="text-muted-foreground mt-0.5">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-4 pb-6 mt-auto relative z-20 pointer-events-none">
                <Button
                  className="w-full h-11 text-base pointer-events-auto transition-all group-hover:shadow-lg"
                  variant={isPopular ? "default" : "outline"}
                  asChild
                >
                  <Link href={`/ar/packages/${pkg.slug}`}>عرض التفاصيل</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
