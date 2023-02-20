import axios from  "../../utlis/axios"
export const getStatuses = async () => {
   const response = await axios.get("admin/base/lead-status");
    return response.data;
}