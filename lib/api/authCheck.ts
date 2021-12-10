import axios from ".";

//TODO API
export const authCheckAPI = () => axios.get<string>("api/authCheck");
