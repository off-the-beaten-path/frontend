export const environment = {
  VERSION: '0.1',
  production: true,
  api: 'https://otbpbackend.tmk.name',
  whitelistedDomains: ['otbpbackend.tmk.name'],
  blacklistedRoutes: [
    'https://otbpbackend.tmk.name:8099/user/login',
    'https://otbpbackend.tmk.name:8099/user/refresh',
    'https://otbpbackend.tmk.name:8099/user/register',
  ]
};
