import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import Router from "next/router";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		box: {
			margin: theme.spacing(15, 0, 0),
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
	userId: string;
	password: string;
};

const defaultValues: TformData = {
	userId: "",
	password: "",
};

const schema = yup.object().shape({
	userId: yup.string().required("id를 입력해주세요."),
	password: yup.string().required("password를 입력해주세요."),
});

export default function LoginForm(): React.ReactElement {
	const classes = useStyles();
	const {data: session, status} = useSession();
	const loading = status === "loading"

	const { handleSubmit, control, formState: { errors} } = useForm<TformData>({
		defaultValues: defaultValues,
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<TformData> = async (data) => {
		const callbackUrl = `${window.location.origin}/admin/dashboard`;

		const res = await signIn("credentials", {
			...data,
			callbackUrl,
			redirect: false,
		});

		if (res?.error) {
			alert(res?.error);
		} else {
			Router.push(res?.url as string);
		}
		console.log(`result: ${res}`);
	};

	return (
		<>
			<Typography component="h1" variant="h5">
				Login
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
				<Controller
					name="userId"
					render={({field}) => 
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
					}
					control={control}
				/>

				<Controller
					name="password"
					render={({field}) => 
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
					}
					control={control}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
				>
					Log In
				</Button>
			</form>

			<Box className={classes.box}>
				<Typography variant="body2">Don't have an account?</Typography>
				<Link href="/auth/signUp">{"Create an account"}</Link>
			</Box>
		</>
	);
}
