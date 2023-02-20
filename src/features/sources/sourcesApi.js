import axios from  "../../utlis/axios"
export const getSources = async () => {
   const response = await axios.get("admin/base/source");
    return response.data;
}