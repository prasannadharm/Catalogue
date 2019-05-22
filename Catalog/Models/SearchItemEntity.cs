using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class SearchItemEntity
    {
        public long ID { get; set; }
        public string HEADING { get; set; }
        public string DESCRIPTION { get; set; }
        public string PHY_FILE_NAME { get; set; }
    }
}