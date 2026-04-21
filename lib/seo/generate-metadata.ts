import { Metadata } from 'next';
import { YoastSEO } from '../types/models';

/**
 * Transforms wp-graphql-yoast JSON into Next.js Metadata Object
 */
function normalizeFrontendUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  const frontendBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://takamulsecurity.sa';
  const wpBase = (process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || 'https://api.takamulsecurity.sa/graphql')
    .replace('/graphql', '')
    .replace('http://', 'https://');

  return url
    .replace('http://', 'https://')
    .replace(wpBase, frontendBase);
}

export function buildSEO(
  yoastData?: YoastSEO, 
  fallbackTitle: string = 'Takamul - تكامل', 
  lang: string = 'en',
  fallbackDescription?: string,
  fallbackPath?: string
): Metadata {
  const frontendBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://takamulsecurity.sa';
  const fallbackCanonical = fallbackPath ? `${frontendBase}${fallbackPath}` : undefined;

  if (!yoastData) {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      alternates: fallbackCanonical
        ? {
            canonical: fallbackCanonical,
            languages: {
              en: fallbackCanonical.replace(`/${lang}/`, '/en/'),
              ar: fallbackCanonical.replace(`/${lang}/`, '/ar/'),
            },
          }
        : undefined,
      openGraph: fallbackDescription
        ? {
            title: fallbackTitle,
            description: fallbackDescription,
            url: fallbackCanonical,
            type: 'website',
          }
        : undefined,
      twitter: fallbackDescription
        ? {
            card: 'summary_large_image',
            title: fallbackTitle,
            description: fallbackDescription,
          }
        : undefined,
    };
  }

  const {
    title,
    metaDesc,
    canonical,
    opengraphTitle,
    opengraphDescription,
    opengraphImage,
    twitterTitle,
    twitterDescription,
    twitterImage
  } = yoastData;
  let normalizedCanonical = normalizeFrontendUrl(canonical);
  if ((!normalizedCanonical || !normalizedCanonical.includes(`/${lang}/`)) && fallbackCanonical) {
    normalizedCanonical = fallbackCanonical;
  }
  const description = metaDesc || fallbackDescription;
  const ogImage = normalizeFrontendUrl(opengraphImage?.mediaItemUrl || opengraphImage?.sourceUrl);
  const twitterImageUrl = normalizeFrontendUrl(twitterImage?.mediaItemUrl || twitterImage?.sourceUrl);

  const metadata: Metadata = {
    title: title || fallbackTitle,
    description,
    alternates: {
      canonical: normalizedCanonical,
      languages: {
        'en': normalizedCanonical?.replace(`/${lang}/`, '/en/'),
        'ar': normalizedCanonical?.replace(`/${lang}/`, '/ar/'),
      }
    },
    openGraph: {
      title: opengraphTitle || title,
      description: opengraphDescription || description,
      url: normalizedCanonical,
      type: 'website',
    },
    twitter: {
      card: twitterImageUrl ? 'summary_large_image' : 'summary',
      title: twitterTitle || title,
      description: twitterDescription || description,
      images: twitterImageUrl ? [twitterImageUrl] : undefined,
    }
  };

  if (ogImage && metadata.openGraph) {
    metadata.openGraph.images = [{
      url: ogImage,
      width: 1200,
      height: 630,
      alt: title 
    }];
  }

  return metadata;
}
