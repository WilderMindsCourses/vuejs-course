using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using TheStore.Data.Entities;
using TheStore.Models;

namespace TheStore.Controllers
{
  public class AccountController : Controller
  {
    private readonly ILogger<AccountController> _logger;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IConfiguration _config;

    public AccountController(ILogger<AccountController> logger,
      SignInManager<IdentityUser> signInManager,
      UserManager<IdentityUser> userManager,
      IConfiguration config)
    {
      _logger = logger;
      _signInManager = signInManager;
      _userManager = userManager;
      _config = config;
    }

    [HttpGet("login")]
    public IActionResult Login()
    {
      if (User.Identity.IsAuthenticated) return RedirectToAction("Index", "Root");

      return View();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(CredentialModel model)
    {
      if (ModelState.IsValid)
      {
        var user = await _userManager.FindByNameAsync(model.Username);

        if (user != null)
        {
          var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);

          if (result.Succeeded)
          {
            return RedirectToAction("Index", "Root");
          }
        }
      }

      return View();
    }

    [HttpGet("logout")]
    public async Task<IActionResult> Logout()
    {
      if (User.Identity.IsAuthenticated)
      {
        await _signInManager.SignOutAsync();
      }
      return RedirectToAction("Index", "Root");
    }

    [HttpPost("api/account/createToken")]
    public async Task<IActionResult> CreateToken([FromBody] CredentialModel model)
    {
      if (ModelState.IsValid)
      {
        var user = await _userManager.FindByNameAsync(model.Username);

        if (user != null)
        {
          var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

          if (result.Succeeded)
          {
            // Create the token
            var claims = new[]
            {
              new Claim(JwtRegisteredClaimNames.Sub, user.Email),
              new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
              new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Security:Tokens:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
              _config["Security:Tokens:Issuer"],
              _config["Security:Tokens:Audience"],
              claims,
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: creds);

            var results = new
            {
              token = new JwtSecurityTokenHandler().WriteToken(token),
              expiration = token.ValidTo
            };

            return Created("", results);
          }
        }
      }

      return BadRequest();
    }
  }
}
