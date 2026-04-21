import { fetchGraphQL } from '../client';
import { Product } from '../../types/models';

const PRODUCT_FIELDS = `
  id
  databaseId
  slug
  title
  excerpt
  featuredImage {
    node {
      sourceUrl
      altText
    }
  }
  productFields {
    sku
    price
    specifications {
      label
      value
    }
  }
`;

export async function getProducts(lang: string = 'en'): Promise<Product[]> {
  const query = `
    query GetAllProducts {
      takamulproducts(first: 100) {
        nodes {
          id
          databaseId
          title
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          productcategories {
            nodes {
              name
              slug
            }
          }
          brand
          mostRequested
          productPrice
          salePrice
          badgeText
          quickFeatures
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL<{ takamulproducts: { nodes: Product[] } }>(query, {
      next: { tags: ['products'] }
    });
    return data?.takamulproducts?.nodes || [];
  } catch (error) {
    console.error("Failed to fetch TAKAMUL live products query", error);
    return [];
  }
}

export async function getProductBySlug(slug: string, lang: string = 'en'): Promise<any | null> {
  const query = `
    query GetProductDetails($id: ID!) {
      takamulproduct(id: $id, idType: SLUG) {
        id
        databaseId
        title
        slug
        content
        productDescription
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        productcategories {
          nodes {
            name
            slug
          }
        }
        brand
        productPrice
        salePrice
        badgeText
        quickFeatures
        uses
        productGallery {
          nodes {
            sourceUrl
            altText
          }
        }
        techSpecs {
          nodes {
            key
            value
          }
        }
        extraSections {
          nodes {
            title
            content
          }
        }
        relatedProducts {
          nodes {
            title
            slug
            featuredImage {
              node {
                sourceUrl
              }
            }
            productPrice
            salePrice
          }
        }
        seo {
          title
          metaDesc
          canonical
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
            mediaItemUrl
          }
          twitterTitle
          twitterDescription
          twitterImage {
            sourceUrl
            mediaItemUrl
          }
          metaRobotsNoindex
          metaRobotsNofollow
          schema {
            raw
          }
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL<{ takamulproduct: any }>(query, {
      variables: { id: slug },
      next: { tags: [`product-${slug}`] }
    });
    return data?.takamulproduct || null;
  } catch (error) {
    console.error("Failed to fetch SINGLE product query", error);
    return null;
  }
}

export async function getCategoryProductsFallback(excludeId: number, categorySlug?: string): Promise<any[]> {
  // Using notIn to explicitly exclude the current product ID
  const query = `
    query GetCategoryFallback($notIn: [ID]) {
      takamulproducts(first: 4, where: { notIn: $notIn }) {
        nodes {
          title
          slug
          featuredImage {
            node {
              sourceUrl
            }
          }
          productPrice
          salePrice
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL<{ takamulproducts: { nodes: any[] } }>(query, {
      variables: { notIn: [excludeId] },
      next: { revalidate: 1800 }
    });
    return data?.takamulproducts?.nodes || [];
  } catch (error) {
    console.error("Failed to fetch fallback products query", error);
    return [];
  }
}
