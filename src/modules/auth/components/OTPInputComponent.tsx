import { Box, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { Column, Row } from "../../../core/theme/components/custom.components";

type Props = {
	onChange: (otp: string) => void;
};

const OTPInputComponent: React.FC<Props> = ({ onChange }) => {
	const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
	const refs = [
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
		useRef<HTMLInputElement | null>(null),
	];

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number,
	) => {
		const value = e.target.value;
		console.log(value);
		if (/^[0-9]$/.test(value)) {
			const newOtp = [...otp];
			newOtp[index] = value;
			setOtp(newOtp);
			onChange(newOtp.join(""));
			if (index < 5 && refs[index + 1].current) {
				refs[index + 1]?.current?.focus();
			}
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLDivElement>,
		index: number,
	) => {
		if (e.key === "Backspace" && index > 0) {
			refs[index - 1]?.current?.focus();
		}
	};

	return (
		<Column alignItems="center" justifyContent="space-between">
			<Typography variant="h2" textAlign={"center"}>
				Verify OTP
			</Typography>

			<Typography
				variant="h6"
				color={"text.secondary"}
				textAlign={"center"}
			>
				Please enter the code we just sent to your phone number
			</Typography>
			{/* </Box> */}
			<Row
				alignItems="center"
				justifyContent="space-between"
				alignContent={"flex-start"}
				marginTop={"32px"}
				marginBottom={"32px"}
			>
				{refs.map((ref, index) => (
					<TextField
						key={index}
						inputRef={ref}
						onChange={(e) => handleChange(e, index)}
						onKeyDown={(e) => handleKeyDown(e, index)}
						inputProps={{
							style: {
								textAlign: "center",
								fontSize: "30px",
								fontWeight: "bold",
							},
							maxLength: 1,
						}}
						sx={{
							width: "58px",
							"& .MuiInputBase-root": {
								height: "58px",
							},
							"& .MuiInputBase-input": {
								height: "100%",
								padding: "16px",
								boxSizing: "border-box",
							},
						}}
					/>
				))}
			</Row>
		</Column>
	);
};

export default OTPInputComponent;
