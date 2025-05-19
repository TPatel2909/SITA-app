export const environment = {
  production: false,
  apiUrl: '/api',
  gatewayurl: '/api/home/SITA/com.eibus.web.soap.Gateway.wcp',
  appWorks: {
    baseUrl: '/api',
    // SAML authentication is handled by the browser/session
    // No need for API key, client ID, or client secret
    defaultLanguage: 'en-US',
    defaultTimezone: 'Africa/Johannesburg'
  }
};