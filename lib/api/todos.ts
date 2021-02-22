import axios from ".";

//TODO API
export const getTodosAPI = () => axios.get<string>("api/todos");
