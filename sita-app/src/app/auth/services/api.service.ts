import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface AppWorksResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface AppWorksError {
  code: string;
  message: string;
  details?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.appWorks.baseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAppWorksHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json, text/javascript, */*',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Accept-Timezone': 'Africa/Johannesburg',
      'Cache-Control': 'no-cache,no-store',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 0) {
        errorMessage = 'Unable to connect to the server. Please check your network connection and ensure the AppWorks server is running.';
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }

  // Generic GET request for AppWorks
  getAppWorks<T>(endpoint: string): Observable<AppWorksResponse<T>> {
    return this.http.get<AppWorksResponse<T>>(
      `${this.baseUrl}${endpoint}`,
      { 
        headers: this.getAppWorksHeaders(),
        withCredentials: true // Important for CORS with credentials
      }
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Generic POST request for AppWorks
  postAppWorks<T>(endpoint: string, body: any): Observable<AppWorksResponse<T>> {
    return this.http.post<AppWorksResponse<T>>(
      `${this.baseUrl}${endpoint}`,
      body,
      { 
        headers: this.getAppWorksHeaders(),
        withCredentials: true // Important for CORS with credentials
      }
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Generic PUT request for AppWorks
  putAppWorks<T>(endpoint: string, body: any): Observable<AppWorksResponse<T>> {
    return this.http.put<AppWorksResponse<T>>(
      `${this.baseUrl}${endpoint}`,
      body,
      { headers: this.getAppWorksHeaders() }
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Generic DELETE request for AppWorks
  deleteAppWorks<T>(endpoint: string): Observable<AppWorksResponse<T>> {
    return this.http.delete<AppWorksResponse<T>>(
      `${this.baseUrl}${endpoint}`,
      { headers: this.getAppWorksHeaders() }
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Example AppWorks API methods
  // Replace these with your actual AppWorks API endpoints

  // Get all applications from AppWorks
  getAppWorksApplications(): Observable<AppWorksResponse<any[]>> {
    return this.getAppWorks<any[]>('/applications');
  }

  // Get application by ID from AppWorks
  getAppWorksApplicationById(id: string): Observable<AppWorksResponse<any>> {
    return this.getAppWorks<any>(`/applications/${id}`);
  }

  // Create new application in AppWorks
  createAppWorksApplication(applicationData: any): Observable<AppWorksResponse<any>> {
    return this.postAppWorks<any>('/applications', applicationData);
  }

  // Update application in AppWorks
  updateAppWorksApplication(id: string, applicationData: any): Observable<AppWorksResponse<any>> {
    return this.putAppWorks<any>(`/applications/${id}`, applicationData);
  }

  // Delete application from AppWorks
  deleteAppWorksApplication(id: string): Observable<AppWorksResponse<any>> {
    return this.deleteAppWorks<any>(`/applications/${id}`);
  }

  // Get ResultItems for a specific Element
  getElementResultItems(elementId: string): Observable<AppWorksResponse<any>> {
    const endpoint = `/home/Training/app/entityRestService/Elements(${elementId})/ResultItems?include=PropDescs,Rules,Usage&language=en-US`;
    return this.postAppWorks<any>(endpoint, {});
  }

  // Get all Training Elements
  getTrainingElements(): Observable<AppWorksResponse<any>> {
    const endpoint = '/home/Training/app/entityRestService/Elements';
    return this.getAppWorks<any>(endpoint);
  }
}
