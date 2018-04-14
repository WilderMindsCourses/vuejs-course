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
  [Route("api/[controller]")]
  [Authorize]
  public class OrdersController : Controller
  {
    private readonly IStoreRepository _repository;

    public OrdersController(IStoreRepository repository)
    {
      _repository = repository;
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
      return Ok(_repository.GetOrder(id));
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] OrderModel model)
    {
      if (ModelState.IsValid)
      {
        var customer = _repository.GetCustomer(User.Identity.Name);
        if (customer != null)
        {
          if (!customer.Addresses.Any()) return BadRequest("Customer must have at least one address.");
          if (model.Items == null || !model.Items.Any()) return BadRequest("Orders must have line items.");

          var order = new Order()
          {
            OrderDate = model.OrderDate == DateTime.MinValue ? DateTime.Today : model.OrderDate,
            Address = customer.Addresses.First(),
            Customer = customer,
            OrderNumber = model.OrderNumber ?? Guid.NewGuid().ToString(),
            Items = model.Items.Select(s =>
            {
              var product = _repository.GetProductByGTINCode(s.GTINCode);
              return new OrderItem()
              {
                Product = product,
                Price = s.Price == 0 ? product.ListPrice : s.Price,
                Discount = s.Discount,
                Quantity = s.Quantity == 0 ? 1f : s.Quantity
              };
            }).ToList()
          };

          _repository.Add(order);

          if (await _repository.SaveAsync())
          {
            return Created($"api/orders/{order.Id}", order);
          }
        }
      }

      return BadRequest("Request Body incorrect");
    }

  }
}
