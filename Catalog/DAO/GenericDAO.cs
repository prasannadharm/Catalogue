using Catalog.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Catalog.DAO
{
    public class GenericDAO
    {
        public List<StateMasterEntity> GetStateList()
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<StateMasterEntity> retlst = new List<StateMasterEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetActiveStateList", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        StateMasterEntity obj = new StateMasterEntity();
                        obj.ID = Convert.ToInt32(ds.Tables[0].Rows[i]["ID"].ToString());
                        obj.NAME = ds.Tables[0].Rows[i]["NAME"].ToString();
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

        public List<CityStateMasterEntity> GetCityByState(string strstate)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<CityStateMasterEntity> retlst = new List<CityStateMasterEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetCityByState", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@STATE", strstate);
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        CityStateMasterEntity obj = new CityStateMasterEntity();
                        obj.ID = Convert.ToInt32(ds.Tables[0].Rows[i]["ID"].ToString());
                        obj.CITY = ds.Tables[0].Rows[i]["CITY"].ToString();
                        obj.STATE = ds.Tables[0].Rows[i]["STATE"].ToString();
                        obj.ACTIVE_STATUS = Convert.ToBoolean(ds.Tables[0].Rows[i]["ACTIVE_STATUS"]);
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

        public List<RoleMasterEntitycs> GetActiveRoleList()
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<RoleMasterEntitycs> retlst = new List<RoleMasterEntitycs>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetActiveRoleList", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        if (ds.Tables[0].Rows[i]["ROLE_NAME"] != DBNull.Value)
                        {
                            RoleMasterEntitycs obj = new RoleMasterEntitycs();
                            obj.ROLE_ID = Convert.ToInt32(ds.Tables[0].Rows[i]["ROLE_ID"].ToString());
                            obj.ROLE_NAME = ds.Tables[0].Rows[i]["ROLE_NAME"].ToString();
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

        public List<LedgerTypeMasterEntity> GetActiveLedgerTypeList()
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<LedgerTypeMasterEntity> retlst = new List<LedgerTypeMasterEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetActiveLedgerTypeList", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        LedgerTypeMasterEntity obj = new LedgerTypeMasterEntity();
                        obj.ID = Convert.ToInt32(ds.Tables[0].Rows[i]["ID"].ToString());
                        obj.NAME = ds.Tables[0].Rows[i]["NAME"].ToString();
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