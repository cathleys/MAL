/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PassengerDto } from '../../models/passenger-dto';

export interface GetPassenger$Plain$Params {
  email: string;
}

export function getPassenger$Plain(http: HttpClient, rootUrl: string, params: GetPassenger$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<PassengerDto>> {
  const rb = new RequestBuilder(rootUrl, getPassenger$Plain.PATH, 'get');
  if (params) {
    rb.path('email', params.email, {"style":"simple"});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PassengerDto>;
    })
  );
}

getPassenger$Plain.PATH = '/api/Account/{email}';
