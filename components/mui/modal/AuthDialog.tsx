import { Button, DialogTitle, DialogContent } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { getProviders, signIn } from "next-auth/react";
import { FormInputText } from "components/mui/form/FormInputText";
import { RedirectableProviderType } from "next-auth/providers";
import { useState, useEffect } from "react";
import { useSelector } from "@/store";
import { useCloseDialog } from "@/store/iphone/hooks";

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

const Login = () => {
	const [providers, setProvider] = useState<any>({});
	const onCloseDialog = useCloseDialog();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<TformData>({
		defaultValues: defaultValues,
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		(async () => {
			const providers = await getProviders();
			setProvider(providers);
		})();
	}, []);

	const onSubmit: SubmitHandler<TformData> = async (data) => {
		const res = await signIn<RedirectableProviderType>("credentials", {
			...data,
			redirect: false,
		});

		if (res?.error) {
			alert(res?.error);
		} else {
			onCloseDialog();
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormInputText name="userId" control={control} label="ID" fullWidth />
				<FormInputText
					name="password"
					control={control}
					label="Password"
					fullWidth
				/>
				<Button type="submit" fullWidth variant="contained" color="primary">
					Log In
				</Button>
			</form>
			<div>
				{Object.values(providers)
					.filter((provider: any) => provider.name !== "credentials")
					.map((provider: any) => {
						return (
							<div key={provider?.name}>
								<Button onClick={() => signIn(provider?.id)}>
									Sign in with {provider?.name}
								</Button>
							</div>
						);
					})}
			</div>
		</>
	);
};

const AuthDialog = ({ fullScreen }: { fullScreen: boolean }) => {
	const { title, options = {} } = useSelector((state) => state.iphone.modal);
	return (
		<>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<Login />
			</DialogContent>
		</>
	);
};

export default AuthDialog;
