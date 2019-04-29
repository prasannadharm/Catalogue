using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class CollectionsMasterEntity
    {
        public int ID { get; set; }
        public string NAME { get; set; }
        public bool ACTIVE_STATUS { get; set; }
    }
}