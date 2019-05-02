using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class LedgerMasterEntity
    {
        public int ID { get; set; }
        public string NAME { get; set; }
        public string ALIAS_NAME { get; set; }
        public int LEDGER_TYPE_ID { get; set; }
        public string LEDGER_TYPE { get; set; }
        public string ADDRESS { get; set; }
        public string CITY { get; set; }
        public string STATE { get; set; }
        public string PIN_NO { get; set; }
        public string MOBILE { get; set; }
        public string TELEPHONE { get; set; }
        public string EMAIL { get; set; }
        public string WEB { get; set; }
        public string GSTIN { get; set; }
        public string REMARKS { get; set; }
        public bool ACTIVE_STATUS { get; set; }
}
}