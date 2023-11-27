import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { BookFlightComponent } from './book-flight/book-flight.component';

const routes: Routes = [
  { path: '', component: SearchFlightsComponent },
  { path: 'get-flights', component: SearchFlightsComponent },
  { path: 'book-flight/:flightId', component: BookFlightComponent },
  { path: '**', component: SearchFlightsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
