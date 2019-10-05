﻿using System;
using System.Collections.Generic;
using Catalog.Models;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Reflection;

namespace Catalog.DAO
{
    public class RolesMasterDAO
    {
        public List<RoleMasterEntity> GetRolesList()
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<RoleMasterEntity> retlst = new List<RoleMasterEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetRolesMasterList", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        RoleMasterEntity obj = new RoleMasterEntity();
                        obj.ROLE_ID = Convert.ToInt32(ds.Tables[0].Rows[i]["ROLE_ID"].ToString());
                        obj.ROLE_NAME = ds.Tables[0].Rows[i]["ROLE_NAME"].ToString();
                        obj.ACTIVE_STATUS = ds.Tables[0].Rows[i]["ACTIVE_STATUS"] == DBNull.Value ? true : Convert.ToBoolean(ds.Tables[0].Rows[i]["ACTIVE_STATUS"]);
                        obj.ALLOW_DELETE = ds.Tables[0].Rows[i]["ALLOW_DELETE"] == DBNull.Value ? false : Convert.ToBoolean(ds.Tables[0].Rows[i]["ALLOW_DELETE"]);
                        obj.ALLOW_EDIT = ds.Tables[0].Rows[i]["ALLOW_EDIT"] == DBNull.Value ? false : Convert.ToBoolean(ds.Tables[0].Rows[i]["ALLOW_EDIT"]);
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

        public List<RoleBaseMenuEntity> GetBaseMenuList()
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<RoleBaseMenuEntity> retlst = new List<RoleBaseMenuEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetBaseMenuList", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        RoleBaseMenuEntity obj = new RoleBaseMenuEntity();
                        obj.MENU_ID = ds.Tables[0].Rows[i]["MENU_ID"] == DBNull.Value ? 0 : Convert.ToInt32(ds.Tables[0].Rows[i]["MENU_ID"].ToString());
                        obj.MENU_NAME = ds.Tables[0].Rows[i]["MENU_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["MENU_NAME"].ToString();
                        obj.PARENT_MENU_NAME = ds.Tables[0].Rows[i]["PARENT_MENU_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["PARENT_MENU_NAME"].ToString();
                        obj.SORT_ORDER = ds.Tables[0].Rows[i]["SORT_ORDER"] == DBNull.Value ? 0 :  Convert.ToInt32(ds.Tables[0].Rows[i]["SORT_ORDER"].ToString());
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

        public List<RoleMasterEntity> EditRoles(int id)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<RoleMasterEntity> retlst = new List<RoleMasterEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetRolesDetailsbyID", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        RoleMasterEntity obj = new RoleMasterEntity();
                        obj.ROLE_ID = Convert.ToInt32(ds.Tables[0].Rows[i]["ROLE_ID"].ToString());
                        obj.ROLE_NAME = ds.Tables[0].Rows[i]["ROLE_NAME"].ToString();
                        obj.ACTIVE_STATUS = ds.Tables[0].Rows[i]["ACTIVE_STATUS"] == DBNull.Value ? true : Convert.ToBoolean(ds.Tables[0].Rows[i]["ACTIVE_STATUS"]);
                        obj.ALLOW_DELETE = ds.Tables[0].Rows[i]["ALLOW_DELETE"] == DBNull.Value ? false : Convert.ToBoolean(ds.Tables[0].Rows[i]["ALLOW_DELETE"]);
                        obj.ALLOW_EDIT = ds.Tables[0].Rows[i]["ALLOW_EDIT"] == DBNull.Value ? false : Convert.ToBoolean(ds.Tables[0].Rows[i]["ALLOW_EDIT"]);
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

        public List<RoleSelectedMenuEntity> EditRolesAuthority(int id)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<RoleSelectedMenuEntity> retlst = new List<RoleSelectedMenuEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetRolesMenuDetailsbyID", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        RoleSelectedMenuEntity obj = new RoleSelectedMenuEntity();
                        obj.ROLE_ID = ds.Tables[0].Rows[i]["ROLE_ID"] == DBNull.Value ? 0 : Convert.ToInt32(ds.Tables[0].Rows[i]["ROLE_ID"].ToString());
                        obj.MENU_ID = ds.Tables[0].Rows[i]["MENU_ID"] == DBNull.Value ? 0 : Convert.ToInt32(ds.Tables[0].Rows[i]["MENU_ID"].ToString());
                        obj.MENU_NAME = ds.Tables[0].Rows[i]["MENU_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["MENU_NAME"].ToString();
                       
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


        public DbStatusEntity UpdateRoles(RoleMasterEntity obj, int id)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_UpdateRolesMaster", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    cmd.Parameters.AddWithValue("@NAME", obj.ROLE_NAME);
                    cmd.Parameters.AddWithValue("@ACTIVE_STATUS", obj.ACTIVE_STATUS);
                    cmd.Parameters.AddWithValue("@ALLOW_DELETE", obj.ALLOW_DELETE);
                    cmd.Parameters.AddWithValue("@ALLOW_EDIT", obj.ALLOW_EDIT);

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

        public DbStatusEntity InsertRoles(RoleMasterEntity obj)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_InsertRolesMaster", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@NAME", obj.ROLE_NAME);
                    cmd.Parameters.AddWithValue("@ACTIVE_STATUS", obj.ACTIVE_STATUS);
                    cmd.Parameters.AddWithValue("@ALLOW_DELETE", obj.ALLOW_DELETE);
                    cmd.Parameters.AddWithValue("@ALLOW_EDIT", obj.ALLOW_EDIT);

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

        public DbStatusEntity DeleteRoles(int id)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_DeleteRolesMaster", con);
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


        public DbStatusEntity UpdateRolesMenu(List<RoleSelectedMenuEntity> obj, int id)
        {
            DbStatusEntity objreturn = new DbStatusEntity();
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_UpdateRolesMenu", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);

                    SqlParameter sqlParam = cmd.Parameters.AddWithValue("@TVP", CreateDataTable(obj));
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

        public static DataTable CreateDataTable<T>(IEnumerable<T> list)
        {
            Type type = typeof(T);
            var properties = type.GetProperties();

            DataTable dataTable = new DataTable();
            foreach (PropertyInfo info in properties)
            {
                dataTable.Columns.Add(new DataColumn(info.Name, Nullable.GetUnderlyingType(info.PropertyType) ?? info.PropertyType));
            }

            foreach (T entity in list)
            {
                object[] values = new object[properties.Length];
                for (int i = 0; i < properties.Length; i++)
                {
                    values[i] = properties[i].GetValue(entity);
                }

                dataTable.Rows.Add(values);
            }

            return dataTable;
        }
    }
}