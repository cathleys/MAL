using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public record RegisterDto(
   [Required][Display(Name = "Email Address")][EmailAddress][StringLength(75, MinimumLength = 3)] string Email,
   [Required] string FirstName,
   [Required] string LastName,
    [Required] bool Gender,
    [Required] string Password
);
