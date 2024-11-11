import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { environment } from '../views/view-player/appSettings';
import { ResponseAcceso } from '../interfaces/responseAcceso';
import { catchError, map, Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  isAuthenticated$: Observable<boolean>;
  private isBrowser: boolean;

  isLoggedIn: boolean = false;
  private apiUrl: String = environment.apiUrl;
  router = inject(Router);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  initializeAuthentication(): void {
    if (this.isBrowser) {
      const token = localStorage.getItem('JWT_Token');
      this.isLoggedIn = !!token;
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('JWT_Token');
    }
    return null;
  }

  login(username: string, password: string): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(`${this.apiUrl}users/login`, {username, password})
    .pipe(
      tap(response => {
        if (response.token && this.isBrowser) {
          localStorage.setItem('JWT_Token', response.token);
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/players']);
        }
      })
    )
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('JWT_Token');
    }
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.hasValidToken();
  }

  isLogin(): boolean {
    return this.isLoggedIn;
  }

  getDecodedToken(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwt_decode.jwtDecode(token);
      } catch (err) {
        console.error('Error Decoding token', err);
        return null;
      }
    }
    return null;
  }

  signup(username: string, password: string): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(`${this.apiUrl}users/signup`, {username, password})
    .pipe(
      map((response) => {
        if(response) {
          this.router.navigate(['/login']);
        }
        return response;
      })
    )
  }

  private hasValidToken(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    const token = localStorage.getItem('JWT_Token');
    return !!token;
  }
}
