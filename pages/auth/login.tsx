import Auth from "../../layout/Auth";
import LoginForm from "../../components/auth/LoginForm";

export default function login(): React.ReactElement {
	return <LoginForm />;
}

login.layout = Auth;
