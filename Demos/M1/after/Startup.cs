using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using TheStore.Data;
using TheStore.Data.Entities;

namespace TheStore
{
  public class Startup
  {
    private readonly IConfiguration _config;

    public Startup(IConfiguration configuration)
    {
      _config = configuration;
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddIdentity<IdentityUser, IdentityRole>(cfg =>
      {
        cfg.User.RequireUniqueEmail = true;
      })
        .AddEntityFrameworkStores<StoreContext>();

      services.AddAuthentication(cfg =>
      {
        cfg.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        cfg.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      })
        .AddJwtBearer(cfg =>
        {
          cfg.TokenValidationParameters = new TokenValidationParameters()
          {
            ValidateIssuer = true,
            ValidIssuer = _config["Security:Tokens:Issuer"],
            ValidateAudience = true,
            ValidAudience = _config["Security:Tokens:Audience"],
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Security:Tokens:Key"])),

          };
        });

      services.AddDbContext<StoreContext>();
      services.AddScoped<IStoreRepository, ProductRepository>();
      services.AddScoped<StoreDbInitializer>();

      services.AddMvc();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseBrowserLink();
      }
      else
      {
        app.UseExceptionHandler("/Root/Error");
      }

      app.UseStaticFiles();

      if (env.IsDevelopment())
      {
        app.UseStaticFiles(new StaticFileOptions()
        {
          RequestPath = "/lib",
          FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "node_modules/"))
        });
      }

      app.UseAuthentication();

      app.UseMvc(routes =>
      {
        routes.MapRoute(
                  name: "Root",
                  template: "",
                  defaults: new { controller = "Root", action = "Index" });

        routes.MapRoute(
                  name: "default",
                  template: "_/{action}",
                  defaults: new { controller = "Root" });
      });
    }
  }
}
