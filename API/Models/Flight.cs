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
}

