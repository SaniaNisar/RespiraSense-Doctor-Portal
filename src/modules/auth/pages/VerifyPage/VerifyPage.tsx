import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { OTPInputComponent } from "../../components";
import { useEffect, useState } from "react";
import { useAuthenticateMutation, useVerifyMutation } from "../../api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notify } from "../../../../common/helper";
import {
	Column,
	CustomLoadingButton,
} from "../../../../core/theme/components/custom.components";

const VerifyPage = () => {
	const [searchParams] = useSearchParams();
	const mobile = searchParams.get("mobile") ?? "";
	const deviceId = searchParams.get("deviceId") ?? "";
	const operator = searchParams.get("operator") ?? "";
	const navigate = useNavigate();
	const pushToken = "s";
	const [otp, setOtp] = useState("");
	const dispatch = useDispatch();
	const [verify, { isLoading, isSuccess, isError, error }] =
		useVerifyMutation();

	const [
		authenticate,
		{
			isLoading: isResendLoading,
			isError: isResendError,
			error: resendError,
		},
	] = useAuthenticateMutation();

	const verifyHandler = () => {
		verify({ mobile, deviceId, otp, pushToken });
	};

	const resendHandler = () => {
		authenticate({ operator, mobile, deviceId });
	};

	useEffect(() => {
		if (isError) {
			notify((error as any).message);
		}
	}, [isError]);

	useEffect(() => {
		if (isResendError) {
			notify((resendError as any).message);
		}
	}, [isResendError]);

	useEffect(() => {
		if (isSuccess) {
			navigate(`/?mobile=${mobile}`);
		}
	}, [isSuccess]);

	return (
		<Column
			height={"130px"}
			margin={"10px"}
			alignItems={"center"}
			justifyContent={"space-between"}
		>
			<OTPInputComponent onChange={(o) => setOtp(o)} />
			<CustomLoadingButton
				onClick={verifyHandler}
				loading={isLoading}
				disabled={mobile === "" || deviceId === "" || otp === ""}
				loadingPosition="center"
			>
				<Typography color={"white"}>Verify</Typography>
			</CustomLoadingButton>
			<Column>
				<Typography
					sx={{
						color: "rgba(73, 73, 73, 1)",
						fontSize: "16px",
						fontWeight: "400",
						textAlign: "center",
						lineHeight: "24px",
						marginTop: "32px",
					}}
				>
					Didn&rsquo;t receive OTP
				</Typography>
				<LoadingButton
					onClick={resendHandler}
					loading={isResendLoading}
					loadingPosition="center"
					size="small"
					sx={{
						width: "100%",
						color: "primary.main",
						textTransform: "none",
						margin: 0,
						padding: 0,
						textAlign: "center",
						fontSize: "12px",
						marginTop: "8px",
					}}
				>
					Resend OTP
				</LoadingButton>
			</Column>
		</Column>
	);
};

export default VerifyPage;
