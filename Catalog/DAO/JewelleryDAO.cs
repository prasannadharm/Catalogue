using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Catalog.Models;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace Catalog.DAO
{
    public class JewelleryDAO
    {

        public List<JewelleryEntity> GetJewelleyList()
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<JewelleryEntity> retlst = new List<JewelleryEntity>();
            using (SqlConnection con = new SqlConnection(CS))
            {              
                SqlCommand cmd = new SqlCommand("USP_GetJewelleryMasterList", con);
                cmd.CommandType = CommandType.StoredProcedure;               
                con.Open();
                adapter = new SqlDataAdapter(cmd);
                adapter.Fill(ds);

                for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                {
                    JewelleryEntity obj = new JewelleryEntity();
                    obj.ID = Convert.ToInt32(ds.Tables[0].Rows[i]["ID"].ToString());
                    obj.NAME = ds.Tables[0].Rows[i]["NAME"].ToString();
                    obj.ACTIVE_STATUS = Convert.ToBoolean(ds.Tables[0].Rows[i]["ACTIVE_STATUS"]);
                    retlst.Add(obj);
                }
            }
            return retlst;
        }


        public List<JewelleryEntity> EditJewelley(int id)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<JewelleryEntity> retlst = new List<JewelleryEntity>();
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("USP_GetJewelleryMasterDetailsbyID", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);
                con.Open();
                adapter = new SqlDataAdapter(cmd);
                adapter.Fill(ds);

                for (int i = 0; i <= ds.Tables[0].Rows.Count - 1; i++)
                {
                    JewelleryEntity obj = new JewelleryEntity();
                    obj.ID = Convert.ToInt32(ds.Tables[0].Rows[i]["ID"].ToString());
                    obj.NAME = ds.Tables[0].Rows[i]["NAME"].ToString();
                    obj.ACTIVE_STATUS = Convert.ToBoolean(ds.Tables[0].Rows[i]["ACTIVE_STATUS"]);
                    retlst.Add(obj);
                }
            }
            return retlst;
        }


        public void UpdateJewelley(JewelleryEntity obj, int id)
        {
            string CS = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            SqlDataAdapter adapter;
            DataSet ds = new DataSet();
            List<JewelleryEntity> retlst = new List<JewelleryEntity>();
            using (SqlConnection con = new SqlConnection(CS))
            {
                SqlCommand cmd = new SqlCommand("USP_UpdateJewelleryMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);
                cmd.Parameters.AddWithValue("@NAME", obj.NAME);
                cmd.Parameters.AddWithValue("@ACTIVE_STATUS", obj.ACTIVE_STATUS);
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }            
        }
    }
}
