/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FlightDto } from '../../models/flight-dto';

export interface GetFlights$Params {
  from?: string;
  destination?: string;
  fromDate?: string;
  toDate?: string;
  numberOfPassengers?: number;
}

export function getFlights(http: HttpClient, rootUrl: string, params?: GetFlights$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FlightDto>>> {
  const rb = new RequestBuilder(rootUrl, getFlights.PATH, 'get');
  if (params) {
    rb.query('from', params.from, {"style":"form"});
    rb.query('destination', params.destination, {"style":"form"});
    rb.query('fromDate', params.fromDate, {"style":"form"});
    rb.query('toDate', params.toDate, {"style":"form"});
    rb.query('numberOfPassengers', params.numberOfPassengers, {"style":"form"});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<FlightDto>>;
    })
  );
}

getFlights.PATH = '/api/Flight';
