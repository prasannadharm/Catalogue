using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class CatalogMasterEntity
    {
        public long ID { get; set; }
        public string SKU { get; set; }
        public string CODE { get; set; }
        public string TITLE { get; set; }
        public string REMARKS { get; set; }
        public bool ACTIVE_STATUS { get; set; }
        public bool SHOW_CATALOG { get; set; }
        public bool SHOW_TRENDING { get; set; }
        public int JEWELLERY_ID { get; set; }
        public string JEWELLERY_NAME { get; set; }
        public int DESIGN_ID { get; set; }
        public string DESIGN_NAME { get; set; }
        public int COLLECTIONS_ID { get; set; }
        public string COLLECTIONS_NAME { get; set; }
        public int MATERIAL_ID { get; set; }
        public string MATERIAL_NAME { get; set; }
        public int OCCASION_ID { get; set; }
        public string OCCASION_NAME { get; set; }
        public int GRAMSLAB_ID { get; set; }
        public string GRAMSLAB_NAME { get; set; }
        public int KARAT_ID { get; set; }
        public string KARAT_NAME { get; set; }
        public string PURITY { get; set; }
        public double RATE { get; set; }
        public double GR_WT { get; set; }
        public double ST_WT { get; set; }
        public double NET_WT { get; set; }
        public double VA_PER { get; set; }
        public double VA_AMT { get; set; }
        public double ST_AMT { get; set; }
        public double TAXABLE_AMT { get; set; }
        public double TAX_PER { get; set; }
        public double TAX_AMT { get; set; }
        public double NET_AMT { get; set; }
        public double STK_QTY { get; set; }
    }
}