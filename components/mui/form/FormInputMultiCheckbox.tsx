import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormLabel,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

const options = [
	{
		label: "Checkbox Option 1",
		value: "1",
	},
	{
		label: "Checkbox Option 2",
		value: "2",
	},
];

export const FormInputMultiCheckbox: React.FC<FormInputProps> = ({
	name,
	control,
	setValue,
	label,
}) => {
	const [selectedItems, setSelectedItems] = React.useState<any>([]);

	const handleSelect = (value: any) => {
		const isPresent = selectedItems.indexOf(value);
		if (isPresent !== -1) {
			const remaining = selectedItems.filter((item: any) => item !== value);
			setSelectedItems(remaining);
		} else {
			setSelectedItems((prevItems: any) => [...prevItems, value]);
		}
	};

	React.useEffect(() => {
		setValue(name, selectedItems);
	}, [selectedItems]);

	return (
		<FormControl size={"small"} variant={"outlined"}>
			<FormLabel component="legend">{label}</FormLabel>

			<div>
				{options.map((option: any) => {
					return (
						<FormControlLabel
							control={
								<Controller
									name={name}
									render={({}) => {
										return (
											<Checkbox
												checked={selectedItems.includes(option.value)}
												onChange={() => handleSelect(option.value)}
											/>
										);
									}}
									control={control}
								/>
							}
							label={option.label}
							key={option.value}
						/>
					);
				})}
			</div>
		</FormControl>
	);
};
