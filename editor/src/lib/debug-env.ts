// Debug utility to check environment configuration
export function debugEnvironment() {

  
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