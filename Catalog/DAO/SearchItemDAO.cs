using System;
using System.Collections.Generic;
using Catalog.Models;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace Catalog.DAO
{
    public class SearchItemDAO
    {
        public List<SearchIetmEntity> GetSearchData()
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<SearchIetmEntity> retlst = new List<SearchIetmEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetSearchList", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@SearchText", "");
                    cmd.Parameters.AddWithValue("@SKU", "");
                    cmd.Parameters.AddWithValue("@CODE", "");
                    cmd.Parameters.AddWithValue("@JewelleryIDs", "");
                    cmd.Parameters.AddWithValue("@DesignIDs", "");
                    cmd.Parameters.AddWithValue("@CollectionsIDs", "");
                    cmd.Parameters.AddWithValue("@MaterialIDs", "");
                    cmd.Parameters.AddWithValue("@OccasionIDs", "");
                    cmd.Parameters.AddWithValue("@GramSlabIDs", "");
                    cmd.Parameters.AddWithValue("@KaratIDs", "");
                    cmd.Parameters.AddWithValue("@ShowInStock", true);   

                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        SearchIetmEntity obj = new SearchIetmEntity();
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