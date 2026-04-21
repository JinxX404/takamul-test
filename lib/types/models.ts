// WPGraphQL Yoast SEO Node
export interface YoastSEO {
  title?: string;
  metaDesc?: string;
  focuskw?: string;
  metaRobotsNoindex?: string;
  metaRobotsNofollow?: string;
  opengraphTitle?: string;
  opengraphDescription?: string;
  opengraphImage: {
    sourceUrl?: string;
    mediaItemUrl?: string;
  };
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage: {
    mediaItemUrl?: string;
    sourceUrl?: string;
  };
  canonical?: string;
  readingTime?: string;
  schema?: {
    raw?: string;
  };
}

export interface FeaturedImageNode {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails: {
      width: number;
      height: number;
    };
  };
}

// Base Interface for all Post Types
export interface WPPostBase {
  id: string;
  databaseId: number;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  date: string;
  modified: string;
  featuredImage?: FeaturedImageNode;
  seo?: YoastSEO;
}

// ProjectType taxonomy node
export interface ProjectType {
  name: string;
  slug: string;
  databaseId?: number;
}

// Custom Domain Models matching live WPGraphQL ACF schema
export interface Project {
  id: string;
  databaseId?: number;
  slug: string;
  title: string;
  modified?: string; // kept for sitemap
  featuredImage?: FeaturedImageNode;
  seo?: YoastSEO;
  // Taxonomy
  projecttypes?: {
    nodes: ProjectType[];
  };
  // ACF Fields
  dateOfAccomplish?: string;
  address?: string;
  projectDescription?: string; // HTML rich text
  projectResults?: string; // HTML rich text
  // Gallery relationship
  imageGallery?: {
    nodes: {
      sourceUrl: string;
      altText?: string;
    }[];
  };
  // Extra content blocks
  extraSections?: {
    nodes: {
      title?: string;
      content?: string;
    }[];
  };
}

export interface Package extends WPPostBase {
  packageFields?: {
    price?: string;
    billingCycle?: string;
    featuresList?: { feature: string }[];
  };
}

export interface Product extends WPPostBase {
  productcategories?: {
    nodes: { name: string; slug: string }[];
  };
  brand?: string;
  mostRequested?: boolean;
  productPrice?: string;
  salePrice?: string;
  badgeText?: string;
  quickFeatures?: string;
  productFields?: {
    sku?: string;
    price?: string;
    specifications?: { label: string; value: string }[];
    uses?: string[];
  };
}

export interface Blog extends WPPostBase {
  isSticky?: boolean;
  uri?: string;
  categories?: {
    nodes: { databaseId?: number; name: string; slug: string }[];
  };
  tags?: {
    nodes: { name: string; slug: string }[];
  };
  blogFields?: {
    readingTime?: string;
  };
  author?: {
    node: {
      name: string;
      avatar: { url: string };
    };
  };
}
