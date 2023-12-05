import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { RegisterComponent } from './account/register/register.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { authGuard } from './_auth/auth.guard';

const routes: Routes = [
  { path: '', component: SearchFlightsComponent },
  { path: 'get-flights', component: SearchFlightsComponent },
  {
    path: 'book-flight/:flightId',
    component: BookFlightComponent,
    canActivate: [authGuard],
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'my-bookings',
    component: MyBookingsComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: SearchFlightsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
