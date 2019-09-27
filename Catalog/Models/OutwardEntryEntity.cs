﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class OutwardEntryEntity
    {
        public Int64 ID { get; set; }
        public Int64 TRANS_NO { get; set; }
        public string TRANS_DATE { get; set; }
        public string REF_NO { get; set; }
        public Int64 LED_ID { get; set; }
        public string LED_NAME { get; set; }
        public string REMARKS { get; set; }
        public bool VOID_STATUS { get; set; }
        public string CREATEDBY { get; set; }
        public string CREATEDON { get; set; }
        public string MODIFIEDBY { get; set; }
        public string MODIFIEDON { get; set; }
        public Int64 OUT_TYPE_ID { get; set; }
        public string OUT_TYPE_NAME { get; set; }
    }

    public class OutwardEntrySubEntity
    {
        public Int64 ID { get; set; }
        public Int64 TRANS_MAIN_ID { get; set; }
        public Int64 CATALOG_ID { get; set; }
        public string SKU { get; set; }
        public string CODE { get; set; }
        public string CATALOG_TITLE { get; set; }
        public double QTY { get; set; }
        public string REMARKS { get; set; }
        public bool VOID_STATUS { get; set; }
        public string CREATEDBY { get; set; }
        public DateTime CREATEDON { get; set; }
        public string MODIFIEDBY { get; set; }
        public DateTime MODIFIEDON { get; set; }
    }

    public class OutwardEntryDateFilterEntity
    {
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
    }

    public class OutwardEntryInsertParam1
    {
        public string LED_NAME { get; set; }
        public string LED_ID { get; set; }
        public string TRANS_DATE { get; set; }
        public string REF_NO { get; set; }
        public string REMARKS { get; set; }
        public string OUT_TYPE_NAME { get; set; }
    }

    public class OutwardEntryInsertParam2
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

    public class OutwardEntryEditParam
    {
        public Int64 TRANS_MAIN_ID { get; set; }
        public string LED_NAME { get; set; }
        public string LED_ID { get; set; }
        public string TRANS_DATE { get; set; }
        public Int64 TRANS_NO { get; set; }
        public string REF_NO { get; set; }
        public string REMARKS_MAIN { get; set; }
        public Int64 CATALOG_ID { get; set; }
        public string SKU { get; set; }
        public string CODE { get; set; }
        public string CATALOG_TITLE { get; set; }
        public string PHY_FILE_NAME { get; set; }
        public string ORG_FILE_NAME { get; set; }
        public Int64 GENID { get; set; }
        public double QTY { get; set; }
        public string REMARKS { get; set; }
        public Int64 OUT_TYPE_ID { get; set; }
        public string OUT_TYPE_NAME { get; set; }
    }
}