import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ConfirmOptions } from "@/lib/context/ConfirmContext";
interface ConfirmDialogProps {
	open: boolean;
	options: ConfirmOptions;
	onCancel: () => void;
	onConfirm: () => void;
	onClose: () => void;
}

const ConfirmDialog = ({
	open,
	options,
	onCancel,
	onConfirm,
	onClose,
}: ConfirmDialogProps) => {
	const {
		title,
		description,
		content,
		confirmationText,
		cancellationText,
		dialogProps,
		confirmationButtonProps,
		cancellationButtonProps,
		titleProps,
		contentProps,
		allowClose,
	} = options;

	return (
		<Dialog
			fullWidth
			{...dialogProps}
			open={open}
			onClose={allowClose ? onClose : undefined}
		>
			{title && <DialogTitle {...titleProps}>{title}</DialogTitle>}
			{content ? (
				<DialogContent {...contentProps}>{content}</DialogContent>
			) : (
				description && (
					<DialogContent {...contentProps}>
						<DialogContentText>{description}</DialogContentText>
					</DialogContent>
				)
			)}
			<DialogActions>
				<Button {...cancellationButtonProps} onClick={onCancel}>
					{cancellationText}
				</Button>
				<Button
					color="primary"
					{...confirmationButtonProps}
					onClick={onConfirm}
				>
					{confirmationText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
