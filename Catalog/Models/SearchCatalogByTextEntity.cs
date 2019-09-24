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

    public class StockEntryInsertParam1
    {
        public string LED_NAME { get; set; }
        public string LED_ID { get; set; }
        public string TRANS_DATE { get; set; }
        public string REF_NO { get; set; }
        public string REMARKS { get; set; }
    }

    public class StockEntryInsertParam2
    {
        public Int64 ID { get; set; }
        public string SKU { get; set; }
        public string CODE { get; set; }
        public string TITLE { get; set; }
        public string PHY_FILE_NAME { get; set; }
        public string ORG_FILE_NAME { get; set; }
        public Int64 GENID { get; set; }
        public double QTY { get; set; }
        public string REMARKS { get; set; }        
    }
}