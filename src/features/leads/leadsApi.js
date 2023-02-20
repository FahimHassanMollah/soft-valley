import axios from  "../../utlis/axios"
export const getLeads = async (data) => {
   const response = await axios.post("admin/lead/list", data);
    return response.data;
}