import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit {
  editForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripData
  ) {}

  ngOnInit(): void {
    const tripCode = localStorage.getItem('tripCode');

    if (!tripCode) {
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.tripService.getTrip(tripCode).subscribe({
      next: (value: any) => {
        // backend find() often returns an array
        const trip: Trip = Array.isArray(value) ? value[0] : value;

        if (!trip) {
          this.router.navigate(['']);
          return;
        }

        // date input needs yyyy-MM-dd
        const startDate = trip.start
          ? new Date(trip.start).toISOString().slice(0, 10)
          : '';

        this.editForm.patchValue({
          _id: (trip as any)._id,
          code: trip.code,
          name: trip.name,
          length: trip.length,
          start: startDate,
          resort: trip.resort,
          perPerson: trip.perPerson,
          image: trip.image,
          description: trip.description
        });
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
    }
  }

  get f() {
    return this.editForm.controls;
  }
}