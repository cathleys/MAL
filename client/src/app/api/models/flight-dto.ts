/* tslint:disable */
/* eslint-disable */
import { TimePlaceDto } from '../models/time-place-dto';
export interface FlightDto {
  airline?: string | null;
  arrival?: TimePlaceDto;
  departure?: TimePlaceDto;
  id?: string;
  price?: string | null;
  remainingNumberOfSeats?: number;
}
