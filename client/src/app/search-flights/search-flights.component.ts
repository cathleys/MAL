import { Component, OnInit } from '@angular/core';
import { FlightService } from './../api/services';
import { Flight } from '../api/models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css'],
})
export class SearchFlightsComponent implements OnInit {
  searchFlights: Flight[] = [];
  searchForm: FormGroup = new FormGroup({});

  constructor(private flightService: FlightService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      from: [''],
      destination: [''],
      fromDate: [''],
      toDate: [''],
      numberOfPassengers: [1],
    });
  }

  getFlights() {
    const values = { ...this.searchForm.value };

    this.flightService.getFlights(values).subscribe({
      next: (response) => (this.searchFlights = response),
      error: this.handleError,
    });
  }

  private handleError(err: any) {
    console.log('Response Error. Status: ', err.status);
    console.log('Response Error. Status Text: ', err.statusText);
    console.log(err);
  }
}
