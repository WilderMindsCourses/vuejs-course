using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using TheStore.Data.Entities;

namespace TheStore.Data
{

  public class StoreContext : IdentityDbContext<IdentityUser>
  {
    private readonly IConfiguration _config;

    public StoreContext(DbContextOptions<StoreContext> options, IConfiguration config)
      : base(options)
    {
      _config = config;
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Order> Orders { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      base.OnConfiguring(optionsBuilder);

      optionsBuilder.UseSqlServer(_config.GetConnectionString("TheStoreDb"));
    }

    protected override void OnModelCreating(ModelBuilder bldr)
    {
      base.OnModelCreating(bldr);

      bldr.Entity<Product>(e =>
      {
        e.ToTable("Products");
      });

      bldr.Entity<Customer>(e =>
      {
        e.HasMany<Address>(c => c.Addresses);
      });

      bldr.Entity<Address>(e =>
      {
        e.ToTable("Addresses");
      });

      bldr.Entity<Order>(e =>
      {
        e.ToTable("Orders");
        e.HasOne<Customer>(o => o.Customer);
        e.HasOne<Address>(o => o.Address);
        e.HasMany<OrderItem>(o => o.Items);
      });

      bldr.Entity<OrderItem>(e =>
      {
        e.ToTable("OrderItems");
        e.HasOne<Product>();

      });
    }
  }
}