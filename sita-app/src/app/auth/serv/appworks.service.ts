import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppworksService {
  private apiUrl = 'http://localhost:3000/api/appworks-data'; // Change to your real API endpoint

  constructor(private http: HttpClient) {}

  getAppworksData(ENTITY_ID?: string, ITEM_ID?: string): Observable<any> {
    let params = new HttpParams();
    if (ENTITY_ID) {
      params = params.set('entityId', ENTITY_ID);
    }
    if (ITEM_ID) {
      params = params.set('itemId', ITEM_ID);
    }
    return this.http.get<any>(this.apiUrl, {params});
  }

  // ✅ Add this new method for submitting new data
  addAppworksData(data: any): Observable<any> {
    console.log(data);
    return this.http.post<any>(this.apiUrl, data);
  }
}
