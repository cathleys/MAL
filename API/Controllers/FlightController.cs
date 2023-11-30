using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;


[ProducesResponseType(400)]
[ProducesResponseType(500)]
public class FlightController : BaseApiController
{
        static Random random = new Random();

        private static List<Flight> Flights = new List<Flight>
    {
        new (   Guid.NewGuid(),
                "American Airlines",
                random.Next(90, 5000).ToString(),
                new TimePlace("Los Angeles",DateTime.Now.AddHours(random.Next(1, 3))),
                new TimePlace("Istanbul",DateTime.Now.AddHours(random.Next(4, 10))),
                    random.Next(1, 853)),
        new (   Guid.NewGuid(),
                "Deutsche BA",
                random.Next(90, 5000).ToString(),
                new TimePlace("Munchen",DateTime.Now.AddHours(random.Next(1, 10))),
                new TimePlace("Schiphol",DateTime.Now.AddHours(random.Next(4, 15))),
                random.Next(1, 853)),
        new (   Guid.NewGuid(),
                "British Airways",
                random.Next(90, 5000).ToString(),
                new TimePlace("London, England",DateTime.Now.AddHours(random.Next(1, 15))),
                new TimePlace("Vizzola-Ticino",DateTime.Now.AddHours(random.Next(4, 18))),
                    random.Next(1, 853)),
        new (   Guid.NewGuid(),
                "Basiq Air",
                random.Next(90, 5000).ToString(),
                new TimePlace("Amsterdam",DateTime.Now.AddHours(random.Next(1, 21))),
                new TimePlace("Glasgow, Scotland",DateTime.Now.AddHours(random.Next(4, 21))),
                    random.Next(1, 853)),
        new (   Guid.NewGuid(),
                "BB Heliag",
                random.Next(90, 5000).ToString(),
                new TimePlace("Zurich",DateTime.Now.AddHours(random.Next(1, 23))),
                new TimePlace("Baku",DateTime.Now.AddHours(random.Next(4, 25))),
                    random.Next(1, 853)),
        new (   Guid.NewGuid(),
                "Adria Airways",
                random.Next(90, 5000).ToString(),
                new TimePlace("Ljubljana",DateTime.Now.AddHours(random.Next(1, 15))),
                new TimePlace("Warsaw",DateTime.Now.AddHours(random.Next(4, 19))),
                    random.Next(1, 853)),
        new (   Guid.NewGuid(),
                "ABA Air",
                random.Next(90, 5000).ToString(),
                new TimePlace("Praha Ruzyne",DateTime.Now.AddHours(random.Next(1, 55))),
                new TimePlace("Paris",DateTime.Now.AddHours(random.Next(4, 58))),
                    random.Next(1, 853)),
        new (   Guid.NewGuid(),
                "AB Corporate Aviation",
                random.Next(90, 5000).ToString(),
                new TimePlace("Le Bourget",DateTime.Now.AddHours(random.Next(1, 58))),
                new TimePlace("Zagreb",DateTime.Now.AddHours(random.Next(4, 60))),
                    random.Next(1, 853))
        };

        private static IList<BookDto> Bookings = new List<BookDto>();

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Flight>), 200)]
        public ActionResult<IEnumerable<Flight>> GetFlights() => Flights;


        [HttpGet("{id}")]
        [ProducesResponseType(404)]
        [ProducesResponseType(typeof(Flight), 200)]
        public ActionResult<Flight> GetFlight(Guid id)
        {
                var flight = Flights.FirstOrDefault(f => f.Id == id);

                if (flight is null) return NotFound();
                return Ok(flight);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public ActionResult BookFlight(BookDto bookDto)
        {
                var flight = Flights.Any(f => f.Id == bookDto.FlightId);

                if (!flight) return NotFound();

                Bookings.Add(bookDto);
                System.Diagnostics.Debug.WriteLine($"Booking a new flight {bookDto.FlightId}");
                return NoContent();
        }

}

