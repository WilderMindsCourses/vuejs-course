using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheStore.Data;

namespace TheStore.Controllers.Api
{
  [Route("api/[controller]")]
  public class ProductsController : Controller
  {
    private readonly IStoreRepository _repository;

    public ProductsController(IStoreRepository repository)
    {
      _repository = repository;
    }

    [HttpGet("")]
    public IActionResult Get(int pageSize = 25, int page = 0)
    {
      var count = _repository.GetProductCount();

      return Ok(new
      {
        TotalPages = (int)Math.Round(Math.Floor((decimal)count / pageSize)),
        Page = page,
        PageSize = pageSize,
        Results = _repository.GetAllProducts(pageSize, page)
      });
    }
  }
}
