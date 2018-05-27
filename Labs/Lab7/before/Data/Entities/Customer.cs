using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace TheStore.Data.Entities
{
  public class Customer 
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Company { get; set; }
    public string Phone { get; set; }

    public string Username { get; set; }

    public ICollection<Address> Addresses { get; set; }
  }
}
