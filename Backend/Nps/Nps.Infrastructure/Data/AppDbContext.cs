namespace Nps.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;



public class AppDbContext : DbContext
{
    public DbSet<CustomerResponse> Responses => Set<CustomerResponse>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}