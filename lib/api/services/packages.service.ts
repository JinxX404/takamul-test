import { fetchGraphQL } from '../client';
import { Package } from '../../types/models';

const PACKAGE_FIELDS = `
  id
  databaseId
  date
  slug
  title
  packageDescription
  featuredImage {
    node {
      sourceUrl
      altText
      mediaDetails {
        width
        height
      }
    }
  }
  packagePrice
  packageFeatures
  badgeText
  suitableFor
  mostRequested
`;

export async function getPackages(): Promise<Package[]> {
  const query = `
    query GetTakamulPackageCards {
      takamulpackages(first: 100, where: { orderby: [{ field: DATE, order: ASC }] }) {
        nodes {
          ${PACKAGE_FIELDS}
        }
      }
    }
  `;

  const data = await fetchGraphQL<{ takamulpackages: { nodes: Package[] } }>(query, {
    next: { tags: ['packages'] }
  });

  const nodes = data?.takamulpackages?.nodes || [];
  return [...nodes].sort((a, b) => (a.databaseId || 0) - (b.databaseId || 0));
}

export async function getPackageBySlug(slug: string): Promise<Package | null> {
  const query = `
    query GetSingleTakamulPackage($id: ID!) {
      takamulpackage(id: $id, idType: SLUG) {
        ${PACKAGE_FIELDS}
        content
        packageContent
        packageImages {
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
        enableCustomLayout
        customHtmlContent {
          edges {
            node {
              id
              title
              content
            }
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
        }
      }
    }
  `;

  const data = await fetchGraphQL<{ takamulpackage: Package }>(query, {
    variables: { id: slug },
    next: { tags: [`package-${slug}`] }
  });

  return data?.takamulpackage || null;
}
