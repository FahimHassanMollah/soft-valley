import axios from  "../../utlis/axios"
export const getAssignees = async () => {
   const response = await axios.get("admin/base/assignee");
    return response.data;
}