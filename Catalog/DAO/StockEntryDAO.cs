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
                        obj1.VOID_STATUS = ds.Tables[0].Rows[i]["VOID_STATUS"] == DBNull.Value ? false :  Convert.ToBoolean(ds.Tables[0].Rows[i]["VOID_STATUS"]);
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

        public List<string> GetLedgersbyName(string str)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<string> ledgers = new List<string>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetLedgerListByName", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@STR", str);                    
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);
                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        ledgers.Add(string.Format("{0}-{1}", ds.Tables[0].Rows[i]["NAME"].ToString(), ds.Tables[0].Rows[i]["ID"]));                    
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ledgers;
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
    }
}