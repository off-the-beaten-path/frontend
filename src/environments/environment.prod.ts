export const environment = {
  VERSION: '0.3',
  production: true,
  api: 'https://otbpapi.tmk.name',
  whitelistedDomains: ['otbpapi.tmk.name'],
  blacklistedRoutes: [
    'https://otbpapi.tmk.name/user/login',
    'https://otbpapi.tmk.name/user/refresh',
    'https://otbpapi.tmk.name/user/register',
  ]
};
