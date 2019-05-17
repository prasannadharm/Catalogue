using Catalog.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace Catalog.DAO
{
    public class CatalogDetailsDAO
    {

        public List<CatalogImageEntity> GetCalatogImages(long id)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<CatalogImageEntity> retlst = new List<CatalogImageEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetCatalogImagesbyID", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        CatalogImageEntity obj = new CatalogImageEntity();
                        obj.CATALOG_ID = ds.Tables[0].Rows[i]["CATALOG_ID"] == DBNull.Value ? 0 : Convert.ToInt64(ds.Tables[0].Rows[i]["CATALOG_ID"].ToString());
                        obj.PHY_FILE_NAME = ds.Tables[0].Rows[i]["PHY_FILE_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["PHY_FILE_NAME"].ToString();
                        retlst.Add(obj);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return retlst;
        }


        public List<CatalogDetailsEntity> GetCalatogDetails(long id)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<CatalogDetailsEntity> retlst = new List<CatalogDetailsEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetCatalogDetailsbyID", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        CatalogDetailsEntity obj = new CatalogDetailsEntity();
                        obj.NAME = ds.Tables[0].Rows[i]["NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["NAME"].ToString();
                        obj.VALUE = ds.Tables[0].Rows[i]["VALUE"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["VALUE"].ToString();
                        retlst.Add(obj);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return retlst;
        }

    }
}