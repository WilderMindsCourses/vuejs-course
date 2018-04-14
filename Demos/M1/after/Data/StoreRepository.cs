using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheStore.Data.Entities;

namespace TheStore.Data
{
  public class ProductRepository : IStoreRepository
  {
    private readonly StoreContext _ctx;

    public ProductRepository(StoreContext ctx)
    {
      _ctx = ctx;
    }

    public IEnumerable<Product> GetAllProducts(int pageSize = 25, int page = 0)
    {
      return _ctx.Products.Skip(pageSize * page).Take(pageSize).ToList();
    }

    public int GetProductCount()
    {
      return _ctx.Products.Count();
    }

    public IEnumerable<Product> GetProductsByBrand(string brand)
    {
      return _ctx.Products.Where(p => p.Brand.ToLower() == brand.ToLower()).ToList();
    }

    public int GetProductByBrandCount(string brand)
    {
      return _ctx.Products.Where(p => p.Brand.ToLower() == brand.ToLower()).Count();
    }

    public IEnumerable<Product> GetProductsByName(string name)
    {
      return _ctx.Products.Where(p => EF.Functions.Like(p.Name, $"%{name}%")).ToList();
    }

    public Product GetProductByGTINCode(string gtinCode)
    {
      return _ctx.Products.Where(p => p.GTINCode == gtinCode).FirstOrDefault();
    }

    public int GetProductByNameCount(string name)
    {
      return _ctx.Products.Where(p => EF.Functions.Like(p.Name, $"%{name}%")).Count();
    }

    public Order GetOrder(int id)
    {
      return _ctx.Orders
        .Include(s => s.Items)
        .ThenInclude(s => s.Product)
        .Include(s => s.Customer)
        .Where(o => o.Id == id).FirstOrDefault();
    }

    public Customer GetCustomer(string username)
    {
      return _ctx.Customers
        .Include(c => c.Addresses)
        .Where(c => c.Username == username)
        .FirstOrDefault();
    }

    public async Task<bool> SaveAsync()
    {
      return await _ctx.SaveChangesAsync() > 0;
    }

    public void Add<T>(T entity) where T : class
    {
      _ctx.Add(entity);
    }

    public void Delete<T>(T entity) where T : class
    {
      _ctx.Remove(entity);
    }

  }
}