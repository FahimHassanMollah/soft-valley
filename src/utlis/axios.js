import axios from "axios";


const axiosInstance = axios.create({
    baseURL: "http://crm.softvalley.sveducrm.com/api/",
});


export default axiosInstance;