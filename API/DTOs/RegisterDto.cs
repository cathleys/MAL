﻿namespace API.DTOs;

public record RegisterDto(
    string Email,
    string FirstName,
    string LastName,
    string Password,
    bool Gender
);
