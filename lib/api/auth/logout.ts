import axios from "../";

export const logoutAPI = () => axios.delete("/api/auth/logout");
