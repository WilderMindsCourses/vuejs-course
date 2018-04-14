using System.Collections.Generic;
using System.Threading.Tasks;
using TheStore.Data.Entities;

namespace TheStore.Data
{
  public interface IStoreRepository
  {
    IEnumerable<Product> GetAllProducts(int pageSize = 25, int page = 0);
    IEnumerable<Product> GetProductsByBrand(string brand);
    IEnumerable<Product> GetProductsByName(string name);
    int GetProductCount();
    int GetProductByBrandCount(string brand);
    int GetProductByNameCount(string name);
    Product GetProductByGTINCode(string gTINCode);

    Order GetOrder(int id);
    Customer GetCustomer(string username);

    Task<bool> SaveAsync();
    void Add<T>(T entity) where T : class;
    void Delete<T>(T entity) where T : class;
  }
}