using API.Data;
using API.DTOs;
using API.Models;
using API.Models.Errors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

//NOTE: 
// DTOs/ Read Models / View Models - for transferring information
// Models/Entities -for storing data into database

[ProducesResponseType(400)]
[ProducesResponseType(500)]
public class FlightController : BaseApiController
{
        private readonly ILogger<FlightController> _logger;
        private readonly Entities _entities;
        public FlightController(ILogger<FlightController> logger, Entities entities)
        {
                _logger = logger;
                _entities = entities;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<FlightDto>), 200)]
        public ActionResult<IEnumerable<FlightDto>> GetFlights([FromQuery] FlightSearchParam fsParams)
        {

                _logger.LogInformation("Searching for a flight for: {Destination}", fsParams.Destination);

                IQueryable<Flight> flights = _entities.Flights;

                if (!string.IsNullOrEmpty(fsParams.Destination))
                        flights = flights.Where(f => f.Arrival.Place.Contains(fsParams.Destination));

                if (!string.IsNullOrEmpty(fsParams.From))
                        flights = flights.Where(f => f.Departure.Place.Contains(fsParams.From));

                if (fsParams.FromDate is not null)
                        flights = flights.Where(f => f.Departure.Time >= fsParams.FromDate.Value.Date);

                if (fsParams.ToDate is not null)
                        flights = flights.Where(f => f.Departure.Time <= fsParams.ToDate.Value.Date.AddDays(1).AddTicks(-1));


                if (fsParams.NumberOfPassengers != 0)
                        //do not return those fully booked flights already
                        flights = flights.Where(f => f.RemainingNumberOfSeats >= fsParams.NumberOfPassengers);
                else
                        flights = flights.Where(f => f.RemainingNumberOfSeats >= 1);

                var flightDtos = flights
                .Select(flight => new FlightDto(
                        flight.Id,
                        flight.Airline,
                        flight.Price,
                        new TimePlaceDto(flight.Departure.Place.ToString(), flight.Departure.Time),
                        new TimePlaceDto(flight.Arrival.Place.ToString(), flight.Arrival.Time),
                        flight.RemainingNumberOfSeats
                )).ToList();

                return Ok(flightDtos);
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

                if (error is OverbookError)
                        return Conflict(new { message = "Not enough seats" });


                try
                {
                        _entities.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                        return Conflict(new { message = "An error occured" });

                }

                System.Diagnostics.Debug.WriteLine($"Booking a new flight {bookDto.FlightId}");
                return NoContent();
        }

}

