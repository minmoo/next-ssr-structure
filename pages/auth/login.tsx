import Auth from "../../layout/Auth";
import LoginForm from "../../components/auth/LoginForm";
import LoginAuth from "../../components/auth/LoginAuth";
import { GetServerSideProps, NextPage } from "next";
import { getSession, providers, csrfToken } from "next-auth/client";

export default function login(): React.ReactElement {
	return <LoginAuth />;
}

login.layout = Auth;
