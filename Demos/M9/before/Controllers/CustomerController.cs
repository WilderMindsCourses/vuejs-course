using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheStore.Data;
using TheStore.Data.Entities;

namespace TheStore.Controllers.Api
{
  [Route("api/[controller]")]
  public class CustomerController : Controller
  {
    private readonly IStoreRepository _repository;

    public CustomerController(IStoreRepository repository)
    {
      _repository = repository;
    }

    [HttpGet()]
    public IActionResult Get()
    {
      var cust = _repository.GetCustomer(User.Identity.Name);
      if (cust == null) return NotFound();
      return Ok(cust);
    }

    [HttpPost()]
    public async Task<IActionResult> Post([FromBody]Customer model)
    {
      if (ModelState.IsValid)
      {
        _repository.Add(model);
        if (await _repository.SaveAsync())
        {
          return Created($"api/customer", model);
        }
      }

      return BadRequest("Failed to create new customer");
    }

    [HttpDelete]
    public async Task<IActionResult> Delete()
    {
      var customer = _repository.GetCustomer(User.Identity.Name);
      if (customer != null)
      {
        _repository.Delete(customer);
        if (await _repository.SaveAsync())
        {
          return Ok();
        }
      }

      return BadRequest();
    }
  }
}
