/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { bookFlight } from '../fn/flight/book-flight';
import { BookFlight$Params } from '../fn/flight/book-flight';
import { Flight } from '../models/flight';
import { getFlight } from '../fn/flight/get-flight';
import { GetFlight$Params } from '../fn/flight/get-flight';
import { getFlight$Plain } from '../fn/flight/get-flight-plain';
import { GetFlight$Plain$Params } from '../fn/flight/get-flight-plain';
import { getFlights } from '../fn/flight/get-flights';
import { GetFlights$Params } from '../fn/flight/get-flights';
import { getFlights$Plain } from '../fn/flight/get-flights-plain';
import { GetFlights$Plain$Params } from '../fn/flight/get-flights-plain';

@Injectable({ providedIn: 'root' })
export class FlightService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getFlights()` */
  static readonly GetFlightsPath = '/api/Flight';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFlights$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFlights$Plain$Response(params?: GetFlights$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Flight>>> {
    return getFlights$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFlights$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFlights$Plain(params?: GetFlights$Plain$Params, context?: HttpContext): Observable<Array<Flight>> {
    return this.getFlights$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Flight>>): Array<Flight> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFlights()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFlights$Response(params?: GetFlights$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Flight>>> {
    return getFlights(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFlights$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFlights(params?: GetFlights$Params, context?: HttpContext): Observable<Array<Flight>> {
    return this.getFlights$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Flight>>): Array<Flight> => r.body)
    );
  }

  /** Path part for operation `bookFlight()` */
  static readonly BookFlightPath = '/api/Flight';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `bookFlight()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  bookFlight$Response(params?: BookFlight$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return bookFlight(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `bookFlight$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  bookFlight(params?: BookFlight$Params, context?: HttpContext): Observable<void> {
    return this.bookFlight$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getFlight()` */
  static readonly GetFlightPath = '/api/Flight/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFlight$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFlight$Plain$Response(params: GetFlight$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Flight>> {
    return getFlight$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFlight$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFlight$Plain(params: GetFlight$Plain$Params, context?: HttpContext): Observable<Flight> {
    return this.getFlight$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Flight>): Flight => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFlight()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFlight$Response(params: GetFlight$Params, context?: HttpContext): Observable<StrictHttpResponse<Flight>> {
    return getFlight(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFlight$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFlight(params: GetFlight$Params, context?: HttpContext): Observable<Flight> {
    return this.getFlight$Response(params, context).pipe(
      map((r: StrictHttpResponse<Flight>): Flight => r.body)
    );
  }

}
