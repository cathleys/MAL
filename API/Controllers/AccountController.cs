﻿using API.Data;
using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly Entities _entities;
    public AccountController(Entities entities)
    {
        _entities = entities;
    }

    [HttpPost]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(500)]
    public ActionResult<AppUser> Register(RegisterDto registerDto)
    {
        var user = new AppUser(registerDto.Id, registerDto.Email, registerDto.FirstName,
        registerDto.LastName, registerDto.Gender, registerDto.Password);

        _entities.Passengers.Add(user);
        _entities.SaveChanges();

        return NoContent();
    }

    [HttpGet("{email}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(500)]
    public ActionResult<PassengerDto> GetPassenger(string email)
    {

        var passenger = _entities.Passengers.FirstOrDefault(p => p.Email == email);
        if (passenger is null) return NotFound();


        return new PassengerDto
        {
            Email = passenger.Email,
            FirstName = passenger.FirstName,
            LastName = passenger.LastName
        };


    }

}
