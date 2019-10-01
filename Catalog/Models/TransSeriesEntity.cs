using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class TransSeriesEntity
    {
        public Int64 SKU { get; set; }
        public Int64 STOCK_ENTRY { get; set; }
        public Int64 INWARD { get; set; }
        public Int64 OUTWARD { get; set; }
    }
}