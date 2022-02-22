import { createContext, useCallback, useState } from "react";
import * as React from "react";
import { DialogProps } from "@mui/material/Dialog";
import { DialogTitleProps } from "@mui/material/DialogTitle";
import { DialogContentProps } from "@mui/material/DialogContent";
import { ButtonProps } from "@mui/material/Button";
import ConfirmDialog from "@/components/mui/modal/ConfirmDialog";

export const ConfirmContext = createContext<
	(options?: ConfirmOptions) => Promise<unknown>
>(async () => null);

export interface ConfirmOptions {
	title?: React.ReactNode;
	titleProps?: DialogTitleProps;
	description?: React.ReactNode;
	content?: React.ReactNode | null;
	contentProps?: DialogContentProps;
	confirmationText?: React.ReactNode;
	cancellationText?: React.ReactNode;
	dialogProps?: Omit<DialogProps, "open">;
	confirmationButtonProps?: ButtonProps;
	cancellationButtonProps?: ButtonProps;
	allowClose?: boolean;
}

const DEFAULT_OPTIONS: ConfirmOptions = {
	title: "Are you sure?",
	description: "",
	content: null,
	confirmationText: "Ok",
	cancellationText: "Cancel",
	dialogProps: {},
	confirmationButtonProps: {},
	cancellationButtonProps: {},
	titleProps: {},
	contentProps: {},
	allowClose: true,
};

const buildOptions = (
	defaultOptions: ConfirmOptions,
	options: ConfirmOptions,
) => {
	const dialogProps = {
		...(defaultOptions.dialogProps || DEFAULT_OPTIONS.dialogProps),
		...(options.dialogProps || {}),
	};
	const confirmationButtonProps = {
		...(defaultOptions.confirmationButtonProps ||
			DEFAULT_OPTIONS.confirmationButtonProps),
		...(options.confirmationButtonProps || {}),
	};
	const cancellationButtonProps = {
		...(defaultOptions.cancellationButtonProps ||
			DEFAULT_OPTIONS.cancellationButtonProps),
		...(options.cancellationButtonProps || {}),
	};
	const titleProps = {
		...(defaultOptions.titleProps || DEFAULT_OPTIONS.titleProps),
		...(options.titleProps || {}),
	};
	const contentProps = {
		...(defaultOptions.contentProps || DEFAULT_OPTIONS.contentProps),
		...(options.contentProps || {}),
	};

	return {
		...DEFAULT_OPTIONS,
		...defaultOptions,
		...options,
		dialogProps,
		confirmationButtonProps,
		cancellationButtonProps,
		titleProps,
		contentProps,
	};
};

interface ConfirmProviderProps {
	children: React.ReactNode;
	defaultOptions?: ConfirmOptions;
}

const ConfirmProvider = ({
	children,
	defaultOptions = {},
}: ConfirmProviderProps) => {
	const [options, setOptions] = useState<typeof DEFAULT_OPTIONS>({
		...DEFAULT_OPTIONS,
		...defaultOptions,
	});

	const [resolveReject, setResolveReject] = useState<
		[(value: any) => void, (reason?: any) => void] | []
	>([]);

	const [resolve, reject] = resolveReject;

	const confirm = useCallback((options: ConfirmOptions = {}) => {
		return new Promise((resolve, reject) => {
			setOptions(buildOptions(defaultOptions, options));
			setResolveReject([resolve, reject]);
		});
	}, []);

	const handleClose = useCallback(() => {
		setResolveReject([]);
	}, []);

	const handleCancel = useCallback(() => {
		if (reject) {
			reject();
			handleClose();
		}
	}, [reject, handleClose]);

	const handleConfirm = useCallback(() => {
		if (resolve) {
			resolve(true);
			handleClose();
		}
	}, [resolve, handleClose]);

	return (
		<>
			<ConfirmContext.Provider value={confirm}>
				{children}
			</ConfirmContext.Provider>
			<ConfirmDialog
				open={resolveReject.length === 2}
				options={options}
				onClose={handleClose}
				onCancel={handleCancel}
				onConfirm={handleConfirm}
			/>
		</>
	);
};

export default ConfirmProvider;
