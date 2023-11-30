namespace API.DTOs;

public record BookDto(
    Guid FlightId,
    string EmailAddress,
    byte NumberOfSeats
);


