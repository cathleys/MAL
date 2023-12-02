using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Entities : DbContext
{
    public Entities(DbContextOptions<Entities> options) : base(options)
    {
    }

    public DbSet<AppUser> Passengers => Set<AppUser>();
    public DbSet<Flight> Flights => Set<Flight>();


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<AppUser>().HasKey(a => a.Email);

        modelBuilder.Entity<Flight>().OwnsOne(f => f.Departure);
        modelBuilder.Entity<Flight>().OwnsOne(f => f.Arrival);
    }
}
