import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Employee } from 'src/app/service/vo/employee';
import { DarDTO } from 'src/app/service/vo/dar.dto';
import { RestApiServiceResponse } from 'src/app/service/rest-api.service.response';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap, mergeMap, retry } from 'rxjs/operators';

@Injectable({
providedIn: 'root'
})
export class RestApiService {

    headers = new  HttpHeaders().set("Content-Type", "application/json");
    // Define API
    apiURL = 'http://localhost:8090/api/v1';
    constructor(private http: HttpClient) { }
      /*========================================
        CRUD Methods for consuming RESTful API
      =========================================*/

      // Http Options
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

      // HttpClient API get() method => Fetch employees list
      getEmployees(): Observable<Employee> {
        return this.http.get<Employee>(this.apiURL


        + '/employees')
        .pipe(
          retry(1),
          catchError(this.handleError)
       )
    }
    public createDar(dar: DarDTO) {
        return this.http.post<any>('http://localhost:8090/api/v1/dar/create', dar , { headers: this.headers })
        .pipe(
          catchError(this.handleError)
        )
    }

    public getStates() {
        let headers = this.headers.set("JwtInterceptor", "JwtInterceptor");
        return this.http.get<any>('http://localhost:8090/api/v1/metadata/states', { headers: headers })
            .pipe(
              catchError(this.handleError)
        )
    }

    public getCities(stateId) {
        let headers = this.headers.set("JwtInterceptor", "JwtInterceptor");
            return this.http.get<any>('http://localhost:8090/api/v1/metadata/cities/'+stateId, { headers: headers})
                .pipe(
                  catchError(this.handleError)
        )
    }

    public getServiceRequestList(providerId): Observable<any> {
            return this.http.post<any>('http://localhost:8090/api/v1/dar/listAll',  { providerId: providerId}, { headers: this.headers})
                .pipe(
                  catchError(this.handleError)
        )
    }


// HttpClient API get() method => Fetch employee
    getEmployee(id): Observable<Employee> {
        return this.http.get<Employee>(this.apiURL + '/employees/' + id,  { headers: this.headers })
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }






    // HttpClient API post() method => Create employee
    createEmployee(employee): Observable<Employee> {
        return this.http.post<Employee>(this.apiURL + '/employees', JSON.stringify(employee), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
    )
    }

    // HttpClient API put() method => Update employee
    updateEmployee(id, employee): Observable<Employee> {
        return this.http.put<Employee>(this.apiURL + '/employees/' + id, JSON.stringify(employee), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
    )
    }

    // HttpClient API delete() method => Delete employee
    deleteEmployee(id){
        return this.http.delete<Employee>(this.apiURL + '/employees/' + id, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
    )
    }



    private handleError(error: HttpErrorResponse) {
       debugger;
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened. Please try again later.');
      }

}