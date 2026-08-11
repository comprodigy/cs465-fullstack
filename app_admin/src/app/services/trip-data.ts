import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  private http = inject(HttpClient);
  private apiBase = 'http://localhost:3000/api/trips';

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiBase);
  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiBase, formData);
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiBase + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    return this.http.put<Trip>(this.apiBase + '/' + formData.code, formData);
  }
}