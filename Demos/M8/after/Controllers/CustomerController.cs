using AutoMapper;
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
using TheStore.Models;

namespace TheStore.Controllers.Api
{
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
  [Route("api/[controller]")]
  public class CustomerController : Controller
  {
    private readonly IStoreRepository _repository;
    private readonly IMapper _mapper;

    public CustomerController(IStoreRepository repository, IMapper mapper)
    {
      _repository = repository;
      _mapper = mapper;
    }

    [HttpGet()]
    public IActionResult Get()
    {
      var cust = _repository.GetCustomer(User.Identity.Name);
      if (cust == null) return NotFound();
      return Ok(cust);
    }

    [HttpPost()]
    public async Task<IActionResult> Post([FromBody]CustomerModel model)
    {
      if (ModelState.IsValid)
      {
        var cust = _mapper.Map<Customer>(model);

        if (model.Address != null)
        {
          cust.Addresses.Add(_mapper.Map<Address>(model.Address));
        }

        cust.Username = User.Identity.Name;

        _repository.Add(cust);
        if (await _repository.SaveAsync())
        {
          return Created($"api/customer", cust);
        }
      }

      return BadRequest(ModelState);
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
