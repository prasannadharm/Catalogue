﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class UserMasterEntity
    {
        public int USER_ID { get; set; }
        public string USER_PASSWORD { get; set; }
        public string NAME { get; set; }
        public string EMAIL { get; set; }
        public string MOBILE_NO { get; set; }
        public bool ACTIVE_STATUS { get; set; }
        public int ROLE_ID { get; set; }
        public string ROLE_NAME { get; set; }
    }
}