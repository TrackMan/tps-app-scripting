// Debug utilities for cloud vs local environment troubleshooting

export const logEnvironmentInfo = () => {
  console.group('🔍 Environment Debug Information');
  
  console.log('Environment Variables:');
  console.log('- MODE:', import.meta.env.MODE);
  console.log('- DEV:', import.meta.env.DEV);
  console.log('- VITE_NODE_ENV:', import.meta.env.VITE_NODE_ENV);
  console.log('- VITE_BACKEND_BASE_URL:', import.meta.env.VITE_BACKEND_BASE_URL);
  console.log('- VITE_LOGIN_BASE_URL:', import.meta.env.VITE_LOGIN_BASE_URL);
  
  console.log('\nComputed URLs:');
  const backendBase = import.meta.env.VITE_BACKEND_BASE_URL;
  const loginBase = import.meta.env.VITE_LOGIN_BASE_URL;
  console.log('- GraphQL:', backendBase ? `${backendBase}/graphql` : 'Cannot compute - backend URL missing');
  console.log('- OAuth Token:', loginBase ? `${loginBase}/connect/token` : 'Cannot compute - login URL missing');
  
  console.log('\nBrowser Information:');
  console.log('- User Agent:', navigator.userAgent);
  console.log('- URL:', window.location.href);
  console.log('- Origin:', window.location.origin);
  console.log('- Protocol:', window.location.protocol);
  
  console.log('\nLocal Storage (Auth Related):');
  const authKeys = Object.keys(localStorage).filter(key => 
    key.toLowerCase().includes('auth') || 
    key.toLowerCase().includes('token') ||
    key.toLowerCase().includes('user') ||
    key.toLowerCase().includes('login')
  );
  
  if (authKeys.length > 0) {
    authKeys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value && value.length > 50) {
        console.log(`- ${key}: ${value.substring(0, 50)}... (truncated)`);
      } else {
        console.log(`- ${key}:`, value);
      }
    });
  } else {
    console.log('- No auth-related keys found in localStorage');
  }
  
  console.groupEnd();
};

export const logNetworkRequest = (url: string, options: any, description: string) => {
  console.group(`🌐 Network Request: ${description}`);
  console.log('URL:', url);
  console.log('Method:', options.method || 'GET');
  
  if (options.headers) {
    console.log('Headers:');
    Object.entries(options.headers).forEach(([key, value]) => {
      if (key.toLowerCase().includes('authorization')) {
        const valueStr = String(value);
        if (valueStr.length > 50) {
          console.log(`  ${key}: ${valueStr.substring(0, 50)}... (truncated)`);
        } else {
          console.log(`  ${key}:`, value);
        }
      } else {
        console.log(`  ${key}:`, value);
      }
    });
  }
  
  if (options.body) {
    try {
      const body = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
      console.log('Body:', body);
    } catch {
      console.log('Body (raw):', options.body);
    }
  }
  
  console.groupEnd();
};

export const logAuthError = (error: any, context: string) => {
  console.group(`🚨 Authentication Error: ${context}`);
  console.error('Error:', error);
  
  if (error.response) {
    console.log('Response Status:', error.response.status);
    console.log('Response Data:', error.response.data);
    console.log('Response Headers:', error.response.headers);
  }
  
  if (error.graphQLErrors) {
    console.log('GraphQL Errors:', error.graphQLErrors);
  }
  
  if (error.networkError) {
    console.log('Network Error:', error.networkError);
  }
  
  console.groupEnd();
};