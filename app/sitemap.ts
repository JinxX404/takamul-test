import { MetadataRoute } from 'next';
import { getProjects } from '@/lib/api/services/projects.service';
import { getBlogs } from '@/lib/api/services/blogs.service';
import { getProducts } from '@/lib/api/services/products.service';
import { getPackages } from '@/lib/api/services/packages.service';
// Import other services

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://takamulsecurity.sa';

/**
 * Safely parses a date string or object.
 * Returns the provided date if valid, or the current date as a fallback.
 * Prevents "Invalid time value" errors during prerendering.
 */
function safeDate(dateInput?: string | Date | null): Date {
  if (!dateInput) return new Date();
  const date = new Date(dateInput);
  return isNaN(date.getTime()) ? new Date() : date;
}

function safeUrl(path: string): string {
  return encodeURI(path.trim());
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapData: MetadataRoute.Sitemap = [];

  // Define static core routes
  const coreRoutes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/products',
    '/packages',
    '/blog',
    '/faq',
    '/how-we-work',
    '/quote',
    '/projects',
    '/testimonials',
  ];
  const languages = ['ar', 'en'];

  languages.forEach((lang) => {
    coreRoutes.forEach((route) => {
      sitemapData.push({
        url: safeUrl(`${BASE_URL}/${lang}${route}`),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  try {
    // 1. Projects
    const [enProjects, arProjects] = await Promise.all([
      getProjects('en'),
      getProjects('ar')
    ]);

    enProjects.forEach((project) => {
      sitemapData.push({
        url: safeUrl(`${BASE_URL}/en/projects/${project.slug || ''}`),
        lastModified: safeDate(project.modified),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    arProjects.forEach((project) => {
      sitemapData.push({
        url: safeUrl(`${BASE_URL}/ar/projects/${project.slug || ''}`),
        lastModified: safeDate(project.modified),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    // 2. Blogs
    const [enBlogs, arBlogs] = await Promise.all([
      getBlogs('en'),
      getBlogs('ar')
    ]);

    enBlogs.forEach((blog) => {
      sitemapData.push({
        url: safeUrl(`${BASE_URL}/en/blog/${blog.slug || ''}`),
        lastModified: safeDate(blog.date),
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    });

    arBlogs.forEach((blog) => {
      sitemapData.push({
        url: safeUrl(`${BASE_URL}/ar/blog/${blog.slug || ''}`),
        lastModified: safeDate(blog.date),
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    });

    // 3. Products
    const [enProducts, arProducts] = await Promise.all([
      getProducts('en'),
      getProducts('ar')
    ]);

    enProducts.forEach((product) => {
      sitemapData.push({
        url: safeUrl(`${BASE_URL}/en/products/${product.slug || ''}`),
        lastModified: safeDate(product.modified),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });

    arProducts.forEach((product) => {
      sitemapData.push({
        url: safeUrl(`${BASE_URL}/ar/products/${product.slug || ''}`),
        lastModified: safeDate(product.modified),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });

    // 4. Packages
    const packages = await getPackages();
    languages.forEach((lang) => {
      packages.forEach((pkg) => {
        sitemapData.push({
          url: safeUrl(`${BASE_URL}/${lang}/packages/${pkg.slug || ''}`),
          lastModified: safeDate(pkg.modified || pkg.date),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      });
    });

  } catch(e) {
    console.error("Failed to fetch dynamically for sitemap", e);
  }

  return sitemapData.filter(
    (entry) =>
      Boolean(entry.url) &&
      !entry.url.includes('/undefined') &&
      !entry.url.includes('/null')
  );
}
