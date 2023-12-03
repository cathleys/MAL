using API.Data;
using API.DTOs;
using API.Models;
using API.Models.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BookingController : BaseApiController
{
    private readonly Entities _entities;

    public BookingController(Entities entities)
    {
        _entities = entities;
    }

    [HttpGet("{email}")]
    [ProducesResponseType(typeof(IEnumerable<BookingDto>), 200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public ActionResult<IEnumerable<BookingDto>> GetAllBookings(string email)
    {
        var bookings = _entities.Flights.ToArray()
        .SelectMany(f => f.Bookings.Where(
            b => b.EmailAddress == email)
            .Select(b => new BookingDto(
                f.Id,
                f.Airline,
                f.Price,
            new TimePlaceDto(f.Departure.Place, f.Departure.Time),
            new TimePlaceDto(f.Arrival.Place, f.Arrival.Time),
                b.NumberOfSeats,
                email
            )));

        return Ok(bookings);
    }

    [HttpDelete]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public ActionResult CancelBooking(BookDto bookDto)
    {

        var flight = _entities.Flights.Find(bookDto.FlightId);

        var error = flight.CancelBooking(bookDto.EmailAddress, bookDto.NumberOfSeats);

        if (error is null)
        {
            _entities.SaveChanges();
            return NoContent();
        }

        if (error is NotFoundError) return NotFound();

        throw new Exception($"The error of type: {error.GetType().Name} occured while cancelling the booking by {bookDto.EmailAddress}");
    }
}
