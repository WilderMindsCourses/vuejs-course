namespace TheStore.Data.Entities
{
  public class Product
  {
    public int Id { get; set; }
    public string Category { get; set; }
    public string ImageUrl { get; set; }
    public string Brand { get; set; }
    public string Name { get; set; }
    public string BrandImageUrl { get; set; }
    public string BrandUrl { get; set; }
    public string GTINCode { get; set; }
    public double ListPrice { get; internal set; }
  }
}