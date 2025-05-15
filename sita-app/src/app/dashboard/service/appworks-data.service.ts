import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap, switchMap, retry } from 'rxjs/operators';

export interface AppWorksFormData {
  [key: string]: any;
}

export interface ResultItemsRequest {
  criteria?: any;
  options?: any;
  paging?: {
    pageSize?: number;
    pageNumber?: number;
  };
  sorting?: Array<{
    property: string;
    direction: 'asc' | 'desc';
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class AppworksDataService {
  // Base URL for the AppWorks REST API
  private appWorksApiBaseUrl = 'http://eimbpm2.dcxeim.local:81/home/SITA/app/entityRestService';
  private language = 'en-US';
  private includeParams = 'PropDescs,Rules,Usage';
  
  // Element ID from your example
  private elementId = '7e1116a15ce336eca73a9285dfc2b8ac.020025AD005FA1F0881140647627AB0B';
  
  constructor(private http: HttpClient) { }

  /**
   * Fetches result items from the AppWorks Elements API
   * @param request Optional request parameters for filtering/paging
   * @returns Observable with the result items
   */
  fetchResultItems(request?: ResultItemsRequest): Observable<AppWorksFormData> {
    // Building URL with proper parameter encoding
    const params = new HttpParams()
      .set('include', this.includeParams)
      .set('language', this.language);
    
    const url = `${this.appWorksApiBaseUrl}/Elements(${this.elementId})/ResultItems`;
    const headers = this.getHttpHeaders();
    
    // Default empty request if none provided
    const body = request || {};
    
    return this.http.post<any>(url, body, { headers, params })
      .pipe(
        // Retry the request up to 2 times on failure
        retry(2),
        
        // Log the raw response for debugging
        tap(response => {
          console.log('Raw API response:', response);
        }),
        
        // Transform response data
        map((response: any) => {
          // Check if response has the expected structure
          if (!response || typeof response !== 'object') {
            throw new Error('Invalid response format');
          }
          
          // If we have a properly formatted response, return it
          return this.transformResponse(response);
        }),
        
        // Handle errors
        catchError(this.handleError.bind(this))
      );
  }
  
  /**
   * Fetches item data from the AppWorks API
   * @param itemIdentifier The ID of the item to retrieve
   * @returns Observable with the item data
   */
  fetchItemData(itemIdentifier: string): Observable<AppWorksFormData> {
    // Building URL with proper parameter encoding
    const params = new HttpParams()
      .set('include', this.includeParams)
      .set('language', this.language);
    
    const url = `${this.appWorksApiBaseUrl}/Items(${encodeURIComponent(itemIdentifier)})`;
    const headers = this.getHttpHeaders();
    
    return this.http.get<any>(url, { headers, params })
      .pipe(
        // Retry the request up to 2 times on failure
        retry(2),
        
        // Log the raw response for debugging
        tap(response => {
          console.log('Raw API response:', response);
        }),
        
        // Transform response data
        map((response: any) => {
          // Check if response has the expected structure
          if (!response || typeof response !== 'object') {
            throw new Error('Invalid response format');
          }
          
          // If we have a properly formatted response, return it
          return this.transformResponse(response);
        }),
        
        // Handle errors
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Transform AppWorks API response into a usable format
   */
  private transformResponse(response: any): AppWorksFormData {
    // Here you can add any data transformation logic
    // For example, flattening nested data or renaming fields
    try {
      // An example transformation - adjust according to your API response structure
      const transformedData: AppWorksFormData = {
        ...response,
        // Add any custom transformations here
      };
      
      return transformedData;
    } catch (error) {
      console.error('Error transforming response:', error);
      throw new Error('Failed to process API response');
    }
  }

  /**
   * Create HTTP headers for AppWorks requests
   */
  private getHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    });
  }

  /**
   * Check if the user is authenticated
   * This is a simplified version - you should implement proper auth checking
   */
  private isAuthenticated(): boolean {
    return true; // We're not using samlart in the new implementation
  }

  /**
   * Handle API errors
   */
  private handleError(error: HttpErrorResponse | Error): Observable<never> {
    console.error('API Error:', error);
    
    // If it's already a processed Error
    if (!(error instanceof HttpErrorResponse)) {
      return throwError(() => error);
    }
    
    // Try to extract meaningful error information
    let errorMessage = 'An unknown error occurred while communicating with AppWorks.';
    
    // Handle different error scenarios
    if (error.status === 0) {
      // A client-side or network error occurred
      errorMessage = 'Network error: Please check your internet connection.';
    } else if (error.status === 401 || error.status === 403) {
      // Authentication or authorization error
      errorMessage = 'Authentication error: Your session may have expired.';
      // Here you could also trigger a re-authentication flow
    } else if (error.status === 404) {
      errorMessage = `The requested item (${error.url}) was not found.`;
    } else if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      errorMessage = `Client error: ${error.error.message}`;
    } else if (error.error) {
      // The API returned an error response
      errorMessage = typeof error.error === 'string' 
        ? `AppWorks error: ${error.error}` 
        : error.error.message 
          ? `AppWorks error: ${error.error.message}` 
          : `AppWorks error: Status ${error.status}, Text: ${error.statusText}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * Create a new item in AppWorks
   * @param data The item data to create
   * @returns Observable with the created item
   */
  createItem(data: AppWorksFormData): Observable<AppWorksFormData> {
    const url = `${this.appWorksApiBaseUrl}/Items`;
    const params = new HttpParams()
      .set('language', this.language);
    const headers = this.getHttpHeaders();
    
    return this.http.post<any>(url, data, { headers, params })
      .pipe(
        tap(response => console.log('Create item response:', response)),
        map(response => this.transformResponse(response)),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Update an existing item in AppWorks
   * @param itemIdentifier The ID of the item to update
   * @param data The updated item data
   * @returns Observable with the updated item
   */
  updateItem(itemIdentifier: string, data: AppWorksFormData): Observable<AppWorksFormData> {
    const url = `${this.appWorksApiBaseUrl}/Items(${encodeURIComponent(itemIdentifier)})`;
    const params = new HttpParams()
      .set('language', this.language);
    const headers = this.getHttpHeaders();
    
    return this.http.put<any>(url, data, { headers, params })
      .pipe(
        tap(response => console.log('Update item response:', response)),
        map(response => this.transformResponse(response)),
        catchError(this.handleError.bind(this))
      );
  }
  
  /**
   * Fetches data with specific criteria from Elements API
   * @param criteria Search criteria object
   * @param pageSize Number of items per page
   * @param pageNumber Page number to retrieve
   * @returns Observable with search results
   */
  searchResultItems(criteria: any, pageSize: number = 20, pageNumber: number = 1): Observable<AppWorksFormData> {
    // Create request object
    const request: ResultItemsRequest = {
      criteria: criteria,
      paging: {
        pageSize: pageSize,
        pageNumber: pageNumber
      },
      sorting: [
        {
          property: 'ModifyDate',
          direction: 'desc'
        }
      ]
    };
    
    return this.fetchResultItems(request);
  }
  
  /**
   * Set the element ID for the ResultItems endpoint
   * @param elementId The new element ID to use
   */
  setElementId(elementId: string): void {
    this.elementId = elementId;
  }
}