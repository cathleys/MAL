/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Flight } from '../../models/flight';

export interface GetFlight$Params {
  id: string;
}

export function getFlight(http: HttpClient, rootUrl: string, params: GetFlight$Params, context?: HttpContext): Observable<StrictHttpResponse<Flight>> {
  const rb = new RequestBuilder(rootUrl, getFlight.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {"style":"simple"});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Flight>;
    })
  );
}

getFlight.PATH = '/api/Flight/{id}';
