const WP_GRAPHQL_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || 'https://api.takamulsecurity.sa/graphql';

interface FetchGraphQLOptions extends RequestInit {
  variables?: Record<string, any>;
}

/**
 * Core utility for fetching data via WPGraphQL.
 * Handles parameters, authorization, and ISR Next.js tags.
 */
export async function fetchGraphQL<T>(query: string, options: FetchGraphQLOptions = {}): Promise<T> {
  const { variables, ...customConfig } = options;

  const config: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${process.env.WP_AUTH_TOKEN}`, // For previews or private posts
      ...customConfig.headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 1800, ...customConfig.next },
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    // Safely combine custom signal if provided, though we primarily use ours
    const finalConfig = {
      ...config,
      signal: customConfig.signal || controller.signal,
    };

    const response = await fetch(WP_GRAPHQL_URL, finalConfig);
    clearTimeout(timeoutId);

    const body = await response.json();

    if (body.errors) {
      // Separate fatal schema errors from harmless field-level internal errors
      const fatalErrors = body.errors.filter((e: any) =>
        !e.message.includes('Internal server error')
      );
      const partialErrors = body.errors.filter((e: any) =>
        e.message.includes('Internal server error')
      );

      if (partialErrors.length > 0) {
        // These are usually null/empty ACF fields on the WP side — non-fatal
        console.warn(
          'GraphQL partial field errors (non-fatal):',
          partialErrors.map((e: any) => e.path?.join('.') || e.message).join(', ')
        );
      }
      if (fatalErrors.length > 0) {
        console.error('GraphQL Errors:', JSON.stringify(fatalErrors, null, 2));
      }

      // Only throw if there is no data at all
      if (!body.data) {
        throw new Error('Failed to fetch GraphQL API');
      }
    }

    return body.data as T;
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.error('FetchGraphQL Timeout: Request took longer than 10s');
    } else {
      console.error('FetchGraphQL Exception:', error);
    }
    throw error;
  }
}
