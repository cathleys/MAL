import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../api/services';
import { Flight } from '../api/models';
import { AuthService } from '../_auth/auth.service';
import { FormBuilder } from '@angular/forms';

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
    private flightService: FlightService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  //a lifecycle hook that is being called once,after the component is being initialized
  ngOnInit(): void {
    if (!this.authService.currentUser) {
      this.router.navigateByUrl('/register');
    }

    this.getFlight();
  }

  form = this.fb.group({
    number: [1],
  });

  getFlight() {
    this.route.paramMap.subscribe({
      next: (param) => this.findFlightbyId(param.get('flightId')),
    });
  }

  book() {
    console.log(
      `Booking ${this.form.get('number')?.value} passengers ${this.flight.id}`
    );
  }

  private findFlightbyId(flightId: string | null) {
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
