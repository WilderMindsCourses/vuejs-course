using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheStore.Models
{
  public class CustomerModel
  {
    [Required]
    [MinLength(5)]
    public string Name { get; set; }
    [Required]
    public string Phone { get; set; }
    public AddressModel Address { get; set; }

  }
}
