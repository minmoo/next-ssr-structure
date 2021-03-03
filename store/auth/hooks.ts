import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { TsignUp, Tlogin } from "./types";
import { actions } from "./";
import { useSelector } from "../";
import { useRouter } from "next/router";

const useSignCheck = () => {
  const router = useRouter();
  const isLogged = useSelector((state) => state.auth.isLogged);
  useEffect(() => {
    if (isLogged) {
      router.push("/");
    }
  }, [router, isLogged]);
};

export const useSignUp = () => {
  useSignCheck();
  const dispatch = useDispatch();
  const onSignUp = useCallback(
    (req: TsignUp) => dispatch(actions.asyncSignUp(req)),
    [dispatch]
  );

  return onSignUp;
};

export const useLogin = () => {
  useSignCheck();
  const dispatch = useDispatch();
  const onLogin = useCallback(
    (req: Tlogin) => dispatch(actions.asyncLogin(req)),
    [dispatch]
  );

  return onLogin;
};
