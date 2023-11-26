using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FlightsController : ControllerBase
{

    [HttpGet]
    public ActionResult<IEnumerable<SearchFlights>> GetFlights()
    {

        var flights = new List<SearchFlights>(){
            new SearchFlights{Id=1,Name ="Philippine Airlines"},
            new SearchFlights{Id=2,Name ="Cebu Pacific"},
            new SearchFlights{Id=3,Name ="Zest Air"},

        };

        return flights;
    }

}
