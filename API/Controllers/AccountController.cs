using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private static IList<RegisterDto> Passengers = new List<RegisterDto>();

    [HttpPost]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public IActionResult Register(RegisterDto registerDto)
    {
        Passengers.Add(registerDto);
        System.Diagnostics.Debug.WriteLine("Passengers count", Passengers.Count);
        return NoContent();
    }

    [HttpGet("{email}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public ActionResult<PassengerDto> GetPassenger(string email)
    {

        var passenger = Passengers.FirstOrDefault(p => p.Email == email);
        if (passenger is null) return NotFound();

        return new PassengerDto
        {
            Email = passenger.Email,
            FirstName = passenger.FirstName,
            LastName = passenger.LastName
        };


    }

}
