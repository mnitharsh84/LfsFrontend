import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services';
import { environment } from 'src/environments/environment';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let headers = null;
        let currentUser  = null;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if(request.headers.has("JwtInterceptor")){
            headers = request.headers.delete("JwtInterceptor");
        } else {
             currentUser = this.authenticationService.currentUserValue;
        }
        const isLoggedIn = currentUser && currentUser.token;

        if (isLoggedIn && isApiUrl) {
                 console.log(' logged IN token: '+ currentUser.token);
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        } else {
            console.log('Not logged IN')
        }
        debugger;

        return next.handle(request);
    }
}