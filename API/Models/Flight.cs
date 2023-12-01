using API.Models.Errors;

namespace API.Models;

public record Flight(
    Guid Id,
    string Airline,
    string Price,
    TimePlace Departure,
    TimePlace Arrival,
    int RemainingNumberOfSeats

)
{
    public IList<Booking> Bookings = new List<Booking>();
    //make immutable
    public int RemainingNumberOfSeats { get; set; } = RemainingNumberOfSeats;

    public object? MakeBooking(string emailAddress, byte numberOfSeats)
    {
        //Domain / business logic = solves business problem which is for people to book a flight
        //Domain rule validation = beyond code validation, it is a high level validation pertains to solving business problem

        var flight = this;
        if (flight.RemainingNumberOfSeats < numberOfSeats)
        {
            return new OverbookError();
        };

        var book = new Booking(
                emailAddress,
                numberOfSeats
        );

        flight.Bookings.Add(book);
        flight.RemainingNumberOfSeats -= numberOfSeats;
        return null;
    }
}

