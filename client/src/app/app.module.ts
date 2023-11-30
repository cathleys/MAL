import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { HttpClientModule } from '@angular/common/http';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { RegisterComponent } from './account/register/register.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchFlightsComponent,
    BookFlightComponent,
    RegisterComponent,
    MyBookingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
