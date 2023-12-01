using API.Data;
using API.Models;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddServer(new OpenApiServer
    {
        Description = "Development Server",
        Url = "http://localhost:5000"
    });
    c.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"]}");
});

builder.Services.AddSingleton<Entities>();

var app = builder.Build();

//seed data
var entities = app.Services.CreateScope().ServiceProvider.GetService<Entities>();
var random = new Random();
var seedflights = new List<Flight>{
     new (   Guid.NewGuid(),
                "American Airlines",
                random.Next(90, 5000).ToString(),
                new TimePlace("Los Angeles",DateTime.Now.AddHours(random.Next(1, 3))),
                new TimePlace("Istanbul",DateTime.Now.AddHours(random.Next(4, 10))),
                    5),
        new (   Guid.NewGuid(),
                "Deutsche BA",
                random.Next(90, 5000).ToString(),
                new TimePlace("Munchen",DateTime.Now.AddHours(random.Next(1, 10))),
                new TimePlace("Schiphol",DateTime.Now.AddHours(random.Next(4, 15))),
                random.Next(1, 853)),
        new (   Guid.NewGuid(),
                "British Airways",
                random.Next(90, 5000).ToString(),
                new TimePlace("London, England",DateTime.Now.AddHours(random.Next(1, 15))),
                new TimePlace("Vizzola-Ticino",DateTime.Now.AddHours(random.Next(4, 18))),
                    random.Next(1, 853)),
        new (   Guid.NewGuid(),
                "Basiq Air",
                random.Next(90, 5000).ToString(),
                new TimePlace("Amsterdam",DateTime.Now.AddHours(random.Next(1, 21))),
                new TimePlace("Glasgow, Scotland",DateTime.Now.AddHours(random.Next(4, 21))),
                    random.Next(1, 853)),
        new (   Guid.NewGuid(),
                "BB Heliag",
                random.Next(90, 5000).ToString(),
                new TimePlace("Zurich",DateTime.Now.AddHours(random.Next(1, 23))),
                new TimePlace("Baku",DateTime.Now.AddHours(random.Next(4, 25))),
                    random.Next(1, 853)),
        new (   Guid.NewGuid(),
                "Adria Airways",
                random.Next(90, 5000).ToString(),
                new TimePlace("Ljubljana",DateTime.Now.AddHours(random.Next(1, 15))),
                new TimePlace("Warsaw",DateTime.Now.AddHours(random.Next(4, 19))),
                    random.Next(1, 853)),
        new (   Guid.NewGuid(),
                "ABA Air",
                random.Next(90, 5000).ToString(),
                new TimePlace("Praha Ruzyne",DateTime.Now.AddHours(random.Next(1, 55))),
                new TimePlace("Paris",DateTime.Now.AddHours(random.Next(4, 58))),
                    random.Next(1, 853)),
        new (   Guid.NewGuid(),
                "AB Corporate Aviation",
                random.Next(90, 5000).ToString(),
                new TimePlace("Le Bourget",DateTime.Now.AddHours(random.Next(1, 58))),
                new TimePlace("Zagreb",DateTime.Now.AddHours(random.Next(4, 60))),
                    random.Next(1, 853))
};

entities.Flights.AddRange(seedflights);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(builder => builder.AllowAnyHeader()
.AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:4200"));

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();

