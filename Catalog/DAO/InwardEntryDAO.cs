﻿using Catalog.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;


namespace Catalog.DAO
{
    public class InwardEntryDAO
    {
        public List<InwardEntryEntity> GetInwardEntryList(InwardEntryDateFilterEntity obj)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<InwardEntryEntity> retlst = new List<InwardEntryEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetInwardEntryMainList", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@DateFrom", obj.DateFrom);
                    cmd.Parameters.AddWithValue("@DateTo", obj.DateTo);
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);
                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        InwardEntryEntity obj1 = new InwardEntryEntity();
                        obj1.ID = Convert.ToInt64(ds.Tables[0].Rows[i]["ID"]);
                        obj1.TRANS_NO = ds.Tables[0].Rows[i]["TRANS_NO"] != DBNull.Value ? Convert.ToInt64(ds.Tables[0].Rows[i]["TRANS_NO"]) : 0;
                        if (ds.Tables[0].Rows[i]["TRANS_DATE"] != DBNull.Value)
                            obj1.TRANS_DATE = Convert.ToString(ds.Tables[0].Rows[i]["TRANS_DATE"]);
                        obj1.LED_NAME = ds.Tables[0].Rows[i]["LED_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["LED_NAME"].ToString();
                        obj1.REMARKS = ds.Tables[0].Rows[i]["REMARKS"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["REMARKS"].ToString();
                        obj1.VOID_STATUS = ds.Tables[0].Rows[i]["VOID_STATUS"] == DBNull.Value ? false : Convert.ToBoolean(ds.Tables[0].Rows[i]["VOID_STATUS"]);
                        obj1.CREATEDBY = ds.Tables[0].Rows[i]["CREATEDBY"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["CREATEDBY"].ToString();
                        obj1.MODIFIEDBY = ds.Tables[0].Rows[i]["MODIFIEDBY"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["MODIFIEDBY"].ToString();
                        obj1.IN_TYPE_NAME = ds.Tables[0].Rows[i]["IN_TYPE_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["IN_TYPE_NAME"].ToString();
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

        public DbStatusEntity InsertInwardEntry(InwardEntryInsertParam1 obj, InwardEntryInsertParam2[] obj2, Int64 userid)
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
                dtsub.Columns.Add("OUT_TRANS_MAIN_ID", typeof(Int64));
                dtsub.Columns.Add("OUT_TRANS_NO", typeof(Int64));
                dtsub.Columns.Add("OUT_GENID", typeof(string));
                dtsub.Columns.Add("OUT_QTY", typeof(double));
                dtsub.Columns.Add("OUT_BAL_QTY", typeof(double));

                foreach (InwardEntryInsertParam2 ob in obj2)
                {
                    DataRow dr = dtsub.NewRow();
                    dr["CATALOG_ID"] = ob.CATALOG_ID;
                    dr["SKU"] = ob.SKU;
                    dr["CODE"] = ob.CODE;
                    dr["CATALOG_TITLE"] = ob.CATALOG_TITLE;
                    dr["QTY"] = ob.QTY;
                    dr["REMARKS"] = ob.REMARKS;
                    dr["GENID"] = ob.GENID;
                    dr["OUT_TRANS_MAIN_ID"] = ob.OUT_TRANS_MAIN_ID;
                    dr["OUT_TRANS_NO"] = ob.OUT_TRANS_NO;
                    dr["OUT_GENID"] = ob.OUT_GENID;
                    dr["OUT_QTY"] = ob.OUT_QTY;
                    dr["OUT_BAL_QTY"] = ob.OUT_BAL_QTY;
                    dtsub.Rows.Add(dr);
                }
                dtsub.AcceptChanges();

                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_InsertInwardEntry", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@LED_NAME", obj.LED_NAME);
                    cmd.Parameters.AddWithValue("@TRANS_DATE", obj.TRANS_DATE);
                    cmd.Parameters.AddWithValue("@REF_NO", obj.REF_NO);
                    cmd.Parameters.AddWithValue("@REMARKS", obj.REMARKS);
                    cmd.Parameters.AddWithValue("@USER_ID", userid);
                    cmd.Parameters.AddWithValue("@IN_TYPE_NAME", obj.IN_TYPE_NAME);

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

        public DbStatusEntity UpdateInwardEntry(InwardEntryInsertParam1 obj, InwardEntryInsertParam2[] obj2, Int64 userid, Int64 id)
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
                dtsub.Columns.Add("OUT_TRANS_MAIN_ID", typeof(Int64));
                dtsub.Columns.Add("OUT_TRANS_NO", typeof(Int64));
                dtsub.Columns.Add("OUT_GENID", typeof(string));
                dtsub.Columns.Add("OUT_QTY", typeof(double));
                dtsub.Columns.Add("OUT_BAL_QTY", typeof(double));

                foreach (InwardEntryInsertParam2 ob in obj2)
                {
                    DataRow dr = dtsub.NewRow();
                    dr["CATALOG_ID"] = ob.CATALOG_ID;
                    dr["SKU"] = ob.SKU;
                    dr["CODE"] = ob.CODE;
                    dr["CATALOG_TITLE"] = ob.CATALOG_TITLE;
                    dr["QTY"] = ob.QTY;
                    dr["REMARKS"] = ob.REMARKS;
                    dr["GENID"] = ob.GENID;
                    dr["OUT_TRANS_MAIN_ID"] = ob.OUT_TRANS_MAIN_ID;
                    dr["OUT_TRANS_NO"] = ob.OUT_TRANS_NO;
                    dr["OUT_GENID"] = ob.OUT_GENID;
                    dr["OUT_QTY"] = ob.OUT_QTY;
                    dr["OUT_BAL_QTY"] = ob.OUT_BAL_QTY;
                    dtsub.Rows.Add(dr);
                }
                dtsub.AcceptChanges();

                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_UpdateInwardEntry", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@TRANS_MAIN_ID", id);
                    cmd.Parameters.AddWithValue("@LED_NAME", obj.LED_NAME);
                    cmd.Parameters.AddWithValue("@TRANS_DATE", obj.TRANS_DATE);
                    cmd.Parameters.AddWithValue("@REF_NO", obj.REF_NO);
                    cmd.Parameters.AddWithValue("@REMARKS", obj.REMARKS);
                    cmd.Parameters.AddWithValue("@USER_ID", userid);
                    cmd.Parameters.AddWithValue("@IN_TYPE_NAME", obj.IN_TYPE_NAME);

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

        public DbStatusEntity DeleteInwardEntry(Int64 id)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_DeleteInwardEntry", con);
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

        public DbStatusEntity VoidInwardEntry(Int64 id)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_VoidInwardEntry", con);
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

        public List<InwardEntryEditParam> EditInwardEnrty(long id)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<InwardEntryEditParam> retlst = new List<InwardEntryEditParam>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetInwardEntryDetailsbyID", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    if (ds.Tables[0].Rows.Count > 0 && ds.Tables[1].Rows.Count > 0)
                    {
                        for (int i = 0; i <= ds.Tables[1].Rows.Count - 1; i++)
                        {
                            InwardEntryEditParam obj = new InwardEntryEditParam();
                            obj.TRANS_MAIN_ID = ds.Tables[0].Rows[0]["TRANS_MAIN_ID"] == DBNull.Value ? 0 : Convert.ToInt64(ds.Tables[0].Rows[0]["TRANS_MAIN_ID"]);
                            obj.TRANS_DATE = ds.Tables[0].Rows[0]["TRANS_DATE"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[0].Rows[0]["TRANS_DATE"]);
                            obj.TRANS_NO = ds.Tables[0].Rows[0]["TRANS_NO"] == DBNull.Value ? 0 : Convert.ToInt64(ds.Tables[0].Rows[0]["TRANS_NO"]);
                            obj.REF_NO = ds.Tables[0].Rows[0]["REF_NO"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[0].Rows[0]["REF_NO"]);
                            obj.LED_ID = ds.Tables[0].Rows[0]["LED_ID"] == DBNull.Value ? "0" : Convert.ToString(ds.Tables[0].Rows[0]["LED_ID"]);
                            obj.LED_NAME = ds.Tables[0].Rows[0]["LED_NAME"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[0].Rows[0]["LED_NAME"]);
                            obj.REMARKS_MAIN = ds.Tables[0].Rows[0]["REMARKS_MAIN"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[0].Rows[0]["REMARKS_MAIN"]);
                            obj.IN_TYPE_ID = ds.Tables[0].Rows[0]["IN_TYPE_ID"] == DBNull.Value ? 0 : Convert.ToInt64(ds.Tables[0].Rows[0]["IN_TYPE_ID"]);
                            obj.IN_TYPE_NAME = ds.Tables[0].Rows[0]["IN_TYPE_NAME"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[0].Rows[0]["IN_TYPE_NAME"]);

                            obj.CATALOG_ID = ds.Tables[1].Rows[i]["CATALOG_ID"] == DBNull.Value ? 0 : Convert.ToInt64(ds.Tables[1].Rows[i]["CATALOG_ID"]);
                            obj.SKU = ds.Tables[1].Rows[i]["SKU"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[1].Rows[i]["SKU"]);
                            obj.CODE = ds.Tables[1].Rows[i]["CODE"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[1].Rows[i]["CODE"]);
                            obj.CATALOG_TITLE = ds.Tables[1].Rows[i]["CATALOG_TITLE"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[1].Rows[i]["CATALOG_TITLE"]);
                            obj.QTY = ds.Tables[1].Rows[i]["QTY"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[1].Rows[i]["QTY"]);
                            obj.REMARKS = ds.Tables[1].Rows[i]["REMARKS"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[1].Rows[i]["REMARKS"]);
                            obj.GENID = ds.Tables[1].Rows[i]["GENID"] == DBNull.Value ? 0 : Convert.ToInt64(ds.Tables[1].Rows[i]["GENID"]);
                            obj.ORG_FILE_NAME = ds.Tables[1].Rows[i]["ORG_FILE_NAME"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[1].Rows[i]["ORG_FILE_NAME"]);
                            obj.PHY_FILE_NAME = ds.Tables[1].Rows[i]["PHY_FILE_NAME"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[1].Rows[i]["PHY_FILE_NAME"]);

                            obj.OUT_TRANS_MAIN_ID = ds.Tables[1].Rows[i]["OUT_TRANS_MAIN_ID"] == DBNull.Value ? 0 : Convert.ToInt64(ds.Tables[1].Rows[i]["OUT_TRANS_MAIN_ID"]);
                            obj.OUT_TRANS_NO = ds.Tables[1].Rows[i]["OUT_TRANS_NO"] == DBNull.Value ? 0 : Convert.ToInt64(ds.Tables[1].Rows[i]["OUT_TRANS_NO"]);
                            obj.OUT_QTY = ds.Tables[1].Rows[i]["OUT_QTY"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[1].Rows[i]["OUT_QTY"]);
                            obj.OUT_BAL_QTY = ds.Tables[1].Rows[i]["OUT_BAL_QTY"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[1].Rows[i]["OUT_BAL_QTY"]);
                            obj.OUT_GENID = ds.Tables[1].Rows[i]["OUT_GENID"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[1].Rows[i]["OUT_GENID"]);
                            obj.PCS = ds.Tables[1].Rows[i]["PCS"] == DBNull.Value ? 1 : Convert.ToInt32(ds.Tables[1].Rows[i]["PCS"]);
                            obj.WT = ds.Tables[1].Rows[i]["WT"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[1].Rows[i]["WT"]);
                            retlst.Add(obj);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return retlst;
        }

        public List<Int64> CheckVoidInwardEnrty(long id)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<Int64> retvallst = new List<Int64>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    Int64 retval = 0;
                    SqlCommand cmd = new SqlCommand("USP_GetInwardEntryVoidDetailsbyID", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);
                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        retval = ds.Tables[0].Rows[i]["ID"] == DBNull.Value ? 0 : Convert.ToInt64(ds.Tables[0].Rows[i]["ID"]);
                    }
                    retvallst.Add(retval);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return retvallst;
        }

        public List<PendingOutwardEntries> GetPendingOutwardEntries(string ledname)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<PendingOutwardEntries> retlst = new List<PendingOutwardEntries>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetPendingOutwardEntries", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@LedName", ledname);
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        PendingOutwardEntries obj = new PendingOutwardEntries();
                        obj.CATALOG_ID = ds.Tables[0].Rows[i]["CATALOG_ID"] == DBNull.Value ? 0 : Convert.ToInt64(ds.Tables[0].Rows[i]["CATALOG_ID"]);
                        obj.SKU = ds.Tables[0].Rows[i]["SKU"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[0].Rows[i]["SKU"]);
                        obj.CODE = ds.Tables[0].Rows[i]["CODE"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[0].Rows[i]["CODE"]);
                        obj.CATALOG_TITLE = ds.Tables[0].Rows[i]["CATALOG_TITLE"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[0].Rows[i]["CATALOG_TITLE"]);
                        obj.OUT_TRANS_MAIN_ID = ds.Tables[0].Rows[i]["OUT_TRANS_MAIN_ID"] == DBNull.Value ? 0 : Convert.ToInt64(ds.Tables[0].Rows[i]["OUT_TRANS_MAIN_ID"]);
                        obj.OUT_TRANS_NO = ds.Tables[0].Rows[i]["OUT_TRANS_NO"] == DBNull.Value ? 0 : Convert.ToInt64(ds.Tables[0].Rows[i]["OUT_TRANS_NO"]);
                        obj.OUT_GENID = ds.Tables[0].Rows[i]["OUT_GENID"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[0].Rows[i]["OUT_GENID"]);
                        obj.OUT_QTY = ds.Tables[0].Rows[i]["OUT_QTY"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["OUT_QTY"]);
                        obj.OUT_BAL_QTY = ds.Tables[0].Rows[i]["OUT_BAL_QTY"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["OUT_BAL_QTY"]);
                        obj.ORG_FILE_NAME = ds.Tables[0].Rows[i]["ORG_FILE_NAME"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[0].Rows[i]["ORG_FILE_NAME"]);
                        obj.PHY_FILE_NAME = ds.Tables[0].Rows[i]["PHY_FILE_NAME"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[0].Rows[i]["PHY_FILE_NAME"]);
                        obj.OUT_TRANS_DATE = ds.Tables[0].Rows[i]["OUT_TRANS_DATE"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[0].Rows[i]["OUT_TRANS_DATE"]);
                        obj.PCS = ds.Tables[0].Rows[i]["PCS"] == DBNull.Value ? 1 : Convert.ToInt32(ds.Tables[0].Rows[i]["PCS"]);
                        obj.WT = ds.Tables[0].Rows[i]["WT"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[0].Rows[i]["WT"]);
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

        public List<InwardRegisterResultEntity> GetInwardRegister(InwardRegisterParamEntity obj)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<InwardRegisterResultEntity> retlst = new List<InwardRegisterResultEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetInwardRegister", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@DateFrom", obj.FROMDATE);
                    cmd.Parameters.AddWithValue("@DateTo", obj.TODATE);
                    cmd.Parameters.AddWithValue("@FromNo", obj.FROMNO);
                    cmd.Parameters.AddWithValue("@ToNo", obj.TONO);
                    cmd.Parameters.AddWithValue("@LedName", obj.LEDNAME);
                    cmd.Parameters.AddWithValue("@JewelleryIDs", obj.JEWELLERYIDS);
                    cmd.Parameters.AddWithValue("@DesignIDs", obj.DESIGNIDS);
                    cmd.Parameters.AddWithValue("@CollectionsIDs", obj.COLLECTIONSIDS);
                    cmd.Parameters.AddWithValue("@MaterialIDs", obj.MATERIALIDS);
                    cmd.Parameters.AddWithValue("@OccasionIDs", obj.OCCASIONIDS);
                    cmd.Parameters.AddWithValue("@GramSlabIDs", obj.GRAMSLABIDS);
                    cmd.Parameters.AddWithValue("@KaratIDs", obj.KARATIDS);
                    cmd.Parameters.AddWithValue("@SKU", obj.SKU);
                    cmd.Parameters.AddWithValue("@CODE", obj.CODE);
                    cmd.Parameters.AddWithValue("@Desc", obj.DESC);
                    cmd.Parameters.AddWithValue("@IN_TYPE_ID", obj.IN_TYPE_ID);
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);
                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        InwardRegisterResultEntity obj1 = new InwardRegisterResultEntity();
                        obj1.TRANS_MAIN_ID = ds.Tables[0].Rows[i]["TRANS_MAIN_ID"] != DBNull.Value ? Convert.ToInt64(ds.Tables[0].Rows[i]["TRANS_MAIN_ID"]) : 0;
                        obj1.TRANS_NO = ds.Tables[0].Rows[i]["TRANS_NO"] != DBNull.Value ? Convert.ToInt64(ds.Tables[0].Rows[i]["TRANS_NO"]) : 0;
                        obj1.TRANS_DATE = ds.Tables[0].Rows[i]["TRANS_DATE"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["TRANS_DATE"].ToString();
                        obj1.REF_NO = ds.Tables[0].Rows[i]["REF_NO"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["REF_NO"].ToString();
                        obj1.LED_NAME = ds.Tables[0].Rows[i]["LED_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["LED_NAME"].ToString();
                        obj1.REMARKS_M = ds.Tables[0].Rows[i]["REMARKS_M"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["REMARKS_M"].ToString();
                        obj1.VOID_STATUS = ds.Tables[0].Rows[i]["VOID_STATUS"] == DBNull.Value ? false : Convert.ToBoolean(ds.Tables[0].Rows[i]["VOID_STATUS"]);
                        obj1.CREATEDBY = ds.Tables[0].Rows[i]["CREATEDBY"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["CREATEDBY"].ToString();
                        obj1.MODIFIEDBY = ds.Tables[0].Rows[i]["MODIFIEDBY"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["MODIFIEDBY"].ToString();
                        obj1.IN_TYPE_NAME = ds.Tables[0].Rows[i]["IN_TYPE_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["IN_TYPE_NAME"].ToString();

                        obj1.TRANS_SUB_ID = ds.Tables[0].Rows[i]["TRANS_SUB_ID"] != DBNull.Value ? Convert.ToInt64(ds.Tables[0].Rows[i]["TRANS_SUB_ID"]) : 0;
                        obj1.SKU = ds.Tables[0].Rows[i]["SKU"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["SKU"].ToString();
                        obj1.CODE = ds.Tables[0].Rows[i]["CODE"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["CODE"].ToString();
                        obj1.CATALOG_TITLE = ds.Tables[0].Rows[i]["CATALOG_TITLE"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["CATALOG_TITLE"].ToString();
                        obj1.QTY = ds.Tables[0].Rows[i]["QTY"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["QTY"]);
                        obj1.OUT_TRANS_NO = ds.Tables[0].Rows[i]["OUT_TRANS_NO"] == DBNull.Value ? 0 : Convert.ToInt64(ds.Tables[0].Rows[i]["OUT_TRANS_NO"]);
                        obj1.REMARKS = ds.Tables[0].Rows[i]["REMARKS"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["REMARKS"].ToString();
                        obj1.PCS = ds.Tables[0].Rows[i]["PCS"] == DBNull.Value ? 1 : Convert.ToInt32(ds.Tables[0].Rows[i]["PCS"]);
                        obj1.WT = ds.Tables[0].Rows[i]["WT"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["WT"].ToString();
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

    }
}