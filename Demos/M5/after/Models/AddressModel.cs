using System.ComponentModel.DataAnnotations;

namespace TheStore.Models
{
  public class AddressModel
  {
    [Required]
    public string AddressLine1 { get; set; }
    public string AddressLine2 { get; set; }
    public string AddressLine3 { get; set; }
    [Required]
    public string CityTown { get; set; }
    [Required]
    public string StateProvince { get; set; }
    [Required]
    public string PostalCode { get; set; }
  }
}