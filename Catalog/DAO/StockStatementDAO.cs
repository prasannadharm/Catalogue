using Catalog.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;


namespace Catalog.DAO
{
    public class StockStatementDAO
    {
        public List<StockStatementResultEntity> GetStockStatementData(StockStatementParamEntity obj)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<StockStatementResultEntity> retlst = new List<StockStatementResultEntity>();
            try
            {
                using (SqlConnection con = new SqlConnection(CS))
                {
                    SqlCommand cmd = new SqlCommand("USP_GetStockStatement", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@DateFrom", obj.FROMDATE);
                    cmd.Parameters.AddWithValue("@DateTo", obj.TODATE);
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
                    cmd.Parameters.AddWithValue("@Type", obj.REPTYPE);
                    cmd.Parameters.AddWithValue("@ShowInStockOnly", obj.SHOW_INSTOCK_ITEMS_ONLY);
                    
                    con.Open();
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds);
                    for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                    {
                        StockStatementResultEntity obj1 = new StockStatementResultEntity();
                        obj1.ID = ds.Tables[0].Rows[i]["ID"] != DBNull.Value ? Convert.ToInt64(ds.Tables[0].Rows[i]["ID"]) : 0;
                        obj1.CATALOG_ID = ds.Tables[0].Rows[i]["CATALOG_ID"] != DBNull.Value ? Convert.ToInt64(ds.Tables[0].Rows[i]["CATALOG_ID"]) : 0;
                        obj1.SKU = ds.Tables[0].Rows[i]["SKU"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["SKU"].ToString();
                        obj1.CODE = ds.Tables[0].Rows[i]["CODE"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["CODE"].ToString();
                        obj1.CATALOG_TITLE = ds.Tables[0].Rows[i]["CATALOG_TITLE"] == DBNull.Value ? "" : ds.Tables[0].Rows[i]["CATALOG_TITLE"].ToString();
                        obj1.CURR_STK_QTY = ds.Tables[0].Rows[i]["CURR_STK_QTY"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["CURR_STK_QTY"]);
                        obj1.OPENING_QTY = ds.Tables[0].Rows[i]["OPENING_QTY"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["OPENING_QTY"]);
                        obj1.STK_QTY = ds.Tables[0].Rows[i]["STK_QTY"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["STK_QTY"]);
                        obj1.IN_QTY = ds.Tables[0].Rows[i]["IN_QTY"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["IN_QTY"]);
                        obj1.OUT_QTY = ds.Tables[0].Rows[i]["OUT_QTY"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["OUT_QTY"]);
                        obj1.CLS_QTY = ds.Tables[0].Rows[i]["CLS_QTY"] == DBNull.Value ? 0 : Convert.ToDouble(ds.Tables[0].Rows[i]["CLS_QTY"]);
                        obj1.PCS = ds.Tables[0].Rows[i]["PCS"] == DBNull.Value ? 1 : Convert.ToInt32(ds.Tables[0].Rows[i]["PCS"]);
                        obj1.WT = ds.Tables[0].Rows[i]["WT"] == DBNull.Value ? "" : Convert.ToString(ds.Tables[0].Rows[i]["WT"]);
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