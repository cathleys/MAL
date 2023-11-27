import { Component } from '@angular/core';
import { FlightService } from './../api/services';
import { Flight } from '../api/models';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css'],
})
export class SearchFlightsComponent {
  searchFlights: Flight[] = [];

  constructor(private flightService: FlightService) {}

  getFlights() {
    this.flightService.getFlights().subscribe({
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
