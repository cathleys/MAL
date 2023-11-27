import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../api/services';
import { Flight } from '../api/models';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css'],
})
export class BookFlightComponent implements OnInit {
  flightId: string = 'not loaded';
  flight: Flight = {};

  //is being called once, right before the props,states are set
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService
  ) {}

  //a lifecycle hook that is being called once,after the component is being initialized
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (param) => this.findFlight(param.get('flightId')),
    });
  }

  private findFlight(flightId: string | null) {
    this.flightId = flightId ?? 'not passed';

    this.flightService.getFlight({ id: this.flightId }).subscribe({
      next: (flight) => (this.flight = flight),
      error: this.handleError,
    });
  }

  private handleError = (err: any) => {
    if (err.status !== null) {
      alert('something went wrong');
      this.router.navigateByUrl('/');
    }
    console.log('Response Error. Status: ', err.status);
    console.log('Response Error. Status Text: ', err.statusText);
    console.log(err);
  };
}
