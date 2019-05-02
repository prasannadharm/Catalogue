using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class RoleMasterEntity
    {
        public int ROLE_ID { get; set; }
        public string ROLE_NAME { get; set; }
        public bool ACTIVE_STATUS { get; set; }
    }
}