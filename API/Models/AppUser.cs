using System.ComponentModel.DataAnnotations;

namespace API.Models;

public record AppUser(
    string Id,
    string Email,
    string FirstName,
    string LastName,
    bool Gender,
    string Password
);
