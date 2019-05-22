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
        public List<SearchItemEntity> GetSearchData(SearchItemQueryEntity obj)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<SearchItemEntity> retlst = new List<SearchItemEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetSearchList", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@SearchText", obj.SEARCHTEXT);
                    cmd.Parameters.AddWithValue("@SKU",obj.SKU);
                    cmd.Parameters.AddWithValue("@CODE", obj.CODE);
                    cmd.Parameters.AddWithValue("@JewelleryIDs", obj.JEWELLERYIDS);
                    cmd.Parameters.AddWithValue("@DesignIDs", obj.DESIGNIDS);
                    cmd.Parameters.AddWithValue("@CollectionsIDs", obj.COLLECTIONSIDS);
                    cmd.Parameters.AddWithValue("@MaterialIDs", obj.MATERIALIDS);
                    cmd.Parameters.AddWithValue("@OccasionIDs", obj.OCCASIONIDS);
                    cmd.Parameters.AddWithValue("@GramSlabIDs", obj.GRAMSLABIDS);
                    cmd.Parameters.AddWithValue("@KaratIDs", obj.KARATIDS);
                    cmd.Parameters.AddWithValue("@ShowInStock", obj.SHOWINSTOCK);   

                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);

                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        SearchItemEntity objres = new SearchItemEntity();
                        objres.ID = Convert.ToInt32(ds.Tables[0].Rows[i]["ID"].ToString());
                        objres.HEADING = ds.Tables[0].Rows[i]["HEADING"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["HEADING"].ToString();
                        objres.DESCRIPTION = ds.Tables[0].Rows[i]["DESCRIPTION"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["DESCRIPTION"].ToString();
                        objres.PHY_FILE_NAME = ds.Tables[0].Rows[i]["PHY_FILE_NAME"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["PHY_FILE_NAME"].ToString();
                        retlst.Add(objres);
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