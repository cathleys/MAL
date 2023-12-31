import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../api/services';
import { BookDto, Flight } from '../api/models';
import { AuthService } from '../_auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

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
    this.getFlight();
  }

  form = this.fb.group({
    number: [1, [Validators.required, Validators.min(1), Validators.max(254)]],
  });

  getFlight() {
    this.route.paramMap.subscribe({
      next: (param) => this.findFlightbyId(param.get('flightId')),
    });
  }

  book() {
    const numberOfSeats = this.form.get('number')?.value;

    if (this.form.invalid || !numberOfSeats) return;

    const booking: BookDto = {
      flightId: this.flightId,
      emailAddress: this.authService.currentUser?.email,
      numberOfSeats: numberOfSeats,
    };

    this.flightService.bookFlight({ body: booking }).subscribe({
      next: () => this.router.navigateByUrl('/my-booking'),
      error: this.handleError,
    });
  }

  private findFlightbyId(flightId: string | null) {
    this.flightId = flightId ?? 'not passed';

    this.flightService.getFlight({ id: this.flightId }).subscribe({
      next: (flight) => (this.flight = flight),
      error: this.handleError,
    });
  }

  get number() {
    return this.form.controls.number;
  }

  private handleError = (err: any) => {
    if (err.status === 404) {
      alert('something went wrong');
      this.router.navigateByUrl('/');
    }
    if (err.status === 409) {
      alert(JSON.parse(err.error).message);
    }
    console.log('Response Error. Status: ', err.status);
    console.log('Response Error. Status Text: ', err.statusText);
    console.log(err);
  };
}
