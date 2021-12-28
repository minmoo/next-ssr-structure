import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSelector } from "../";
import { useLogout } from "../auth";
import { actions } from "./";
import { useSession, signOut } from "next-auth/react";

const useNavbarFixToggle = () => {
	const dispatch = useDispatch();
	const onNavbarFixToggle = useCallback(
		() => dispatch(actions.navbarFixToggle()),
		[dispatch],
	);
	return () => {
		onNavbarFixToggle();
	};
};

const useNavbarOpenToggle = () => {
	const dispatch = useDispatch();
	const onNavbarOpenToggle = useCallback(
		() => dispatch(actions.navbarOpenToggle()),
		[dispatch],
	);
	return () => {
		onNavbarOpenToggle();
	};
};

export const useNavbar = () => {
	const navbar = useSelector((state) => state.admin.navbar);
	const handleClose = useNavbarOpenToggle();
	const handleNavbarFix = useNavbarFixToggle();

	return { navbar, handleClose, handleNavbarFix };
};

export const useToolbar = () => {
	const handleNavbarToggle = useNavbarOpenToggle();
	const router = useRouter();
	const { data: session } = useSession();

	const admin = useSelector(({ admin }) => admin);

	const handleSignOut = () => {
		signOut();
	};

	const handleSignIn = () => {
		router.push("/auth/login");
	};

	return { admin, session, handleNavbarToggle, handleSignOut, handleSignIn };
};
