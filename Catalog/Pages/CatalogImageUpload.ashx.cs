using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using Catalog.Models;
using Catalog.DAO;

namespace Catalog.Pages
{
    /// <summary>
    /// Summary description for CatalogImageUpload
    /// </summary>
    public class CatalogImageUpload : IHttpHandler
    {
        string folderpath;
        string actiontype;
        string org_file_name;
        string phy_file_name;
        string catelogid;
        int mFileSize = 0;
        public void ProcessRequest(HttpContext context)
        {
            //context.Response.ContentType = "text/plain";
            //context.Response.Write("Hello World");
            if (context.Request.QueryString["action"] != null)
            {
                actiontype = context.Request.QueryString["action"].ToString();
                if (actiontype.Trim().ToUpper() == "UPLOAD")
                {
                    //for uploading new File
                    folderpath = System.Configuration.ConfigurationManager.AppSettings["FolderPath"];
                    var postedFile = context.Request.Files[0];
                    string filesize = System.Configuration.ConfigurationManager.AppSettings["FileSize"];
                    mFileSize = postedFile.ContentLength / 1048576;
                    string Savepath = context.Server.MapPath("~//" +folderpath);
                    if (mFileSize <= Convert.ToInt32(filesize))
                    {
                        // Get Server Folder to upload file
                        catelogid = context.Request.QueryString["catalogid"].ToString();
                        phy_file_name = context.Request.QueryString["phy_file_name"].ToString();
                        org_file_name = context.Request.QueryString["org_file_name"].ToString();

                        if (!Directory.Exists(Savepath))
                            Directory.CreateDirectory(Savepath);

                        postedFile.SaveAs(Savepath + "\\" + phy_file_name);

                        CatalogImageEntity objimg = new CatalogImageEntity();
                        objimg.CATALOG_ID = Convert.ToInt64(catelogid);
                        objimg.IS_THUMBNAIL = true;
                        objimg.ORG_FILE_NAME = org_file_name;
                        objimg.PHY_FILE_NAME = phy_file_name;
                        List<DbStatusEntity> details = new List<DbStatusEntity>();
                        
                        details.Add(new CatalogMasterDAO().InsertCatalogImages(objimg));
                        
                        //Set response message
                        string msg = "{";
                        msg += string.Format("error:'{0}',\n", string.Empty);
                        msg += string.Format("upfile:'{0}'\n", phy_file_name);
                        msg += "}";
                        context.Response.Write(msg);
                    }
                }
                else if (actiontype.Trim().ToUpper() == "DELETE")
                {                    
                    folderpath = System.Configuration.ConfigurationManager.AppSettings["FolderPath"];
                    catelogid = context.Request.QueryString["catalogid"].ToString();
                    phy_file_name = context.Request.QueryString["phy_file_name"].ToString();
                    
                    string Savepath = context.Server.MapPath("~//" + folderpath);

                    if (File.Exists(Savepath + "\\" + phy_file_name))
                    {
                        File.Delete(Savepath + "\\" + phy_file_name);
                    }

                    List<DbStatusEntity> details = new List<DbStatusEntity>();

                    details.Add(new CatalogMasterDAO().DeleteCatalogImages(Convert.ToInt64(catelogid), phy_file_name));
                }
                else if (actiontype.Trim().ToUpper() == "DOWNLOAD")
                {
                    folderpath = System.Configuration.ConfigurationManager.AppSettings["FolderPath"];
                    catelogid = context.Request.QueryString["catalogid"].ToString();
                    phy_file_name = context.Request.QueryString["phy_file_name"].ToString();
                    org_file_name = context.Request.QueryString["org_file_name"].ToString();
                    string Savepath = context.Server.MapPath("~//" + folderpath);
                    if (File.Exists(Savepath + "\\" + phy_file_name))
                    {
                        context.Response.Clear();
                        context.Response.ContentType = "application/octet-stream";
                        context.Response.AddHeader("Content-Disposition", string.Format("attachment; filename=\"{0}\"", org_file_name));
                        context.Response.WriteFile(Savepath + "\\" + phy_file_name);
                        context.Response.Flush();
                    }
                }
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}