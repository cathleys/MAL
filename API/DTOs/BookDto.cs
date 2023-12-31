﻿using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public record BookDto(

   [Required] Guid FlightId,
   [Required][Display(Name = "Email Address")][EmailAddress][StringLength(75, MinimumLength = 3)] string EmailAddress,
   [Required][Display(Name = "Number Of Seats")][Range(1, 254)] byte NumberOfSeats
);


