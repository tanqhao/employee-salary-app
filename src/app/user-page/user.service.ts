import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserPayload } from './user.model';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(protected http: HttpClient) {
  }

  getUsers() {
    return this.http.get<UserPayload>
    (`${environment.apiUrl}/user/users`,
    { observe: 'body' }).pipe(
      map((responseData) => {
        return responseData.results;
      }),
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }

  getUsersFilter(minSalary: number, maxSalary: number, sortBy: string, limit: number, offset: number) {
    return this.http.get<UserPayload>
    (`${environment.apiUrl}/user/users?minSalary=${minSalary}&maxSalary=${maxSalary}&offset=${offset}&limit=${limit}&sort=${sortBy}`,
    { observe: 'body' }).pipe(
      map((responseData) => {
        return responseData.results;
      }),
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }

}
