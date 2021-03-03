import axios from "../";
import { TuserInfo } from "../../../store/auth/types";

export const checkAPI = () => axios.get<TuserInfo>("/api/auth/check");
