using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class BannerImageEntity
    {
        public long ID { get; set; }
        public string HEADING { get; set; }
        public string DESCRIPTION { get; set; }
        public string ORG_FILE_NAME { get; set; }
        public string PHY_FILE_NAME { get; set; }
        public string FCOLOR { get; set; }   
        public int SORT_ORDER { get; set; }
    }
}