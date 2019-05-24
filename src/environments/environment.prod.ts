export const environment = {
  VERSION: '0.5',
  production: true,
  api: 'https://otbpapi.tmk.name',
  whitelistedDomains: ['otbpapi.tmk.name'],
  blacklistedRoutes: [
    'https://otbpapi.tmk.name/user/login',
    'https://otbpapi.tmk.name/user/refresh',
    'https://otbpapi.tmk.name/user/register',
    'https://otbpapi.tmk.name/user/password/forgot',
    'https://otbpapi.tmk.name/user/password/reset',
  ],
  checkinMaxDistance: 10
};
