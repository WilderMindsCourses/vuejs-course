using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using TheStore.Data;

namespace TheStore
{
  public class Program
  {
    public static void Main(string[] args)
    {
      BuildHost(args).Run();
    }

    public static IWebHost BuildHost(string[] args)
    {
      var host = WebHost.CreateDefaultBuilder(args)
          .UseStartup<Startup>()
          .ConfigureAppConfiguration(ConfigureConfig)
          .Build();

      using (var scope = host.Services.CreateScope())
      {
        var logger = scope.ServiceProvider.GetService<ILogger<Program>>();
        try
        {
       
          logger.LogInformation("Seeding the database...");
          var initializer = scope.ServiceProvider.GetService<StoreDbInitializer>();
          initializer.SeedAsync().Wait();
        }
        catch (Exception ex)
        {
          logger.LogError(ex, "Failed to seed the database");
        }
      }

      return host;
    }

    private static void ConfigureConfig(WebHostBuilderContext ctx, IConfigurationBuilder bldr)
    {
      bldr.Sources.Clear();
      bldr.SetBasePath(Directory.GetCurrentDirectory());
      bldr.AddJsonFile("config.json", false, true);
      bldr.AddEnvironmentVariables();
    }
  }
}
