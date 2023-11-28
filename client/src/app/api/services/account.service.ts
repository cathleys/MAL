/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getPassenger } from '../fn/account/get-passenger';
import { GetPassenger$Params } from '../fn/account/get-passenger';
import { getPassenger$Plain } from '../fn/account/get-passenger-plain';
import { GetPassenger$Plain$Params } from '../fn/account/get-passenger-plain';
import { PassengerDto } from '../models/passenger-dto';
import { register } from '../fn/account/register';
import { Register$Params } from '../fn/account/register';

@Injectable({ providedIn: 'root' })
export class AccountService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/api/Account';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  register$Response(params?: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  register(params?: Register$Params, context?: HttpContext): Observable<void> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getPassenger()` */
  static readonly GetPassengerPath = '/api/Account/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPassenger$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPassenger$Plain$Response(params: GetPassenger$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<PassengerDto>> {
    return getPassenger$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPassenger$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPassenger$Plain(params: GetPassenger$Plain$Params, context?: HttpContext): Observable<PassengerDto> {
    return this.getPassenger$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<PassengerDto>): PassengerDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPassenger()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPassenger$Response(params: GetPassenger$Params, context?: HttpContext): Observable<StrictHttpResponse<PassengerDto>> {
    return getPassenger(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPassenger$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPassenger(params: GetPassenger$Params, context?: HttpContext): Observable<PassengerDto> {
    return this.getPassenger$Response(params, context).pipe(
      map((r: StrictHttpResponse<PassengerDto>): PassengerDto => r.body)
    );
  }

}
