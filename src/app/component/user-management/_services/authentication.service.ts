import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, Signup } from '../_models';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    headers = new  HttpHeaders().set("Content-Type", "application/json");

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.headers = this.headers.set("Authorization", '${this.currentUserValue.getToken()}' || '' )

    }

    private getHeaders(options: any = {}) {
        return Object.assign({}, (options.additonalHeaders || {}), {
          'Authorization': '${this.currentUserValue.getToken()}' || ''
        }, {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
    }

    getCustomHeaders(): HttpHeaders {
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set("JwtInterceptor", "JwtInterceptor");
        return headers;
  }

    public get currentUserValue(): User  {
        let user  = null;
        if(this.currentUserSubject){
            user = this.currentUserSubject.value;
        }
        return user;
    }

  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        debugger;
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
       // this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

     public login(username: string, password: string) {
        debugger;
        let headers =  this.headers.set("JwtInterceptor", "JwtInterceptor");

        return this.http.post<User>('http://localhost:8090/api/v1/users/signin?username='+username + '&password='+password, { headers: headers })
            .pipe(map(results => {
                console.log(results);
                debugger;
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                let user = new User();
                 user.id = results.id;
                user.token = results.token;
                user.username = results.username;
                user.email = results.email;
                user.mobilenumber = results.mobilenumber;
                user.fullname = results.fullname;
                user.roles = results.roles;
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            })

            );
    }




public signup(signup: Signup) {
        debugger;
            let headers =  this.headers.set("JwtInterceptor", "JwtInterceptor");
        return this.http.post<User>('http://localhost:8090/api/v1/users/signup', signup, { headers: headers })
            .pipe(
              catchError(this.handleError)
        )
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}