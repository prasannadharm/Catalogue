using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class OutwardRegisterParamEntity
    {
        public string FROMDATE { get; set; }
        public string TODATE { get; set; }
        public Int64 FROMNO { get; set; }
        public Int64 TONO { get; set; }
        public string LEDNAME { get; set; }
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
        public Int64 OUT_TYPE_ID { get; set; }
        public bool SHOW_PENDING_ONLY { get; set; }
    }

    public class OutwardRegisterResultEntity
    {
        public Int64 TRANS_MAIN_ID { get; set; }
        public Int64 TRANS_NO { get; set; }
        public string TRANS_DATE { get; set; }
        public string REF_NO { get; set; }
        public string LED_NAME { get; set; }
        public string REMARKS_M { get; set; }
        public bool VOID_STATUS { get; set; }
        public string CREATEDBY { get; set; }
        public string MODIFIEDBY { get; set; }
        public string OUT_TYPE_NAME { get; set; }
        public bool RETURNABLE { get; set; }

        public Int64 TRANS_SUB_ID { get; set; }
        public string SKU { get; set; }
        public string CODE { get; set; }
        public string CATALOG_TITLE { get; set; }
        public double QTY { get; set; }
        public double BAL_QTY { get; set; }
        public string REMARKS { get; set; }
    }
}