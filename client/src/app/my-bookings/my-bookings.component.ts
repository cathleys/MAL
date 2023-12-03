import { Component, OnInit } from '@angular/core';
import { BookingService } from '../api/services';
import { BookDto, BookingDto } from '../api/models';
import { AuthService } from '../_auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
})
export class MyBookingsComponent implements OnInit {
  bookings!: BookingDto[];

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    const email = this.authService.currentUser?.email;

    if (!email) return this.router.navigateByUrl('/register');
    this.bookingService.getAllBookings({ email: email }).subscribe({
      next: (response) => {
        this.bookings = response;
      },
      error: this.handleError,
    });

    return;
  }

  cancel(bookingDto: BookingDto) {
    const bookDto: BookDto = {
      flightId: bookingDto.id,
      emailAddress: bookingDto.emailAddress,
      numberOfSeats: bookingDto.numberOfBookedSeats,
    };

    this.bookingService.cancelBooking({ body: bookDto }).subscribe({
      next: () =>
        (this.bookings = this.bookings.filter((b) => b !== bookingDto)),
      error: this.handleError,
    });
  }

  private handleError(err: any) {
    console.log('Response error status', err.status);
    console.log('Response error status', err.statusText);
  }
}
