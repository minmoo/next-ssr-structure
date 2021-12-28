import Auth from "../../layout/Auth";
import LoginAuth from "../../components/auth/LoginAuth";
import { getProviders } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function Login({
	providers,
}: {
	providers: ReturnType<typeof getProviders>;
}): React.ReactElement {
	return <LoginAuth providers={providers} />;
}

Login.layout = Auth;

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {
			providers: await getProviders(),
		},
	};
};
