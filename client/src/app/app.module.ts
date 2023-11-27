import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { HttpClientModule } from '@angular/common/http';
import { BookFlightComponent } from './book-flight/book-flight.component';

@NgModule({
  declarations: [AppComponent, NavComponent, SearchFlightsComponent, BookFlightComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
