using Catalog.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace Catalog.DAO
{
    public class CatalogMasterDAO
    {
        public List<CatalogMasterEntity> GetCatalogList()
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<CatalogMasterEntity> retlst = new List<CatalogMasterEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetCatalogMasterList", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        CatalogMasterEntity obj = new CatalogMasterEntity();
                        obj.ID = Convert.ToInt32(ds.Tables[0].Rows[i]["ID"].ToString());
                        obj.SKU = ds.Tables[0].Rows[i]["SKU"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["SKU"].ToString();
                        obj.CODE = ds.Tables[0].Rows[i]["CODE"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["CODE"].ToString();
                        obj.TITLE = ds.Tables[0].Rows[i]["TITLE"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["TITLE"].ToString();
                        obj.STK_QTY = ds.Tables[0].Rows[i]["STK_QTY"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["STK_QTY"]);
                        obj.JEWELLERY_NAME = ds.Tables[0].Rows[i]["JEWELLERY_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["JEWELLERY_NAME"].ToString();
                        obj.DESIGN_NAME = ds.Tables[0].Rows[i]["DESIGN_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["DESIGN_NAME"].ToString();
                        obj.COLLECTIONS_NAME = ds.Tables[0].Rows[i]["COLLECTIONS_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["COLLECTIONS_NAME"].ToString();
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

        public List<CatalogMasterEntity> EditCatalog(long id)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<CatalogMasterEntity> retlst = new List<CatalogMasterEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetCatalogMasterDetailsbyID", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        CatalogMasterEntity obj = new CatalogMasterEntity();
                        obj.ID = Convert.ToInt32(ds.Tables[0].Rows[i]["ID"].ToString());
                        obj.SKU = ds.Tables[0].Rows[i]["SKU"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["SKU"].ToString();
                        obj.CODE = ds.Tables[0].Rows[i]["CODE"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["CODE"].ToString();
                        obj.TITLE = ds.Tables[0].Rows[i]["TITLE"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["TITLE"].ToString();
                        obj.REMARKS = ds.Tables[0].Rows[i]["REMARKS"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["REMARKS"].ToString();
                        obj.PURITY = ds.Tables[0].Rows[i]["PURITY"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["PURITY"].ToString();
                        obj.STK_QTY = ds.Tables[0].Rows[i]["STK_QTY"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["STK_QTY"]);
                        obj.ACTIVE_STATUS = ds.Tables[0].Rows[i]["ACTIVE_STATUS"] == DBNull.Value ? true : Convert.ToBoolean(ds.Tables[0].Rows[i]["ACTIVE_STATUS"]);
                        obj.SHOW_CATALOG = ds.Tables[0].Rows[i]["SHOW_CATALOG"] == DBNull.Value ? true : Convert.ToBoolean(ds.Tables[0].Rows[i]["SHOW_CATALOG"]);
                        obj.SHOW_TRENDING = ds.Tables[0].Rows[i]["SHOW_TRENDING"] == DBNull.Value ? true : Convert.ToBoolean(ds.Tables[0].Rows[i]["SHOW_TRENDING"]);
                        obj.JEWELLERY_ID = ds.Tables[0].Rows[i]["JEWELLERY_ID"] == DBNull.Value ? 0 : Convert.ToInt32(ds.Tables[0].Rows[i]["JEWELLERY_ID"].ToString());
                        obj.JEWELLERY_NAME = ds.Tables[0].Rows[i]["JEWELLERY_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["JEWELLERY_NAME"].ToString();
                        obj.DESIGN_ID = ds.Tables[0].Rows[i]["DESIGN_ID"] == DBNull.Value ? 0 : Convert.ToInt32(ds.Tables[0].Rows[i]["DESIGN_ID"].ToString());
                        obj.DESIGN_NAME = ds.Tables[0].Rows[i]["DESIGN_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["DESIGN_NAME"].ToString();
                        obj.COLLECTIONS_ID = ds.Tables[0].Rows[i]["COLLECTIONS_ID"] == DBNull.Value ? 0 : Convert.ToInt32(ds.Tables[0].Rows[i]["COLLECTIONS_ID"].ToString());
                        obj.COLLECTIONS_NAME = ds.Tables[0].Rows[i]["COLLECTIONS_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["COLLECTIONS_NAME"].ToString();
                        obj.MATERIAL_ID = ds.Tables[0].Rows[i]["MATERIAL_ID"] == DBNull.Value ? 0 : Convert.ToInt32(ds.Tables[0].Rows[i]["MATERIAL_ID"].ToString());
                        obj.MATERIAL_NAME = ds.Tables[0].Rows[i]["MATERIAL_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["MATERIAL_NAME"].ToString();
                        obj.OCCASION_ID = ds.Tables[0].Rows[i]["OCCASION_ID"] == DBNull.Value ? 0 : Convert.ToInt32(ds.Tables[0].Rows[i]["OCCASION_ID"].ToString());
                        obj.OCCASION_NAME = ds.Tables[0].Rows[i]["OCCASION_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["OCCASION_NAME"].ToString();
                        obj.GRAMSLAB_ID = ds.Tables[0].Rows[i]["GRAMSLAB_ID"] == DBNull.Value ? 0 : Convert.ToInt32(ds.Tables[0].Rows[i]["GRAMSLAB_ID"].ToString());
                        obj.GRAMSLAB_NAME = ds.Tables[0].Rows[i]["GRAMSLAB_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["GRAMSLAB_NAME"].ToString();
                        obj.KARAT_ID = ds.Tables[0].Rows[i]["KARAT_ID"] == DBNull.Value ? 0 : Convert.ToInt32(ds.Tables[0].Rows[i]["KARAT_ID"].ToString());
                        obj.KARAT_NAME = ds.Tables[0].Rows[i]["KARAT_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["KARAT_NAME"].ToString();
                        obj.RATE = ds.Tables[0].Rows[i]["RATE"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["RATE"]);
                        obj.GR_WT = ds.Tables[0].Rows[i]["GR_WT"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["GR_WT"]);
                        obj.ST_WT = ds.Tables[0].Rows[i]["ST_WT"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["ST_WT"]);
                        obj.NET_WT = ds.Tables[0].Rows[i]["NET_WT"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["NET_WT"]);
                        obj.VA_PER = ds.Tables[0].Rows[i]["VA_PER"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["VA_PER"]);
                        obj.VA_AMT = ds.Tables[0].Rows[i]["VA_AMT"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["VA_AMT"]);
                        obj.ST_AMT = ds.Tables[0].Rows[i]["ST_AMT"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["ST_AMT"]);
                        obj.TAXABLE_AMT = ds.Tables[0].Rows[i]["TAXABLE_AMT"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["TAXABLE_AMT"]);
                        obj.TAX_PER = ds.Tables[0].Rows[i]["TAX_PER"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["TAX_PER"]);
                        obj.TAX_AMT = ds.Tables[0].Rows[i]["TAX_AMT"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["TAX_AMT"]);
                        obj.NET_AMT = ds.Tables[0].Rows[i]["NET_AMT"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["NET_AMT"]);
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

        public DbStatusEntity UpdateCatalog(CatalogMasterEntity obj, long id)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_UpdateCatalogMaster", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    cmd.Parameters.AddWithValue("@CODE", obj.CODE);
                    cmd.Parameters.AddWithValue("@TITLE", obj.TITLE);
                    cmd.Parameters.AddWithValue("@REMARKS", obj.REMARKS);
                    cmd.Parameters.AddWithValue("@ACTIVE_STATUS", obj.ACTIVE_STATUS);
                    cmd.Parameters.AddWithValue("@SHOW_CATALOG", obj.SHOW_CATALOG);
                    cmd.Parameters.AddWithValue("@SHOW_TRENDING", obj.SHOW_TRENDING);
                    cmd.Parameters.AddWithValue("@JEWELLERY_ID", obj.JEWELLERY_ID);
                    cmd.Parameters.AddWithValue("@DESIGN_ID", obj.DESIGN_ID);
                    cmd.Parameters.AddWithValue("@COLLECTIONS_ID", obj.COLLECTIONS_ID);
                    cmd.Parameters.AddWithValue("@MATERIAL_ID", obj.MATERIAL_ID);
                    cmd.Parameters.AddWithValue("@OCCASION_ID", obj.OCCASION_ID);
                    cmd.Parameters.AddWithValue("@GRAMSLAB_ID", obj.GRAMSLAB_ID);
                    cmd.Parameters.AddWithValue("@KARAT_ID", obj.KARAT_ID);
                    cmd.Parameters.AddWithValue("@PURITY", obj.PURITY);
                    cmd.Parameters.AddWithValue("@RATE", obj.RATE);
                    cmd.Parameters.AddWithValue("@GR_WT", obj.GR_WT);
                    cmd.Parameters.AddWithValue("@ST_WT", obj.ST_WT);
                    cmd.Parameters.AddWithValue("@NET_WT", obj.NET_WT);
                    cmd.Parameters.AddWithValue("@VA_PER", obj.VA_PER);
                    cmd.Parameters.AddWithValue("@VA_AMT", obj.VA_AMT);
                    cmd.Parameters.AddWithValue("@ST_AMT", obj.ST_AMT);
                    cmd.Parameters.AddWithValue("@TAXABLE_AMT", obj.TAXABLE_AMT);
                    cmd.Parameters.AddWithValue("@TAX_PER", obj.TAX_PER);
                    cmd.Parameters.AddWithValue("@TAX_AMT", obj.TAX_AMT);
                    cmd.Parameters.AddWithValue("@NET_AMT", obj.NET_AMT);
                    cmd.Parameters.Add("@RESULT", SqlDbType.Int);
                    cmd.Parameters["@RESULT"].Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("@CNT", SqlDbType.Int);
                    cmd.Parameters["@CNT"].Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("@MSG", SqlDbType.NVarChar, 500);
                    cmd.Parameters["@MSG"].Direction = ParameterDirection.Output;
                    con.Open();
                    cmd.ExecuteNonQuery();
                    objreturn.RESULT = Convert.ToInt32(cmd.Parameters["@RESULT"].Value);
                    objreturn.CNT = Convert.ToInt32(cmd.Parameters["@CNT"].Value);
                    objreturn.MSG = Convert.ToString(cmd.Parameters["@MSG"].Value);
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return objreturn;
        }

        public DbStatusEntity InsertCatalog(CatalogMasterEntity obj)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_InsertCatalogMaster", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CODE", obj.CODE);
                    cmd.Parameters.AddWithValue("@TITLE", obj.TITLE);
                    cmd.Parameters.AddWithValue("@REMARKS", obj.REMARKS);
                    cmd.Parameters.AddWithValue("@ACTIVE_STATUS", obj.ACTIVE_STATUS);
                    cmd.Parameters.AddWithValue("@SHOW_CATALOG", obj.SHOW_CATALOG);
                    cmd.Parameters.AddWithValue("@SHOW_TRENDING", obj.SHOW_TRENDING);
                    cmd.Parameters.AddWithValue("@JEWELLERY_ID", obj.JEWELLERY_ID);
                    cmd.Parameters.AddWithValue("@DESIGN_ID", obj.DESIGN_ID);
                    cmd.Parameters.AddWithValue("@COLLECTIONS_ID", obj.COLLECTIONS_ID);
                    cmd.Parameters.AddWithValue("@MATERIAL_ID", obj.MATERIAL_ID);
                    cmd.Parameters.AddWithValue("@OCCASION_ID", obj.OCCASION_ID);
                    cmd.Parameters.AddWithValue("@GRAMSLAB_ID", obj.GRAMSLAB_ID);
                    cmd.Parameters.AddWithValue("@KARAT_ID", obj.KARAT_ID);
                    cmd.Parameters.AddWithValue("@PURITY", obj.PURITY);
                    cmd.Parameters.AddWithValue("@RATE", obj.RATE);
                    cmd.Parameters.AddWithValue("@GR_WT", obj.GR_WT);
                    cmd.Parameters.AddWithValue("@ST_WT", obj.ST_WT);
                    cmd.Parameters.AddWithValue("@NET_WT", obj.NET_WT);
                    cmd.Parameters.AddWithValue("@VA_PER", obj.VA_PER);
                    cmd.Parameters.AddWithValue("@VA_AMT", obj.VA_AMT);
                    cmd.Parameters.AddWithValue("@ST_AMT", obj.ST_AMT);
                    cmd.Parameters.AddWithValue("@TAXABLE_AMT", obj.TAXABLE_AMT);
                    cmd.Parameters.AddWithValue("@TAX_PER", obj.TAX_PER);
                    cmd.Parameters.AddWithValue("@TAX_AMT", obj.TAX_AMT);
                    cmd.Parameters.AddWithValue("@NET_AMT", obj.NET_AMT);

                    cmd.Parameters.Add("@RESULT", SqlDbType.Int);
                    cmd.Parameters["@RESULT"].Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("@CNT", SqlDbType.Int);
                    cmd.Parameters["@CNT"].Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("@MSG", SqlDbType.NVarChar, 500);
                    cmd.Parameters["@MSG"].Direction = ParameterDirection.Output;
                    con.Open();
                    cmd.ExecuteNonQuery();
                    objreturn.RESULT = Convert.ToInt32(cmd.Parameters["@RESULT"].Value);
                    objreturn.CNT = Convert.ToInt32(cmd.Parameters["@CNT"].Value);
                    objreturn.MSG = Convert.ToString(cmd.Parameters["@MSG"].Value);
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return objreturn;
        }

        public DbStatusEntity DeleteCatalog(long id)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_DeleteCatalogMaster", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);

                    cmd.Parameters.Add("@RESULT", SqlDbType.Int);
                    cmd.Parameters["@RESULT"].Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("@CNT", SqlDbType.Int);
                    cmd.Parameters["@CNT"].Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("@MSG", SqlDbType.NVarChar, 500);
                    cmd.Parameters["@MSG"].Direction = ParameterDirection.Output;
                    con.Open();
                    cmd.ExecuteNonQuery();
                    objreturn.RESULT = Convert.ToInt32(cmd.Parameters["@RESULT"].Value);
                    objreturn.CNT = Convert.ToInt32(cmd.Parameters["@CNT"].Value);
                    objreturn.MSG = Convert.ToString(cmd.Parameters["@MSG"].Value);
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return objreturn;
        }



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
                        obj.ORG_FILE_NAME = ds.Tables[0].Rows[i]["ORG_FILE_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["ORG_FILE_NAME"].ToString();
                        obj.PHY_FILE_NAME = ds.Tables[0].Rows[i]["PHY_FILE_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["PHY_FILE_NAME"].ToString();
                        obj.SORT_ORDER = ds.Tables[0].Rows[i]["SORT_ORDER"] == DBNull.Value ? 0 : Convert.ToInt32(ds.Tables[0].Rows[i]["SORT_ORDER"].ToString());
                        obj.IS_THUMBNAIL = ds.Tables[0].Rows[i]["IS_THUMBNAIL"] == DBNull.Value ? true : Convert.ToBoolean(ds.Tables[0].Rows[i]["IS_THUMBNAIL"]);
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

        public DbStatusEntity InsertCatalogImages(CatalogImageEntity obj)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_InsertCatalogImages", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CATALOG_ID", obj.CATALOG_ID);
                    cmd.Parameters.AddWithValue("@ORG_FILE_NAME", obj.ORG_FILE_NAME);
                    cmd.Parameters.AddWithValue("@PHY_FILE_NAME", obj.PHY_FILE_NAME);

                    cmd.Parameters.Add("@RESULT", SqlDbType.Int);
                    cmd.Parameters["@RESULT"].Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("@CNT", SqlDbType.Int);
                    cmd.Parameters["@CNT"].Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("@MSG", SqlDbType.NVarChar, 500);
                    cmd.Parameters["@MSG"].Direction = ParameterDirection.Output;
                    con.Open();
                    cmd.ExecuteNonQuery();
                    objreturn.RESULT = Convert.ToInt32(cmd.Parameters["@RESULT"].Value);
                    objreturn.CNT = Convert.ToInt32(cmd.Parameters["@CNT"].Value);
                    objreturn.MSG = Convert.ToString(cmd.Parameters["@MSG"].Value);
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return objreturn;
        }

        public DbStatusEntity DeleteCatalogImages(long id, string phy_file_name)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_DeleteCatalogImage", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    cmd.Parameters.AddWithValue("@PHY_FILE_NAME", phy_file_name);

                    cmd.Parameters.Add("@RESULT", SqlDbType.Int);
                    cmd.Parameters["@RESULT"].Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("@CNT", SqlDbType.Int);
                    cmd.Parameters["@CNT"].Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("@MSG", SqlDbType.NVarChar, 500);
                    cmd.Parameters["@MSG"].Direction = ParameterDirection.Output;
                    con.Open();
                    cmd.ExecuteNonQuery();
                    objreturn.RESULT = Convert.ToInt32(cmd.Parameters["@RESULT"].Value);
                    objreturn.CNT = Convert.ToInt32(cmd.Parameters["@CNT"].Value);
                    objreturn.MSG = Convert.ToString(cmd.Parameters["@MSG"].Value);
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return objreturn;
        }


        public DbStatusEntity UpdateCatalogImagesStatus(long id, string phy_file_name)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_UpdateCatalogImageStatus", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    cmd.Parameters.AddWithValue("@PHY_FILE_NAME", phy_file_name);

                    cmd.Parameters.Add("@RESULT", SqlDbType.Int);
                    cmd.Parameters["@RESULT"].Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("@CNT", SqlDbType.Int);
                    cmd.Parameters["@CNT"].Direction = ParameterDirection.Output;
                    cmd.Parameters.Add("@MSG", SqlDbType.NVarChar, 500);
                    cmd.Parameters["@MSG"].Direction = ParameterDirection.Output;
                    con.Open();
                    cmd.ExecuteNonQuery();
                    objreturn.RESULT = Convert.ToInt32(cmd.Parameters["@RESULT"].Value);
                    objreturn.CNT = Convert.ToInt32(cmd.Parameters["@CNT"].Value);
                    objreturn.MSG = Convert.ToString(cmd.Parameters["@MSG"].Value);
                    con.Close();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return objreturn;
        }

    }
}