import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@russon77/angular-jwt';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { ErrorInterceptorService } from './services/error.interceptor.service';
import { AuthService } from './services/auth.service';


export function jwtOptionsFactory(authService: AuthService) {
  return {
    tokenGetter: () => {
      return new Promise<string>(
        (resolve, reject) => {
          // add authorization header with jwt token if available
          const currentUser = authService.currentUserValue;

          if (currentUser && currentUser.jwt) {
            // check validity of token
            const helper = new JwtHelperService();

            if (helper.isTokenExpired(currentUser.jwt)) {
              // if token is expired, refresh it
              return authService
                .refresh()
                .subscribe(
                  ({jwt}) => {
                    return resolve(jwt);
                  }
                );
            }

            return resolve(currentUser.jwt);
          }
        }
      );
    },
    whitelistedDomains: environment.whitelistedDomains,
    blacklistedRoutes: environment.blacklistedRoutes,
    skipWhenExpired: true
  };
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-top-center'
    }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [AuthService]
      }
    })],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
