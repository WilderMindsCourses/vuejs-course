using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheStore.Data
{
  public class StoreContextFactory : IDesignTimeDbContextFactory<StoreContext>
  {
    public StoreContext CreateDbContext(string[] args)
    {
      // Create a configuration 
      var builder = new WebHostBuilder();
      var config = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("config.json")
        .Build();

      return new StoreContext(new DbContextOptionsBuilder<StoreContext>().Options, config);
    }
  }
}
