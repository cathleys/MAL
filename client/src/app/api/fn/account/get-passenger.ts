/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PassengerDto } from '../../models/passenger-dto';

export interface GetPassenger$Params {
  email: string;
}

export function getPassenger(http: HttpClient, rootUrl: string, params: GetPassenger$Params, context?: HttpContext): Observable<StrictHttpResponse<PassengerDto>> {
  const rb = new RequestBuilder(rootUrl, getPassenger.PATH, 'get');
  if (params) {
    rb.path('email', params.email, {"style":"simple"});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PassengerDto>;
    })
  );
}

getPassenger.PATH = '/api/Account/{email}';
