import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';
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
    return this.http.get<User[]>(`${environment.apiUrl}/user/users`, { observe: 'body' }).pipe(
      map((responseData) => {
        return responseData;
      }),
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }

}
