﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class UserMenuEntity
    {
        public int USER_ID { get; set; }
        public int MENU_ID { get; set; }
        public int PARENT_MENU_ID { get; set; }
        public string TITLE { get; set; }
        public string URL { get; set; }
    }
}