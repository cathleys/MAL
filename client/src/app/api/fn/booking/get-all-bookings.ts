/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookingDto } from '../../models/booking-dto';

export interface GetAllBookings$Params {
  email: string;
}

export function getAllBookings(http: HttpClient, rootUrl: string, params: GetAllBookings$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookingDto>>> {
  const rb = new RequestBuilder(rootUrl, getAllBookings.PATH, 'get');
  if (params) {
    rb.path('email', params.email, {"style":"simple"});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BookingDto>>;
    })
  );
}

getAllBookings.PATH = '/api/Booking/{email}';
