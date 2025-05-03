import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginResponse } from './login-response';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authStatus = new BehaviorSubject<boolean>(false);
  authStatus = this._authStatus.asObservable();

  constructor(private http: HttpClient) { }

  private setauthstatus(value : boolean){
    this._authStatus.next(value);
  }

  login(loginRequest : LoginRequest): Observable<LoginResponse>{
    let url = `${environment.baseUrl}api/Admin/Login`;
    return this.http.post<LoginResponse>(url, loginRequest)
    .pipe(tap(loginResult => {
      if(loginResult.success){
        localStorage.setItem("token7", loginResult.token);
        this.setauthstatus(true);
      }
    }));
  }

  logout(){
    localStorage.removeItem('token7');
    this.setauthstatus(false);
  }

  isAuthenticated() : boolean{
    return localStorage.getItem('token7') != null;
  }

}
