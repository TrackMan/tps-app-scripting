import { createClient, cacheExchange, fetchExchange, errorExchange } from 'urql';
import { authService } from './auth-service';
import { ENV_URLS, assertRequiredUrls } from './env';

// GraphQL endpoint from Vite env
export const graphqlUrl = ENV_URLS.graphql;
assertRequiredUrls();

/**
 * Minimal, readable urql client.
 * - Always uses POST (urql does this by default when a body is present)
 * - Injects Authorization header when a token exists
 * - Logs & clears token on auth errors
 */

let clientPromise: Promise<any> | null = null;
let cachedClient: any = null;

async function createAuthedClient() {
  // Only use existing tokens, don't automatically fetch new ones
  // This prevents automatic client credential authentication on app startup
  const hasValidToken = authService.hasValidToken();
  const token = hasValidToken ? await authService.getAccessToken().catch(() => null) : null;
  

  
  return createClient({
    url: graphqlUrl,
    requestPolicy: 'cache-and-network',
    exchanges: [
      errorExchange({
        onError: (error) => {
          const isAuthError = error.graphQLErrors.some(
            (e: any) => e.extensions?.code === 'UNAUTHENTICATED' || e.extensions?.code === 'UNAUTHORIZED'
          );
          if (isAuthError) {

            authService.clearToken();
          }
        },
      }),
      cacheExchange,
      fetchExchange,
    ],
    fetchOptions: () => ({
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }),
  });
}

export async function getUrqlClient() {
  if (cachedClient) return cachedClient;
  if (!clientPromise) {
    clientPromise = createAuthedClient().then(c => { cachedClient = c; return c; });
  }
  return clientPromise;
}

// Backwards compatibility export (may be undefined until first awaited). Prefer using getUrqlClient() in new code.
// For existing code that imports urqlClient synchronously, we kick off creation but without guaranteed token (it will await inside function anyway).
// Caller can switch to: const client = await getUrqlClient();
export const urqlClient: any = await getUrqlClient();

// NOTE: urql issues POST requests with JSON body by default. No manual method forcing required.