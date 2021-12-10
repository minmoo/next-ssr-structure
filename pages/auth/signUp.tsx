import Auth from "../../layout/Auth";
import SignUpForm from "../../components/auth/SignUpForm";

export default function signUp(): React.ReactElement {
	return <SignUpForm />;
}

signUp.layout = Auth;
