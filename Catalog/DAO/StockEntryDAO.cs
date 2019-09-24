using Catalog.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace Catalog.DAO
{
    public class StockEntryDAO
    {
        public List<StockEntryEntity> GetStockEntryList(DateFilterEntity obj)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<StockEntryEntity> retlst = new List<StockEntryEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetStockEntryMainList", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@DateFrom", obj.DateFrom);
                    cmd.Parameters.AddWithValue("@DateTo", obj.DateTo);
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);
                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        StockEntryEntity obj1 = new StockEntryEntity();
                        obj1.ID = Convert.ToInt64(ds.Tables[0].Rows[i]["ID"]);
                        obj1.TRANS_NO = ds.Tables[0].Rows[i]["TRANS_NO"] != DBNull.Value ? Convert.ToInt64(ds.Tables[0].Rows[i]["TRANS_NO"]) : 0;
                        if (ds.Tables[0].Rows[i]["TRASN_DATE"] != DBNull.Value)
                            obj1.TRASN_DATE = Convert.ToString(ds.Tables[0].Rows[i]["TRASN_DATE"]);
                        obj1.LED_NAME = ds.Tables[0].Rows[i]["LED_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["LED_NAME"].ToString();
                        obj1.REMARKS = ds.Tables[0].Rows[i]["REMARKS"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["REMARKS"].ToString();
                        obj1.VOID_STATUS = ds.Tables[0].Rows[i]["VOID_STATUS"] == DBNull.Value ? false : Convert.ToBoolean(ds.Tables[0].Rows[i]["VOID_STATUS"]);
                        obj1.CREATEDBY = ds.Tables[0].Rows[i]["CREATEDBY"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["CREATEDBY"].ToString();
                        obj1.MODIFIEDBY = ds.Tables[0].Rows[i]["MODIFIEDBY"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["MODIFIEDBY"].ToString();
                        retlst.Add(obj1);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return retlst;
        }

        public List<string> GetLatestTrasnsactionNumber(string str)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<string> lstvalues = new List<string>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetTransNo", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@STR", str);
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);
                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        lstvalues.Add(string.Format("{0}-{1}", ds.Tables[0].Rows[i]["NUMBER"].ToString(), ds.Tables[0].Rows[i]["DATE"].ToString()));
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return lstvalues;
        }

        public DbStatusEntity InsertStockEntry(StockEntryInsertParam1 obj, StockEntryInsertParam2[] obj2, Int64 userid)
        {
            DataTable dtsub = new DataTable();
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                dtsub.Columns.Add("CATALOG_ID", typeof(Int64));
                dtsub.Columns.Add("SKU", typeof(string));
                dtsub.Columns.Add("CODE", typeof(string));
                dtsub.Columns.Add("CATALOG_TITLE", typeof(string));
                dtsub.Columns.Add("QTY", typeof(double));
                dtsub.Columns.Add("REMARKS", typeof(string));
                dtsub.Columns.Add("GENID", typeof(string));
                foreach (StockEntryInsertParam2 ob in obj2)
                {
                    DataRow dr = dtsub.NewRow();
                    dr["CATALOG_ID"] = ob.ID;
                    dr["SKU"] = ob.SKU;
                    dr["CODE"] = ob.CODE;
                    dr["CATALOG_TITLE"] = ob.TITLE;
                    dr["QTY"] = ob.QTY;
                    dr["REMARKS"] = ob.REMARKS;
                    dr["GENID"] = ob.GENID;
                    dtsub.Rows.Add(dr);
                }
                dtsub.AcceptChanges();
                
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_InsertStockEntry", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@LED_NAME", obj.LED_NAME);
                    cmd.Parameters.AddWithValue("@TRANS_DATE", obj.TRANS_DATE);
                    cmd.Parameters.AddWithValue("@REF_NO", obj.REF_NO);
                    cmd.Parameters.AddWithValue("@REMARKS", obj.REMARKS);
                    cmd.Parameters.AddWithValue("@USER_ID", userid);

                    SqlParameter sqlParam = cmd.Parameters.AddWithValue("@TVP", dtsub);
                    sqlParam.SqlDbType = SqlDbType.Structured;

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