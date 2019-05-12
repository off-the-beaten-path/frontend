export const environment = {
  VERSION: '0.1',
  production: true,
  api: 'https://otbp-backend.tmk.name:8099',
  whitelistedDomains: ['otbp-backend.tmk.name:8099'],
  blacklistedRoutes: [
    'https://otbp-backend.tmk.name:8099/user/login',
    'https://otbp-backend.tmk.name:8099/user/refresh',
    'https://otbp-backend.tmk.name:8099/user/register',
  ]
};
