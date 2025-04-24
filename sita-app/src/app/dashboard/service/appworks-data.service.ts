import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface AppWorksFormData {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AppworksDataService {

  private appWorksApiBaseUrl = '/home/Training/app/entityRestService';
  private language = 'en-US';
  private includeParams = 'All,Usage,Relation.ToOne.TargetGhostItem,Layout.Element=020025AD005FA1F08548BF9F0C636B0B';
  private samlart = 'e0pBVkEtQUVTL0dDTS9Ob1BhZGRpbmd9Vw56AhLPIHWxwwQPmJuZyXn41M8OKYKFlFP6PtYL6d3b3fmmTdXpGdT99PqHN6LWiIPLhbnSrsx/cpzn1ky4Mm8oQmy26KFS7W22FfzRAfKhaU5a7GvSdIkI5DK/t5QWOmTmX0fN0Sak8RjmwpY='; // Store the samlart

  constructor(private http: HttpClient) { }

  fetchItemData(itemIdentifier: string): Observable<AppWorksFormData> {
    const url = `${this.appWorksApiBaseUrl}/Items(${itemIdentifier})?include=${this.includeParams}&language=${this.language}&samlart=${this.samlart}`;
    const headers = this.getHttpHeaders();
  
    return this.http.get<any>(url, { headers })
      .pipe(
        // Log the raw response to see what's coming back
        catchError(preTapError => {
          console.error('Error BEFORE tap:', preTapError);
          return throwError(() => preTapError); // Re-throw the error
        }),
        tap(response => {
          console.log('Raw API response:', response);
          if (typeof response === 'string') {
            console.warn('String response — possibly HTML:', response.slice(0, 200));
          }
        }),
        
        map((response: any) => {
          // Check if response has the expected structure
          if (response && typeof response === 'object') {
            return response as AppWorksFormData;
          } else {
            throw new Error('Invalid response format');
          }
        }),
        catchError(this.handleError)
      );
  }


  private getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  private handleError(error: HttpErrorResponse | Error) {
    console.log('Error object:', error);
    
    // If it's already an Error instance (like from our map function)
    if (!(error instanceof HttpErrorResponse)) {
      return throwError(() => error);
    }
    
    // Otherwise handle HTTP errors
    let errorMessage = 'An unknown error occurred.';
    if (error.error) {
      errorMessage = typeof error.error === 'string' ? 
        `Error: ${error.error}` : 
        error.error.message ? 
          `Error: ${error.error.message}` : 
          `Error: Status ${error.status}, Text: ${error.statusText}`;
    } else if (error.message) {
      errorMessage = `Error: ${error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.statusText}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}