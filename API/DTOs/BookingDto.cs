namespace API.DTOs;

public record BookingDto
(
    Guid Id,
    string Airline,
    string Price,
    TimePlaceDto Departure,
    TimePlaceDto Arrival,
    int NumberOfBookedSeats,
    string EmailAddress
);
