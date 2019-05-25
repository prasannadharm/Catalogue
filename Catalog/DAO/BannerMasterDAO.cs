using System;
using System.Collections.Generic;
using Catalog.Models;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace Catalog.DAO
{
    public class BannerMasterDAO
    {
        public List<BannerImageEntity> GetBannerList()
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<BannerImageEntity> retlst = new List<BannerImageEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetBannerMasterList", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        BannerImageEntity obj = new BannerImageEntity();
                        obj.ID = Convert.ToInt32(ds.Tables[0].Rows[i]["ID"].ToString());
                        obj.HEADING = ds.Tables[0].Rows[i]["HEADING"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["HEADING"].ToString();
                        obj.DESCRIPTION = ds.Tables[0].Rows[i]["DESCRIPTION"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["DESCRIPTION"].ToString();
                        obj.ORG_FILE_NAME = ds.Tables[0].Rows[i]["ORG_FILE_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["ORG_FILE_NAME"].ToString();
                        obj.PHY_FILE_NAME = ds.Tables[0].Rows[i]["PHY_FILE_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["PHY_FILE_NAME"].ToString();
                        obj.FCOLOR = ds.Tables[0].Rows[i]["FCOLOR"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["FCOLOR"].ToString();
                        obj.SORT_ORDER = ds.Tables[0].Rows[i]["SORT_ORDER"] == DBNull.Value ? 0: Convert.ToInt32(ds.Tables[0].Rows[i]["SORT_ORDER"].ToString());
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


        public List<BannerImageEntity> EditBanner(Int64 id)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<BannerImageEntity> retlst = new List<BannerImageEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetBannerDetailsbyID", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        BannerImageEntity obj = new BannerImageEntity();
                        obj.ID = Convert.ToInt32(ds.Tables[0].Rows[i]["ID"].ToString());
                        obj.HEADING = ds.Tables[0].Rows[i]["HEADING"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["HEADING"].ToString();
                        obj.DESCRIPTION = ds.Tables[0].Rows[i]["DESCRIPTION"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["DESCRIPTION"].ToString();
                        obj.ORG_FILE_NAME = ds.Tables[0].Rows[i]["ORG_FILE_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["ORG_FILE_NAME"].ToString();
                        obj.PHY_FILE_NAME = ds.Tables[0].Rows[i]["PHY_FILE_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["PHY_FILE_NAME"].ToString();
                        obj.FCOLOR = ds.Tables[0].Rows[i]["FCOLOR"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["FCOLOR"].ToString();
                        obj.SORT_ORDER = ds.Tables[0].Rows[i]["SORT_ORDER"] == DBNull.Value ? 0 : Convert.ToInt32(ds.Tables[0].Rows[i]["SORT_ORDER"].ToString());
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


        public DbStatusEntity UpdateBanner(BannerImageEntity obj, int id)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_UpdateBannerMaster", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    cmd.Parameters.AddWithValue("@HEADING", obj.HEADING);
                    cmd.Parameters.AddWithValue("@DESCRIPTION", obj.DESCRIPTION);
                    cmd.Parameters.AddWithValue("@FCOLOR", obj.FCOLOR);

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

        public DbStatusEntity InsertBanner(BannerImageEntity obj)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_InsertBannerMaster", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@HEADING", obj.HEADING);
                    cmd.Parameters.AddWithValue("@DESCRIPTION", obj.DESCRIPTION);
                    cmd.Parameters.AddWithValue("@ORG_FILE_NAME", obj.ORG_FILE_NAME);
                    cmd.Parameters.AddWithValue("@PHY_FILE_NAME", obj.PHY_FILE_NAME);
                    cmd.Parameters.AddWithValue("@FCOLOR", obj.FCOLOR);

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

        public DbStatusEntity DeleteBanner(Int64 id)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_DeleteBannerMaster", con);
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
    }
}