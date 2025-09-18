// Debug utility to check environment configuration
export function debugEnvironment() {
  console.log('🔧 Environment Configuration Debug:');
  console.log('  VITE_GRAPHQL_URL:', import.meta.env.VITE_GRAPHQL_URL);
  console.log('  VITE_OAUTH_TOKEN_URL:', import.meta.env.VITE_OAUTH_TOKEN_URL);
  console.log('  VITE_OAUTH_CLIENT_ID:', import.meta.env.VITE_OAUTH_CLIENT_ID ? 'SET' : 'NOT SET');
  console.log('  VITE_OAUTH_CLIENT_SECRET:', import.meta.env.VITE_OAUTH_CLIENT_SECRET ? 'SET' : 'NOT SET');
  
  // Check if URLs are properly formatted
  const graphqlUrl = import.meta.env.VITE_GRAPHQL_URL;
  const tokenUrl = import.meta.env.VITE_OAUTH_TOKEN_URL;
  
  if (graphqlUrl && !graphqlUrl.startsWith('http')) {
    console.warn('⚠️  GraphQL URL should start with http:// or https://');
  }
  
  if (tokenUrl && !tokenUrl.startsWith('http')) {
    console.warn('⚠️  OAuth Token URL should start with http:// or https://');
  }
}