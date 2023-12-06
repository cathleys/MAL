/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FlightDto } from '../../models/flight-dto';

export interface GetFlights$Plain$Params {
  from?: string;
  destination?: string;
  fromDate?: string;
  toDate?: string;
  numberOfPassengers?: number;
}

export function getFlights$Plain(http: HttpClient, rootUrl: string, params?: GetFlights$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FlightDto>>> {
  const rb = new RequestBuilder(rootUrl, getFlights$Plain.PATH, 'get');
  if (params) {
    rb.query('from', params.from, {"style":"form"});
    rb.query('destination', params.destination, {"style":"form"});
    rb.query('fromDate', params.fromDate, {"style":"form"});
    rb.query('toDate', params.toDate, {"style":"form"});
    rb.query('numberOfPassengers', params.numberOfPassengers, {"style":"form"});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<FlightDto>>;
    })
  );
}

getFlights$Plain.PATH = '/api/Flight';
