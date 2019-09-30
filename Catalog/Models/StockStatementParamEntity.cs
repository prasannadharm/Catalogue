using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class StockStatementParamEntity
    {
        public string FROMDATE { get; set; }
        public string TODATE { get; set; }
        public string DESC { get; set; }
        public string SKU { get; set; }
        public string CODE { get; set; }
        public string JEWELLERYIDS { get; set; }
        public string DESIGNIDS { get; set; }
        public string COLLECTIONSIDS { get; set; }
        public string MATERIALIDS { get; set; }
        public string OCCASIONIDS { get; set; }
        public string GRAMSLABIDS { get; set; }
        public string KARATIDS { get; set; }
        public string REPTYPE { get; set; }
        public bool SHOW_INSTOCK_ITEMS_ONLY { get; set; }
    }

    public class StockStatementResultEntity
    {
        public Int64 ID { get; set; }
        public Int64 CATALOG_ID { get; set; }
        public string SKU { get; set; }
        public string CODE { get; set; }
        public string CATALOG_TITLE { get; set; }
        public double CURR_STK_QTY { get; set; }
        public double OPENING_QTY { get; set; }
        public double STK_QTY { get; set; }
        public double IN_QTY { get; set; }
        public double OUT_QTY { get; set; }
        public double CLS_QTY { get; set; }        
    }
}