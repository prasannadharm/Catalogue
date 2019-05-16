using System;
using System.Collections.Generic;
using Catalog.Models;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace Catalog.DAO
{
    public class HomeDAO
    {
        public List<TrendingEntity> GetTrendingList()
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<TrendingEntity> retlst = new List<TrendingEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetTrendingList", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        TrendingEntity obj = new TrendingEntity();
                        obj.ID = Convert.ToInt32(ds.Tables[0].Rows[i]["ID"].ToString());
                        obj.HEADING = ds.Tables[0].Rows[i]["HEADING"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["HEADING"].ToString();
                        obj.DESCRIPTION = ds.Tables[0].Rows[i]["DESCRIPTION"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["DESCRIPTION"].ToString();
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

    }
}