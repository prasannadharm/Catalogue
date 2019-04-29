using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class CityStateMasterEntity
    {
        public int ID { get; set; }
        public string NAME { get; set; }
        public string STATE { get; set; }
        public bool ACTIVE_STATUS { get; set; }
    }
}