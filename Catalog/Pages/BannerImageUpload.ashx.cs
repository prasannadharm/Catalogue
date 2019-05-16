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
    /// Summary description for BannerImageUpload
    /// </summary>
    public class BannerImageUpload : IHttpHandler
    {
        string folderpath;
        string actiontype;
        string org_file_name;
        string phy_file_name;
        string id;
        int mFileSize = 0;
        string heading = "";
        string desc = "";
        public void ProcessRequest(HttpContext context)
        {
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
                    string Savepath = context.Server.MapPath("~//" + folderpath);
                    if (mFileSize <= Convert.ToInt32(filesize))
                    {
                        // Get Server Folder to upload file                       
                        phy_file_name = context.Request.QueryString["phy_file_name"].ToString();
                        org_file_name = context.Request.QueryString["org_file_name"].ToString();
                        heading = context.Request.QueryString["heading"].ToString();
                        desc = context.Request.QueryString["desc"].ToString();
                        if (!Directory.Exists(Savepath))
                            Directory.CreateDirectory(Savepath);

                        postedFile.SaveAs(Savepath + "\\" + phy_file_name);

                        BannerImageEntity objimg = new BannerImageEntity();
                        objimg.HEADING = heading;
                        objimg.DESCRIPTION = desc;
                        objimg.ORG_FILE_NAME = org_file_name;
                        objimg.PHY_FILE_NAME = phy_file_name;
                        List<DbStatusEntity> details = new List<DbStatusEntity>();

                        details.Add(new BannerMasterDAO().InsertBanner(objimg));

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
                    id = context.Request.QueryString["id"].ToString();

                    List<BannerImageEntity> objimg = new List<BannerImageEntity>();
                    objimg = new BannerMasterDAO().EditBanner(Convert.ToInt64(id));
                    if (objimg.Count > 0)
                    {
                        phy_file_name = objimg[0].PHY_FILE_NAME;
                    }
                    
                    string Savepath = context.Server.MapPath("~//" + folderpath);

                    if (File.Exists(Savepath + "\\" + phy_file_name))
                    {
                        File.Delete(Savepath + "\\" + phy_file_name);
                    }

                    List<DbStatusEntity> details = new List<DbStatusEntity>();

                    details.Add(new BannerMasterDAO().DeleteBanner(Convert.ToInt64(id)));
                }
                else if (actiontype.Trim().ToUpper() == "DOWNLOAD")
                {
                    folderpath = System.Configuration.ConfigurationManager.AppSettings["FolderPath"];
                    id = context.Request.QueryString["id"].ToString();
                    List<BannerImageEntity> objimg = new List<BannerImageEntity>();
                    objimg = new BannerMasterDAO().EditBanner(Convert.ToInt64(id));
                    if (objimg.Count > 0)
                    {
                        phy_file_name = objimg[0].PHY_FILE_NAME;
                        org_file_name = objimg[0].ORG_FILE_NAME;
                    }

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