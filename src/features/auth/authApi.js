import axios from  "../../utlis/axios"
export const login = async (data) => {
   const response = await axios.post("admin/login", data);
    return response.data;
}