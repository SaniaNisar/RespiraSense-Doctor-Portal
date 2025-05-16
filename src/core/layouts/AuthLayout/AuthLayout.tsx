import { Box, Grid, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import iPhoneImage from "../../../assets/images/img1.png";
// import GooglePlayButton from "../../../assets/images/pngwing.com (1).png";
// import AppStoreButton from "../../../assets/images/pngwing.com (2).png";
import HospitalLogo from "../../../assets/images/Logo 4.png";

const AuthLayout = () => {
	// const downloadButtons = (
	// 	<Box
	// 		display="flex"
	// 		justifyContent="center"
	// 		alignItems="center"
	// 		flexDirection="row"
	// 		gap="15px"
	// 		sx={{
	// 			width: "100%",
	// 			paddingBottom: { xs: "10px", sm: "20px", md: "50px" },
	// 		}}
	// 	>
	// 		<a
	// 			href="https://play.google.com/store/apps/details?id=com.sihspatient"
	// 			target="_blank"
	// 			rel="noopener noreferrer"
	// 		>
	// 			<Box
	// 				component="img"
	// 				//src={GooglePlayButton}
	// 				//alt="Get it on Google Play"
	// 				sx={{
	// 					width: "150px",
	// 					height: "auto",
	// 					cursor: "pointer",
	// 					zIndex: 1,
	// 					opacity: 1,
	// 				}}
	// 			/>
	// 		</a>

	// 		<a
	// 			href="#"
	// 			target="_blank"
	// 			rel="noopener noreferrer"
	// 		>
	// 			<Box
	// 				component="img"
	// 				//src={AppStoreButton}
	// 				//alt="Download on the App Store"
	// 				sx={{
	// 					width: "150px",
	// 					height: "auto",
	// 					cursor: "pointer",
	// 					zIndex: 1,
	// 					opacity: 1,
	// 				}}
	// 			/>
	// 		</a>
	// 	</Box>
	// );

	return (
		<Box sx={{ height: "100vh", overflow: "hidden" }}>
			<Grid container sx={{ height: "100%" }}>
				<Grid item xs={12} sm={12} md={6}>
					<Box
						sx={{
							padding: "20px",
							height: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							position: "relative",
						}}
					>
						<Box
							component="img"
							src={HospitalLogo}
							alt="Hospital Logo"
							sx={{
								position: "absolute",
								top: "20px",
								left: "20px",
								width: "150px",
							}}
						/>
						<Box
							sx={{
								width: {
									xs: "100%",
									sm: "100%",
									md: "90%",
									lg: "70%",
									xl: "50%",
								},
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginTop: { xs: "50px", sm: "50px", md: "0px" },
								marginBottom: "120px",
							}}
						>
							<Outlet />
						</Box>
						<Box
							display={{ xs: "flex", sm: "flex", md: "none" }}
							justifyContent="center"
							alignItems="center"
							flexDirection="row"
							position="absolute"
							bottom={{ xs: "20px", sm: "20px" }}
							width="100%"
							gap={{ xs: "5px", sm: "5px" }}
						>
							{/* {downloadButtons} */}
						</Box>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<Box
						sx={{
							height: "100%",
							backgroundColor: "primary.main",
							display: { xs: "none", sm: "none", md: "flex" },
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							paddingLeft: "40px",
							paddingRight: "40px",
							zIndex: { xs: -1, sm: -1, md: 1 },
							opacity: { xs: 0.4, sm: 0.4, md: 1 },
							backdropFilter: { xs: "blur(10px)", sm: "blur(10px)", md: "none" },
						}}
					>
						<Typography
							sx={{
								color: "background.default",
								textAlign: "center",
								fontWeight: "bold",
								marginBottom: "30px",
								marginTop: { xs: "50px", sm: "50px", md: "30px" },
								paddingTop: "20px",
							}}
							variant="h4"
						>
							Keep track of you and your Patients at one place{" "}
						</Typography>
						<Box
							component="img"
							src={iPhoneImage}
							sx={{
								width: {
									xs: "80%",
									sm: "60%",
									md: "34%",
									lg: "115%",
									xl: "115%",
								},
								height: "auto",
							}}
						/>
						{/* {downloadButtons} */}
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default AuthLayout;
