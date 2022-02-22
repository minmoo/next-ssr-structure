import { Preview } from "@mui/icons-material";
import {
	Alert,
	AlertColor,
	Slide,
	SlideProps,
	Snackbar,
	SnackbarProps,
} from "@mui/material";
import { createContext, useEffect, useRef, useState } from "react";

export const SnackbarContext = createContext<
	({ message, severity, options }: SnackbarContent) => void
>(() => null);

const DEFAULT_OPTIONS: SnackbarProps = {
	open: false,
	autoHideDuration: 1000,
	anchorOrigin: { vertical: "top", horizontal: "center" },
};

interface SnackbarContent {
	message: string | React.ReactNode;
	severity?: AlertColor;
	options?: SnackbarProps;
}

const DEFAULT_CONTENT: SnackbarContent = {
	message: "",
	severity: "info",
};

function SlideTransition(props: SlideProps) {
	return <Slide {...props} direction="down" />;
}

interface SnackbarProviderProps {
	children: React.ReactNode;
	defaultOptions?: SnackbarProps;
}

const SnackbarProvider = ({
	children,
	defaultOptions,
}: SnackbarProviderProps) => {
	const [options, setOptions] = useState<SnackbarProps>({
		...DEFAULT_OPTIONS,
		...defaultOptions,
	});

	const content = useRef<SnackbarContent>(DEFAULT_CONTENT);

	const snackbar = ({ message, severity, options = {} }: SnackbarContent) => {
		content.current = { message, severity };
		setOptions((prev) => ({ ...prev, ...options, open: true }));
	};

	const handleClose = () => {
		setOptions((prev) => ({ ...prev, open: false }));
	};

	// handleClose에서 초기화 하면 set함수가 async이기 때문에
	// 메세지와 색상이 먼저 바뀌어서 사라질때 보인다.
	// useEffect로 state가 변경된 후 초기화 한다.
	useEffect(() => {
		if (!options.open) {
			content.current = DEFAULT_CONTENT;
		}
	}, [options]);

	return (
		<>
			<SnackbarContext.Provider value={snackbar}>
				{children}
			</SnackbarContext.Provider>
			<Snackbar
				{...options}
				onClose={handleClose}
				TransitionComponent={SlideTransition}
			>
				<Alert
					variant="filled"
					elevation={6}
					onClose={handleClose}
					severity={content.current.severity}
					sx={{ width: "100%" }}
				>
					{content.current.message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default SnackbarProvider;
