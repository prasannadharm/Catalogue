using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class RoleBaseMenuEntity
    {
        public int MENU_ID { get; set; }
        public string MENU_NAME { get; set; }
        public string PARENT_MENU_NAME { get; set; }
        public int SORT_ORDER { get; set; }
    }
}