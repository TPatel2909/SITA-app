import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Environment } from '../../../environments/environment.interface';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private isBrowser: boolean;

  // Mock test user
  private readonly TEST_USER: User = {
    id: '1',
    email: 'testuser@email.com',
    firstName: 'Test',
    lastName: 'User'
  };
  private readonly TEST_PASSWORD = 'Password01';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    let storedUser = null;
    
    if (this.isBrowser) {
      try {
        const storedUserStr = localStorage.getItem('currentUser');
        storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
      }
    }
    
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    // Mock authentication for test user
    if (credentials.email === this.TEST_USER.email && credentials.password === this.TEST_PASSWORD) {
      const response: AuthResponse = {
        user: this.TEST_USER,
        token: 'mock-jwt-token'
      };

      if (this.isBrowser) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
      }
      this.currentUserSubject.next(response.user);
      
      return of(response);
    }

    return throwError(() => new Error('Invalid email or password'));
  }

  signup(credentials: SignupCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/signup`, credentials)
      .pipe(
        tap(response => {
          if (this.isBrowser) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
          }
          this.currentUserSubject.next(response.user);
        })
      );
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/reset-password`, { token, newPassword });
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  getToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem('token');
  }
} 