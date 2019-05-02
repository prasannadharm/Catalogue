using Catalog.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace Catalog.DAO
{
    public class LedgerMasterDAO
    {
        public List<LedgerMasterEntity> GetLedgerMasterList()
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<LedgerMasterEntity> retlst = new List<LedgerMasterEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetLedgerMasterList", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        LedgerMasterEntity obj = new LedgerMasterEntity();
                        obj.ID = Convert.ToInt32(ds.Tables[0].Rows[i]["ID"].ToString());
                        obj.NAME = ds.Tables[0].Rows[i]["NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["NAME"].ToString();
                        obj.ALIAS_NAME = ds.Tables[0].Rows[i]["ALIAS_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["ALIAS_NAME"].ToString();
                        obj.LEDGER_TYPE = ds.Tables[0].Rows[i]["LEDGER_TYPE"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["LEDGER_TYPE"].ToString();
                        obj.CITY = ds.Tables[0].Rows[i]["CITY"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["CITY"].ToString();
                        obj.MOBILE = ds.Tables[0].Rows[i]["MOBILE"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["MOBILE"].ToString();
                        obj.ACTIVE_STATUS = ds.Tables[0].Rows[i]["ACTIVE_STATUS"] == DBNull.Value ? true : Convert.ToBoolean(ds.Tables[0].Rows[i]["ACTIVE_STATUS"]);
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

        public List<LedgerMasterEntity> EditLedgerMaster(int id)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<LedgerMasterEntity> retlst = new List<LedgerMasterEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetLedegerDetailsbyID", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        LedgerMasterEntity obj = new LedgerMasterEntity();
                        obj.ID = Convert.ToInt32(ds.Tables[0].Rows[i]["ID"].ToString());
                        obj.NAME = ds.Tables[0].Rows[i]["NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["NAME"].ToString();
                        obj.ALIAS_NAME = ds.Tables[0].Rows[i]["ALIAS_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["ALIAS_NAME"].ToString();
                        obj.LEDGER_TYPE_ID = ds.Tables[0].Rows[i]["LEDGER_TYPE_ID"] == DBNull.Value ? 0 : Convert.ToInt32(ds.Tables[0].Rows[i]["LEDGER_TYPE_ID"].ToString());
                        obj.ADDRESS = ds.Tables[0].Rows[i]["ALIAS_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["ADDRESS"].ToString();
                        obj.CITY = ds.Tables[0].Rows[i]["CITY"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["CITY"].ToString();
                        obj.STATE = ds.Tables[0].Rows[i]["STATE"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["STATE"].ToString();
                        obj.PIN_NO = ds.Tables[0].Rows[i]["PIN_NO"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["PIN_NO"].ToString();
                        obj.MOBILE = ds.Tables[0].Rows[i]["MOBILE"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["MOBILE"].ToString();
                        obj.TELEPHONE = ds.Tables[0].Rows[i]["TELEPHONE"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["TELEPHONE"].ToString();
                        obj.EMAIL = ds.Tables[0].Rows[i]["EMAIL"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["EMAIL"].ToString();
                        obj.WEB = ds.Tables[0].Rows[i]["ALIAS_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["WEB"].ToString();
                        obj.GSTIN = ds.Tables[0].Rows[i]["GSTIN"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["GSTIN"].ToString();
                        obj.REMARKS = ds.Tables[0].Rows[i]["REMARKS"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["REMARKS"].ToString();
                        obj.ACTIVE_STATUS = ds.Tables[0].Rows[i]["ACTIVE_STATUS"] == DBNull.Value ? true : Convert.ToBoolean(ds.Tables[0].Rows[i]["ACTIVE_STATUS"]);
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

        public DbStatusEntity UpdateLedgerMaster(LedgerMasterEntity obj, int id)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_UpdateLedgerMaster", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    cmd.Parameters.AddWithValue("@NAME", obj.NAME);
                    cmd.Parameters.AddWithValue("@ALIAS_NAME", obj.ALIAS_NAME);
                    cmd.Parameters.AddWithValue("@LEDGER_TYPE_ID", obj.LEDGER_TYPE_ID);
                    cmd.Parameters.AddWithValue("@ADDRESS", obj.ADDRESS);
                    cmd.Parameters.AddWithValue("@CITY", obj.CITY);
                    cmd.Parameters.AddWithValue("@STATE", obj.STATE);
                    cmd.Parameters.AddWithValue("@PIN_NO", obj.PIN_NO);
                    cmd.Parameters.AddWithValue("@MOBILE", obj.MOBILE);
                    cmd.Parameters.AddWithValue("@TELEPHONE", obj.TELEPHONE);
                    cmd.Parameters.AddWithValue("@EMAIL", obj.EMAIL);
                    cmd.Parameters.AddWithValue("@WEB", obj.WEB);
                    cmd.Parameters.AddWithValue("@GSTIN", obj.GSTIN);
                    cmd.Parameters.AddWithValue("@REMARKS", obj.REMARKS);                    
                    cmd.Parameters.AddWithValue("@ACTIVE_STATUS", obj.ACTIVE_STATUS);

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

        public DbStatusEntity InsertLedgerMaster(LedgerMasterEntity obj)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;

            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_InsertLedgerMaster", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@NAME", obj.NAME);
                    cmd.Parameters.AddWithValue("@ALIAS_NAME", obj.ALIAS_NAME);
                    cmd.Parameters.AddWithValue("@LEDGER_TYPE_ID", obj.LEDGER_TYPE_ID);
                    cmd.Parameters.AddWithValue("@ADDRESS", obj.ADDRESS);
                    cmd.Parameters.AddWithValue("@CITY", obj.CITY);
                    cmd.Parameters.AddWithValue("@STATE", obj.STATE); 
                    cmd.Parameters.AddWithValue("@PIN_NO", obj.PIN_NO);
                    cmd.Parameters.AddWithValue("@MOBILE", obj.MOBILE);
                    cmd.Parameters.AddWithValue("@TELEPHONE", obj.TELEPHONE);
                    cmd.Parameters.AddWithValue("@EMAIL", obj.EMAIL);
                    cmd.Parameters.AddWithValue("@WEB", obj.WEB);
                    cmd.Parameters.AddWithValue("@GSTIN", obj.GSTIN);
                    cmd.Parameters.AddWithValue("@REMARKS", obj.REMARKS);
                    cmd.Parameters.AddWithValue("@ACTIVE_STATUS", obj.ACTIVE_STATUS);                 

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

        public DbStatusEntity DeleteLedgerMaster(int id)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;

            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_DeleteLedgerMaster", con);
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