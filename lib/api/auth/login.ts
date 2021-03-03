import axios from "../";
import { TuserInfo } from "../../../store/auth/types";

export const loginAPI = (body: { userId: string; password: string }) =>
  axios.post<TuserInfo>("/api/auth/login", body);
