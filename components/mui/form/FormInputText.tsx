import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

export const FormInputText = ({
	name,
	control,
	label,
	...rest
}: FormInputProps & TextFieldProps) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({
				field: { onChange, value },
				fieldState: { error },
				formState,
			}) => (
				<TextField
					helperText={error ? error.message : null}
					margin="normal"
					error={!!error}
					onChange={onChange}
					value={value}
					label={label}
					variant="outlined"
					{...rest}
				/>
			)}
		/>
	);
};
