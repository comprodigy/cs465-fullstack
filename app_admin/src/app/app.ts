import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, TripListing],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Travlr Getaways Admin!');
}
