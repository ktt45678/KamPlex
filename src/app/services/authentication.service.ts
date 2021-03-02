import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment';

import { User, Token } from '../modules/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl: string = environment.apiUrl;
  private refreshTokenTimeout: any;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const user = this.accessTokenValue ? jwt_decode<User>(this.accessTokenValue) : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get accessTokenValue() {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken ? JSON.parse(accessToken) : null;
  }

  public get refreshTokenValue() {
    const refreshToken = localStorage.getItem('refreshToken');
    return refreshToken ? JSON.parse(refreshToken) : null;
  }

  public get currentUserValue(): User | null {
    if (this.currentUserSubject.value) {
      return this.currentUserSubject.value;
    }
    return null;
  }

  public setCurrentUser() {
    return this.http.get<User>(`${this.apiUrl}/user`).pipe(map(data => {
      this.currentUserSubject.next(data);
      return data;
    }));
  }

  login(body: any = {}) {
    return this.http.post<Token>(`${this.apiUrl}/auth/login`, body).pipe(map(data => {
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
      this.setCurrentUser();
      this.startRefreshTokenTimer();
      return data;
    }));
  }

  register(body: any = {}) {
    return this.http.post(`${this.apiUrl}/auth/register`, body);
  }

  sendConfirmEmail(body: any = {}) {
    return this.http.post(`${this.apiUrl}/auth/sendconfirmemail`, body);
  }

  confirmEmail(body: any = {}) {
    return this.http.post(`${this.apiUrl}/auth/confirmemail`, body);
  }

  sendRecoveryEmail(body: any = {}) {
    return this.http.post(`${this.apiUrl}/auth/sendrecoveryemail`, body);
  }

  passwordRecovery(body: any = {}) {
    return this.http.post(`${this.apiUrl}/auth/passwordrecovery`, body);
  }

  resetPassword(body: any = {}) {
    return this.http.post(`${this.apiUrl}/auth/resetpassword`, body);
  }

  refreshToken() {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.refreshTokenValue}` });
    return this.http.post<Token>(`${this.apiUrl}/auth/refreshtoken`, {}, { headers }).pipe(map(data => {
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken));
      this.startRefreshTokenTimer();
      return data;
    }));
  }

  logout() {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.refreshTokenValue}` });
    this.http.post(`${this.apiUrl}/auth/revoketoken`, {}, { headers }).subscribe();
    this.currentUserSubject.next(null);
    this.stopRefreshTokenTimer();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  private startRefreshTokenTimer() {
    // Parse json object from base64 encoded jwt token
    const jwtToken = jwt_decode<any>(this.accessTokenValue);
    // Set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
