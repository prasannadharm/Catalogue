using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class SearchCatalogByTextEntity
    {

        public long ID { get; set; }
        public string SKU { get; set; }
        public string CODE { get; set; }
        public string TITLE { get; set; }
        public string JEWELLERY_NAME { get; set; }
        public string DESIGN_NAME { get; set; }
        public string COLLECTIONS_NAME { get; set; }
        public string ORG_FILE_NAME { get; set; }
        public string PHY_FILE_NAME { get; set; }
    }

    public class SearchCatalogByConditionEntity
    {
        public string SEARCHBY { get; set; }
        public string CONDITION { get; set; }
        public string SEARCHITEM { get; set; }

    }
}