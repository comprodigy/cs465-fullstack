import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListing implements OnInit {
  trips$: Observable<Trip[]> = of([]);   // observable instead of plain array
  message = 'Loading trips...';

  constructor(private tripDataService: TripData, private router: Router) {}

  ngOnInit(): void {
    this.trips$ = this.tripDataService.getTrips().pipe(
      catchError(err => {
        console.error('Error loading trips', err);
        this.message = 'Error loading trips';
        return of([]);
      })
    );
  }

  
  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }
}