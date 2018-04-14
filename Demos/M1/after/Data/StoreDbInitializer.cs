using CsvHelper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheStore.Data.Entities;

namespace TheStore.Data
{
  public class StoreDbInitializer
  {
    private readonly ILogger<StoreDbInitializer> _logger;
    private readonly StoreContext _ctx;
    private readonly IHostingEnvironment _env;
    private readonly UserManager<IdentityUser> _userManager;

    public StoreDbInitializer(ILogger<StoreDbInitializer> logger, 
      StoreContext ctx, 
      IHostingEnvironment env,
      UserManager<IdentityUser> userManager)
    {
      _logger = logger;
      _ctx = ctx;
      _env = env;
      _userManager = userManager;
    }

    public async Task SeedAsync()
    {
      // Run Migrations
      await _ctx.Database.MigrateAsync();

      if (_userManager.Users.Any() == false)
      {
        _logger.LogInformation("Creating User during Seeding");
        var user = new IdentityUser()
        {
          Email = "shawn@wildermuth.com",
          UserName = "shawn@wildermuth.com"
        };

        var result = await _userManager.CreateAsync(user);
        if (!result.Succeeded) throw new InvalidOperationException("Failed to create user while seeding database");
        result = await _userManager.AddPasswordAsync(user, "P@ssw0rd!");
        if (!result.Succeeded) throw new InvalidOperationException("Failed to set password while seeding database");
      }

      _logger.LogInformation("Calling Seeding of the Database");
      if (!_ctx.Products.Any())
      {
        var path = Path.Combine(_env.ContentRootPath, "Data/pod_gtin.csv");
        var rdr = File.OpenText(path);
        var cfg = new CsvHelper.Configuration.Configuration()
        {
           Delimiter = ";"
        };
        var csv = new CsvReader(rdr, cfg);

        csv.Read();
        csv.ReadHeader();
        var productList = new List<Product>();
        while (csv.Read())
        {
          if (!string.IsNullOrEmpty(csv[1]))
          {
            var p = new Product()
            {
              GTINCode = csv[0],
              ImageUrl = csv[7],
              Brand = csv[9],
              Name = csv[1],
              BrandImageUrl = csv[10],
              BrandUrl = csv[11],
              Category = csv[2],
              ListPrice = new Random().NextDouble() * 10
            };
            productList.Add(p);
            if (productList.Count() >= 5000) break;
          }
        }
        _ctx.Products.AddRange(productList);
        _ctx.SaveChanges();
      }
    }
  }
}
