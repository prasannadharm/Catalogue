using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Catalog.Models
{
    public class EmailEntity
    {  
        public EmailEntity()
        {
            Port = 587;
            Host = "smtp.gmail.com";
            EnableSsl = true;
        }     
        public int Port { get; set; }
        public string Host { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public bool EnableSsl { get; set; }

    }
}