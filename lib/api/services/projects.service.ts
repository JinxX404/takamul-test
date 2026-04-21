import { fetchGraphQL } from '../client';
import { Project, ProjectType } from '../../types/models';

// ─────────────────────────────────────────────────────────────────────────────
// Queries — ordered from richest to safest fallback
// ─────────────────────────────────────────────────────────────────────────────

const GET_PROJECT_CATEGORIES = `
  query GetProjectCategories {
    projecttypes {
      nodes {
        name
        slug
        databaseId
      }
    }
  }
`;

// ✅ Only confirmed fields (from user-provided queries) — ALWAYS safe
const GET_ALL_PROJECTS = `
  query GetAllProjects {
    takamulprojects(first: 100) {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        projecttypes {
          nodes {
            name
            slug
          }
        }
        dateOfAccomplish
        address
        modified
      }
    }
  }
`;

// Layer 1: Full detail via singular root query + all optional ACF fields
const GET_PROJECT_BY_SLUG_FULL = `
  query GetProjectBySlug($id: ID!) {
    takamulproject(id: $id, idType: SLUG) {
      id
      databaseId
      title
      slug
      modified
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      projecttypes {
        nodes {
          name
          slug
          databaseId
        }
      }
      dateOfAccomplish
      address
      projectDescription
      projectResults
      imageGallery {
        nodes {
          sourceUrl
          altText
        }
      }
      extraSections {
        nodes {
          title
          content
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

// Layer 2: List query filtered by slug, with rich ACF fields
// (works if singular query isn't registered in the schema)
const GET_PROJECT_BY_SLUG_LIST = `
  query GetProjectBySlugList($slug: String!) {
    takamulprojects(first: 1, where: { name: $slug }) {
      nodes {
        id
        databaseId
        title
        slug
        modified
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        projecttypes {
          nodes {
            name
            slug
            databaseId
          }
        }
        dateOfAccomplish
        address
        projectDescription
        projectResults
        imageGallery {
          nodes {
            sourceUrl
            altText
          }
        }
        extraSections {
          nodes {
            title
            content
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
  }
`;

// Layer 3: Safe baseline — only confirmed-working fields from user's own queries
// This MUST succeed if the project exists in WP at all
const GET_PROJECT_BY_SLUG_SAFE = `
  query GetProjectBySlugSafe($slug: String!) {
    takamulprojects(first: 100, where: { name: $slug }) {
      nodes {
        id
        title
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        projecttypes {
          nodes {
            name
            slug
          }
        }
        dateOfAccomplish
        address
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
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Service Functions
// ─────────────────────────────────────────────────────────────────────────────

export async function getProjectCategories(): Promise<ProjectType[]> {
  try {
    const data = await fetchGraphQL<{ projecttypes: { nodes: ProjectType[] } }>(
      GET_PROJECT_CATEGORIES,
      { next: { tags: ['project-categories'], revalidate: 1800 } }
    );
    return data?.projecttypes?.nodes || [];
  } catch (error) {
    console.error('Failed to fetch project categories:', error);
    return [];
  }
}

export async function getProjects(lang: string = 'ar'): Promise<Project[]> {
  try {
    const data = await fetchGraphQL<{ takamulprojects: { nodes: Project[] } }>(
      GET_ALL_PROJECTS,
      { next: { tags: ['projects'], revalidate: 1800 } }
    );
    return data?.takamulprojects?.nodes || [];
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string, lang: string = 'ar'): Promise<Project | null> {
  const decodedSlug = decodeURIComponent(slug);

  // ── Layer 1: Singular query with all ACF fields ───────────────────────────
  // Fastest, but fails if a) singular root query not in schema, OR
  // b) any optional field name (projectDescription etc.) doesn't exist yet
  try {
    const data = await fetchGraphQL<{ takamulproject: Project }>(
      GET_PROJECT_BY_SLUG_FULL,
      {
        variables: { id: decodedSlug },
        next: { tags: [`project-${decodedSlug}`], revalidate: 1800 }
      }
    );
    if (data?.takamulproject) {
      console.log(`[projects] Layer 1 hit for slug: ${decodedSlug}`);
      return data.takamulproject;
    }
  } catch (e) {
    console.warn(`[projects] Layer 1 failed for ${decodedSlug}:`, (e as Error).message);
  }

  // ── Layer 2: List query with ACF fields, filtered by slug ─────────────────
  // Works if singular query isn't registered but field names are valid
  try {
    const data = await fetchGraphQL<{ takamulprojects: { nodes: Project[] } }>(
      GET_PROJECT_BY_SLUG_LIST,
      {
        variables: { slug: decodedSlug },
        next: { tags: [`project-${decodedSlug}`], revalidate: 1800 }
      }
    );
    const nodes = data?.takamulprojects?.nodes || [];
    const match = nodes.find(p => p.slug === decodedSlug || p.slug === slug) ?? nodes[0] ?? null;
    if (match) {
      console.log(`[projects] Layer 2 hit for slug: ${decodedSlug}`);
      return match;
    }
  } catch (e) {
    console.warn(`[projects] Layer 2 failed for ${decodedSlug}:`, (e as Error).message);
  }

  // ── Layer 3: Safe baseline — ONLY confirmed fields ───────────────────────
  // Requests nothing that might not exist. If this fails, the project truly
  // does not exist in WordPress (or the WP GraphQL endpoint is unreachable).
  try {
    const data = await fetchGraphQL<{ takamulprojects: { nodes: Project[] } }>(
      GET_PROJECT_BY_SLUG_SAFE,
      {
        variables: { slug: decodedSlug },
        next: { tags: [`project-${decodedSlug}`], revalidate: 1800 }
      }
    );
    const nodes = data?.takamulprojects?.nodes || [];
    const match = nodes.find(p => p.slug === decodedSlug || p.slug === slug) ?? nodes[0] ?? null;
    if (match) {
      console.log(`[projects] Layer 3 (safe baseline) hit for slug: ${decodedSlug}`);
    } else {
      console.error(`[projects] All 3 layers failed — project "${decodedSlug}" not found in WP`);
    }
    return match;
  } catch (e) {
    console.error(`[projects] Layer 3 also failed for ${decodedSlug}:`, (e as Error).message);
    return null;
  }
}

export async function getRelatedProjects(
  categorySlug: string,
  currentProjectId: string
): Promise<Project[]> {
  try {
    // Robust fallback: Fetch all projects and filter locally
    // This avoids failing due to unsupported taxQuery fields in WPGraphQL
    const allProjects = await getProjects('ar');

    return allProjects
      .filter(p =>
        p.id !== currentProjectId &&
        p.projecttypes?.nodes?.some(cat => cat.slug === categorySlug)
      )
      .slice(0, 3);
  } catch (error) {
    console.warn('[projects] Failed to filter related projects locally:', error);
    return [];
  }
}
