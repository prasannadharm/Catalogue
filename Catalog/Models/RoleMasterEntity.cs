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
        public bool ALLOW_EDIT { get; set; }
        public bool ALLOW_DELETE { get; set; }
    }

    public class UserRightsEntity
    {
        public Int64 USER_ID { get; set; }
        public bool ALLOW_EDIT { get; set; }
        public bool ALLOW_DELETE { get; set; }
    }
}