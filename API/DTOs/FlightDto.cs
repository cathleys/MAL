namespace API.DTOs;

public record FlightDto(
    Guid Id,
    string Airline,
    string Price,
    TimePlaceDto Departure,
    TimePlaceDto Arrival,
    int RemainingNumberOfSeats
);
