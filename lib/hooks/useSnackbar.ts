import { useContext } from "react";
import { SnackbarContext } from "@/lib/context/SnackbarContext";

const useSnackbar = () => {
	const snackbar = useContext(SnackbarContext);
	return snackbar;
};

export default useSnackbar;
