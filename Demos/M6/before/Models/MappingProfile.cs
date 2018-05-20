using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using TheStore.Data.Entities;

namespace TheStore.Models
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      CreateMap<Customer, CustomerModel>()
        .ReverseMap();

      CreateMap<Address, AddressModel>()
        .ReverseMap();
    }
  }
}
