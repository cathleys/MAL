/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { BookingDto } from '../models/booking-dto';
import { cancelBooking } from '../fn/booking/cancel-booking';
import { CancelBooking$Params } from '../fn/booking/cancel-booking';
import { getAllBookings } from '../fn/booking/get-all-bookings';
import { GetAllBookings$Params } from '../fn/booking/get-all-bookings';
import { getAllBookings$Plain } from '../fn/booking/get-all-bookings-plain';
import { GetAllBookings$Plain$Params } from '../fn/booking/get-all-bookings-plain';

@Injectable({ providedIn: 'root' })
export class BookingService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllBookings()` */
  static readonly GetAllBookingsPath = '/api/Booking/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBookings$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBookings$Plain$Response(params: GetAllBookings$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookingDto>>> {
    return getAllBookings$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllBookings$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBookings$Plain(params: GetAllBookings$Plain$Params, context?: HttpContext): Observable<Array<BookingDto>> {
    return this.getAllBookings$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookingDto>>): Array<BookingDto> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBookings()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBookings$Response(params: GetAllBookings$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookingDto>>> {
    return getAllBookings(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllBookings$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBookings(params: GetAllBookings$Params, context?: HttpContext): Observable<Array<BookingDto>> {
    return this.getAllBookings$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookingDto>>): Array<BookingDto> => r.body)
    );
  }

  /** Path part for operation `cancelBooking()` */
  static readonly CancelBookingPath = '/api/Booking';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cancelBooking()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  cancelBooking$Response(params?: CancelBooking$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return cancelBooking(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cancelBooking$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  cancelBooking(params?: CancelBooking$Params, context?: HttpContext): Observable<void> {
    return this.cancelBooking$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
