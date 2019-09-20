using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class SearchCatalogEntity
    {
        public string SEARCHTEXT { get; set; }
        public string SKU { get; set; }
        public string CODE { get; set; }
        public string JEWELLERYIDS { get; set; }
        public string DESIGNIDS { get; set; }
        public string COLLECTIONSIDS { get; set; }
        public string MATERIALIDS { get; set; }
        public string OCCASIONIDS { get; set; }
        public string GRAMSLABIDS { get; set; }
        public string KARATIDS { get; set; }
        public int CNT { get; set; }
    }
}