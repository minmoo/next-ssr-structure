import Auth from "../../layout/Auth";
import LoginAuth from "../../components/auth/LoginAuth";
import { getProviders, getSession } from "next-auth/react";
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
	const { req } = context;
	const session = await getSession({ req });

	if (session) {
		return {
			redirect: { permanent: false, destination: "/admin/dashboard" },
			props: {},
		};
	}

	return {
		props: {
			providers: await getProviders(),
		},
	};
};
