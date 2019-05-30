export const environment = {
  VERSION: '0.7',
  production: true,
  api: 'https://otbpapi.tmk.name',
  whitelistedDomains: ['otbpapi.tmk.name'],
  blacklistedRoutes: [
    'https://otbpapi.tmk.name/user/login',
    'https://otbpapi.tmk.name/user/refresh',
    'https://otbpapi.tmk.name/user/register',
    'https://otbpapi.tmk.name/user/password/forgot',
    'https://otbpapi.tmk.name/user/password/reset',
    'https://otbpapi.tmk.name/user/verify',
    'https://otbpapi.tmk.name/stats/global/',
  ],
  checkinMaxDistance: 10
};
