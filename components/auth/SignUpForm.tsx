import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useSignUp } from "../../store/auth";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		box: {
			margin: theme.spacing(3, 0, 0),
			textAlign: "center",
		},
		form: {
			marginTop: theme.spacing(1),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
		},
	}),
);

type TformData = {
	name: string;
	userId: string;
	password: string;
	passwordConfirm: string;
};

const defaultValues = {
	name: "",
	userId: "",
	password: "",
	passwordConfirm: "",
};

const schema = yup.object().shape({
	name: yup.string().required("this is required"),
	userId: yup.string().required("this is required"),
	password: yup.string().required("this is required"),
	passwordConfirm: yup
		.string()
		.required("this is required")
		.oneOf([yup.ref("password"), null], "password가 일치하지 않습니다."),
});

export default function SignUpForm(): React.ReactElement {
	const classes = useStyles();

	const onSignUp = useSignUp();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<TformData>({
		defaultValues: defaultValues,
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<TformData> = (data) => {
		console.log(data);
		onSignUp(data);
	};

	return (
		<>
			<Typography component="h1" variant="h5">
				Sign Up
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
				<Controller
					name="name"
					render={({ field }) => (
						<TextField
							error={Boolean(errors?.name)}
							variant="outlined"
							margin="normal"
							fullWidth
							id="name"
							label="Name"
							helperText={errors.name?.message}
							autoFocus
							{...field}
						/>
					)}
					control={control}
				/>
				<Controller
					name="userId"
					render={({ field }) => (
						<TextField
							error={Boolean(errors?.userId)}
							variant="outlined"
							margin="normal"
							fullWidth
							id="userId"
							label="ID"
							helperText={errors.userId?.message}
							{...field}
						/>
					)}
					control={control}
				/>
				<Controller
					name="password"
					render={({ field }) => (
						<TextField
							error={Boolean(errors?.password)}
							variant="outlined"
							margin="normal"
							fullWidth
							id="password"
							label="Password"
							helperText={errors.password?.message}
							{...field}
						/>
					)}
					control={control}
				/>
				<Controller
					name="passwordConfirm"
					render={({ field }) => (
						<TextField
							error={Boolean(errors?.passwordConfirm)}
							variant="outlined"
							margin="normal"
							fullWidth
							id="passwordConfirm"
							label="Password (Confirm)"
							helperText={errors.passwordConfirm?.message}
							{...field}
						/>
					)}
					control={control}
				/>

				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
				>
					CREATE AN ACCOUNT
				</Button>
			</form>

			<Box className={classes.box}>
				<Typography variant="body2">Already have an account?</Typography>
				<Link href="/auth/login">{"Sign in"}</Link>
			</Box>
		</>
	);
}
