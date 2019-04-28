using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class DbStatusEntity
    {
        public DbStatusEntity()
        {
            MSG = "";
            CNT = 0;
            RESULT = 0;
        }
        public DbStatusEntity(string msg)
        {
            MSG = msg;
            CNT = 0;
            RESULT = 0;
        }
        public int RESULT { get; set; }
        public int CNT { get; set; }
        public string MSG { get; set; }
    }
}