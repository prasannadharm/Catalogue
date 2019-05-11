using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class CatalogImageEntity
    {
        public long CATALOG_ID { get; set; }
        public string ORG_FILE_NAME { get; set; }
        public string PHY_FILE_NAME { get; set; }
        public bool IS_THUMBNAIL { get; set; }
        public int SORT_ORDER { get; set; }        
    }
}