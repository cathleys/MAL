/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Flight } from '../../models/flight';

export interface GetFlights$Plain$Params {
}

export function getFlights$Plain(http: HttpClient, rootUrl: string, params?: GetFlights$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Flight>>> {
  const rb = new RequestBuilder(rootUrl, getFlights$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Flight>>;
    })
  );
}

getFlights$Plain.PATH = '/api/Flight';
