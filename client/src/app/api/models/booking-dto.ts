/* tslint:disable */
/* eslint-disable */
import { TimePlaceDto } from '../models/time-place-dto';
export interface BookingDto {
  airline?: string | null;
  arrival?: TimePlaceDto;
  departure?: TimePlaceDto;
  emailAddress?: string | null;
  id?: string;
  numberOfBookedSeats?: number;
  price?: string | null;
}
