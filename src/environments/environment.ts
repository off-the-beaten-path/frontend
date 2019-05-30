// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  VERSION: '0.dev',
  production: false,
  api: 'http://localhost:5000',
  whitelistedDomains: ['localhost:5000'],
  blacklistedRoutes: [
    'http://localhost:5000/user/login',
    'http://localhost:5000/user/refresh',
    'http://localhost:5000/user/register',
    'http://localhost:5000/user/password/forgot',
    'http://localhost:5000/user/password/reset',
    'http://localhost:5000/user/verify',
    'http://localhost:5000/stats/global/',
  ],
  checkinMaxDistance: 10
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
