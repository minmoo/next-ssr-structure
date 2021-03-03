import axios from "../";
import { TuserInfo } from "../../../store/auth/types";

type TSignUpAPIBody = {
  name: string;
  userId: string;
  password: string;
};

export const signUpAPI = (body: TSignUpAPIBody) =>
  axios.post<TuserInfo>("/api/auth/signUp", body);
