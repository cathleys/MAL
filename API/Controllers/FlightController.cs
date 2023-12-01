using API.Data;
using API.DTOs;
using API.Models;
using API.Models.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

//NOTE: 
// DTOs/ Read Models / View Models - for transferring information
// Models/Entities -for storing data into database

[ProducesResponseType(400)]
[ProducesResponseType(500)]
public class FlightController : BaseApiController
{
        private readonly Entities _entities;
        public FlightController(Entities entities)
        {
                _entities = entities;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<FlightDto>), 200)]
        public ActionResult<IEnumerable<FlightDto>> GetFlights()
        {
                var flights = _entities.Flights.Select(flight => new FlightDto(
                        flight.Id,
                        flight.Airline,
                        flight.Price,
                        new TimePlaceDto(flight.Departure.Place.ToString(), flight.Departure.Time),
                        new TimePlaceDto(flight.Arrival.Place.ToString(), flight.Arrival.Time),
                        flight.RemainingNumberOfSeats
                )).ToList();

                return flights;
        }


        [HttpGet("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(typeof(Flight), 200)]
        public ActionResult<FlightDto> GetFlight(Guid id)
        {
                var flight = _entities.Flights.FirstOrDefault(f => f.Id == id);

                if (flight is null) return NotFound();

                var flightDto = new FlightDto(
                        flight.Id,
                        flight.Airline,
                        flight.Price,
                        new TimePlaceDto(flight.Departure.Place.ToString(), flight.Departure.Time),
                        new TimePlaceDto(flight.Arrival.Place.ToString(), flight.Arrival.Time),
                        flight.RemainingNumberOfSeats
                );
                return Ok(flightDto);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public ActionResult BookFlight(BookDto bookDto)
        {
                var flight = _entities.Flights.FirstOrDefault(f => f.Id == bookDto.FlightId);

                if (flight is null) return NotFound();

                var error = flight.MakeBooking(bookDto.EmailAddress, bookDto.NumberOfSeats);

                if (error is OverbookError) return Conflict(new { message = "Not enough seats" });

                System.Diagnostics.Debug.WriteLine($"Booking a new flight {bookDto.FlightId}");
                return NoContent();
        }

}

