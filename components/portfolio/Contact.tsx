import { Box, Grid, Typography, Button } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import { FormInputText } from "components/mui/form/FormInputText";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { GAP } from "@lib/constants/base";
type TformData = {
	name: string;
	phoneNumber: string;
	email: string;
	message: string;
};

const defaultValues: TformData = {
	name: "",
	phoneNumber: "",
	email: "",
	message: "",
};

const schema = yup.object().shape({
	name: yup.string().required("이름을 입력해주세요."),
	phoneNumber: yup
		.string()
		.matches(
			/^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/,
			"핸드폰 번호 형식을 맞춰주세요.",
		)
		.required("핸드폰 번호를 입력해주세요."),
	email: yup
		.string()
		.email("email형식을 맞춰주세요.")
		.required("email을 입력해주세요."),
	message: yup.string().required("메세지를 입력해주세요."),
});

const Contact = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<TformData>({
		defaultValues: defaultValues,
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<TformData> = async (data) => {
		console.log(data);
	};

	return (
		<Grid
			container
			direction="row"
			justifyContent="center"
			alignItems="center"
			sx={{ mb: `${GAP}px` }}
		>
			<Box
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				sx={{ borderRadius: "20px", bgcolor: lightBlue[200] }}
			>
				<Grid
					container
					direction="column"
					justifyContent="center"
					alignItems="stretch"
					p="10px"
				>
					<Grid item>
						<Box p="10px">
							<Typography variant="h5" component="div">
								Contact
							</Typography>
						</Box>
					</Grid>

					<Grid item>
						<FormInputText
							name="name"
							control={control}
							label="Name*"
							margin="dense"
							size="small"
							sx={{ mr: "10px" }}
						/>
						<FormInputText
							name="phoneNumber"
							control={control}
							label="Phone number*"
							margin="dense"
							size="small"
						/>
					</Grid>

					<Grid item>
						<FormInputText
							name="email"
							control={control}
							label="Email*"
							margin="dense"
							size="small"
							placeholder="example@example.com"
							fullWidth
						/>
					</Grid>

					<Grid item>
						<FormInputText
							name="message"
							control={control}
							label="Message*"
							rows={2}
							margin="dense"
							size="small"
							fullWidth
							multiline
						/>
					</Grid>
					<Grid item>
						<Button type="submit" variant="contained" color="primary" fullWidth>
							Send
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Grid>
	);
};

export default Contact;
