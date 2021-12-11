import Auth from "../../layout/Auth";
import LoginForm from "../../components/auth/LoginForm";
import LoginAuth from "../../components/auth/LoginAuth";

export default function login(): React.ReactElement {
	return <LoginAuth />;
}

login.layout = Auth;
