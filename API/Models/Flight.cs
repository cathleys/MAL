using API.Models.Errors;

namespace API.Models;

public class Flight
{
    public Guid Id { get; set; }
    public string Airline { get; set; }
    public string Price { get; set; }
    public TimePlace Departure { get; set; }
    public TimePlace Arrival { get; set; }
    public int RemainingNumberOfSeats { get; set; }

    public IList<Booking> Bookings = new List<Booking>();

    public Flight()
    {

    }
    public Flight(
    Guid id,
    string airline,
    string price,
    TimePlace departure,
    TimePlace arrival,
    int remainingNumberOfSeats
    )
    {
        Id = id;
        Airline = airline;
        Price = price;
        Departure = departure;
        Arrival = arrival;
        RemainingNumberOfSeats = remainingNumberOfSeats;
    }

    //make immutable

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

