import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppworksService {

  private baseUrl = '/home/SITA/app/entityRestService';
  private defaultEntityId = '7e1116a15ce336eca73a9285dfc2b8ac.020025AD005FA1F0881140647627AB0B';

  private commonHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Samlart': 'e0pBVkEtQUVTL0dDTS9Ob1BhZGRpbmd9Of4NH1fsBeha50GTsX5lj+Cr+12BxfbhxQPxrOUkY573WH/8/E6Boe14lRfI9VYbeY7ElSDuz2dxdZCRB6MEAvD5qI9E0rc8taubQI1Mz6gfAkwbCvBXoQSmsv8v54k/v5vNnkVZryoCGLcU',
    'Cookie': 'defaultinst_AuthContext=1.rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAN3CAAAAAQAAAACdAAOT3JnYW5pemF0aW9uRE50AC5vPVNJVEEsY249Y29yZHlzLGNuPWRlZmF1bHRJbnN0LG89ZGN4ZWltLmxvY2FsdAAGQXV0aElEdAAET1REU3g='
  });

  constructor(private http: HttpClient) {}

  getAppWorksData(entityId?: string, itemId?: string): Observable<any> {
    let url = '';

    if (itemId) {
      url = `${this.baseUrl}/Items(${itemId})?include=All,Usage,Relation.ToOne.TargetGhostItem,Layout.Element=${entityId || this.defaultEntityId}&language=en-US`;
    } else if (entityId) {
      url = `${this.baseUrl}/Elements(${entityId})/ResultItems?include=PropDescs,Rules,Usage&language=en-US`;
    } else {
      return throwError(() => new Error('Missing required parameter: entityId or itemId'));
    }

    return this.http.get(url, { headers: this.commonHeaders, responseType: 'text' }).pipe(
      map((rawResponse: string) => {
        try {
          return JSON.parse(rawResponse);
        } catch (e) {
          console.error('Non-JSON response from AppWorks:', rawResponse);
          throw e;
        }
      }),
      catchError(error => {
        console.error('Error calling AppWorks:', error);
        return throwError(() => error);
      })
    );
  }

  postAppWorksData(entityId: string, payload: any): Observable<any> {
    const url = `${this.baseUrl}/Elements(${entityId})/Items?language=en-US`;
  
    return this.http.post(url, payload, {
      headers: this.commonHeaders,
      responseType: 'text'
    }).pipe(
      map((rawResponse: string) => {
        try {
          return JSON.parse(rawResponse);
        } catch (e) {
          console.error('Non-JSON response from AppWorks POST:', rawResponse);
          throw e;
        }
      }),
      catchError(error => {
        console.error('Error posting to AppWorks:', error);
        return throwError(() => error);
      })
    );
  }
  
}
