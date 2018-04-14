namespace TheStore.Data.Entities
{
  public class OrderItem
  {
    public int Id { get; set; }
    public Product Product { get; set; }
    public double Price { get; set; }
    public double Quantity { get; set; }
    public double Discount { get; set; }

  }
}