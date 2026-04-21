import { fetchGraphQL } from "../client";
import { Blog } from "../../types/models";

const POST_FIELDS = `
  id
  databaseId
  slug
  isSticky
  uri
  title
  excerpt
  date
  menuOrder
  content
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
  categories {
    nodes {
      databaseId
      name
      slug
    }
  }
  tags {
    nodes {
      name
      slug
    }
  }
  author {
    node {
      name
      avatar {
        url
      }
    }
  }
  seo {
    title
    metaDesc
    canonical
    metaRobotsNoindex
    metaRobotsNofollow
    opengraphTitle
    opengraphDescription
    opengraphImage {
      sourceUrl
    }
    twitterTitle
    twitterDescription
    twitterImage {
      sourceUrl
      mediaItemUrl
    }
    schema {
      raw
    }
    readingTime
  }
`;

export async function getBlogs(
  lang: string = "ar",
  options?: {
    first?: number;
    after?: string;
    search?: string;
    categoryId?: number;
  },
): Promise<Blog[]> {
  const query = `
    query GetTakamulMasterBlog($first: Int, $after: String, $search: String, $categoryId: Int) {
      posts(where: {
        search: $search,
        categoryId: $categoryId,
        orderby: [{ field: DATE, order: DESC }]
      }, first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ${POST_FIELDS}
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL<{ posts: { nodes: Blog[] } }>(query, {
      variables: {
        first: options?.first ?? 100,
        after: options?.after,
        search: options?.search || undefined,
        categoryId: options?.categoryId,
      },
      next: { tags: ["blogs"], revalidate: 3600 },
    });

    return data?.posts?.nodes || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function getBlogBySlug(
  slug: string,
  lang: string = "ar",
): Promise<Blog | null> {
  const decodedSlug = decodeURIComponent(slug);

  // Layer 1: Singular root query by slug
  const querySingle = `
    query GetBlogBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        ${POST_FIELDS}
      }
    }
  `;

  try {
    const data = await fetchGraphQL<{ post: Blog }>(querySingle, {
      variables: { id: decodedSlug },
      next: { tags: [`blog-${decodedSlug}`], revalidate: 3600 },
    });
    if (data?.post) {
      console.log(`[blogs] Layer 1 hit for slug: ${decodedSlug}`);
      return data.post;
    }
  } catch (e) {
    console.warn(
      `[blogs] Layer 1 failed for ${decodedSlug}:`,
      (e as Error).message,
    );
  }

  // Layer 2: List query filtered by name (slug)
  const queryList = `
    query GetBlogBySlugList($slug: String!) {
      posts(where: { name: $slug }, first: 1) {
        nodes {
          ${POST_FIELDS}
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL<{ posts: { nodes: Blog[] } }>(queryList, {
      variables: { slug: decodedSlug },
      next: { tags: [`blog-${decodedSlug}`], revalidate: 3600 },
    });
    const match = data?.posts?.nodes?.[0] || null;
    if (match) {
      console.log(`[blogs] Layer 2 hit for slug: ${decodedSlug}`);
    } else {
      console.error(
        `[blogs] All layers failed — blog post "${decodedSlug}" not found in WP`,
      );
    }
    return match;
  } catch (e) {
    console.error(
      `[blogs] Layer 2 also failed for ${decodedSlug}:`,
      (e as Error).message,
    );
    return null;
  }
}
