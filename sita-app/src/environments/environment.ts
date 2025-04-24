export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appWorks: {
    baseUrl: 'http://eimbpm2.dcxeim.local:81',
    // SAML authentication is handled by the browser/session
    // No need for API key, client ID, or client secret
    defaultLanguage: 'en-US',
    defaultTimezone: 'Africa/Johannesburg'
  }
}; 