import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../../assets/images/Logo 4.png";
import icons from "../../../assets/images/icons";
import {
	InputAdornment,
	TextField,
	Typography,
	useMediaQuery,
	Theme,
	Breadcrumbs,
	Link,
	Avatar,
	Card,
	Menu,
	MenuItem,
} from "@mui/material";
import menuItems from "./menu";
import { Search } from "@mui/icons-material";
import {
	Outlet,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";
import PatientListComponent from "../../components/PatientListComponent";
import { useDispatch } from "react-redux";
import { authSlice } from "../../../modules/auth/slice";
import PatientListContainer from "../../components/PatientListContainer";
import { Column } from "../../theme/components/custom.components";
import { getInitials } from "../../../common/helper";
import DropdownMenu from "./DropDown";
import Button from "@mui/material/Button"; // Import Button
const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const ProfileCard = styled(Card)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	display: "flex",
	height: "50px",
	width: "50px",
	borderRadius: "50%",
	justifyContent: "center",
	alignItems: "center",
}));

const CustomBox = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "flex-end",
	gap: "10px", // Add some spacing between elements
	flexGrow: 1,
	"&:hover": {
		cursor: "pointer",
	},
}));

const MainLayout = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const mobile = searchParams.get("mobile") ?? "";
	const user = useAppSelector((state) => state.authState.activeUser);
	const patients = useAppSelector((state) => state.authState.patients);
	const [anchorEl, setAnchorEl] = useState(null);
	const handlePatients = () => {
		navigate("/patients");
	};
	const dropDownMenuItem = [
		/*{
			label: "Manage Patients",
			onClick: () => {
				navigate("/patients");
			},
		},
		*/
		{ label: "Logout", onClick: () => logout() },
	];

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const isMdOrSmaller = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("md"),
	);
	const [sidebarOpen, setSidebarOpen] = useState(!isMdOrSmaller);

	useEffect(() => {
		if (!user) {
			navigate("/auth/login");
		}
	}, [user, navigate]);

	const handleMenuItemClick = (path: string) => {
		navigate(`/${path}`);
		if (isMdOrSmaller) {
			toggleSidebar();
		}
	};

	const renderTitle = () => {
		if (location.pathname === "/blogs") {
			return "Blogs";
		}
		if (location.pathname === "/doctors") {
			return "Doctors";
		}
		return "";
	};

	useEffect(() => {
		if (!patients || patients?.length === 0) {
			navigate(`/patients/new?mobile=${user?.Phone ?? mobile}`);
		}
	}, [patients]);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const logout = () => {
		dispatch(authSlice.actions.resetAuth());
		navigate("/auth/login");
	};

	const generateBreadcrumbs = () => {
		const pathnames = location.pathname.split("/").filter((x) => x);
		return (
			<Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
				<Link
					color="inherit"
					onClick={() => navigate("/")}
					sx={{ cursor: "pointer" }}
				>
					Home
				</Link>
				{pathnames.map((value, index) => {
					const to = `/${pathnames.slice(0, index + 1).join("/")}`;
					return (
						<Link
							key={to}
							color={
								index === pathnames.length - 1
									? "textPrimary"
									: "inherit"
							}
							onClick={() => navigate(to)}
							sx={{ cursor: "pointer" }}
						>
							{value.charAt(0).toUpperCase() + value.slice(1)}
						</Link>
					);
				})}
			</Breadcrumbs>
		);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<AppBar
				position="fixed"
				sx={{
					paddingTop: "10px",
					backgroundColor: "white",
					boxShadow: "none",
				}}
			>
				<Toolbar>
					<Box
						sx={{
							width: drawerWidth - 15,
							display: "flex",
							alignItems: "center",
						}}
					>
						{isMdOrSmaller && (
							<IconButton
								aria-label="open drawer"
								onClick={toggleSidebar}
								edge="start"
								sx={{
									mr: 2,
									display: { sm: "block", md: "none" },
									color: "black",
								}}
							>
								<MenuIcon />
							</IconButton>
						)}
						<a href="/">
							<img
								// width={148}
								// height={50}
								src={Logo}
								style={{  width: "50px", height: "60"  }} // Adjust width, keep aspect ratio
								alt="Logo"
							/>
						</a>
					</Box>
					<Box
						display={"flex"}
						flexBasis={{ xs: "100%", md: "50%", sm: "60%" }}
					>
						<TextField
							placeholder="Search"
							variant="standard"
							style={{ width: "100%" }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Search />
									</InputAdornment>
								),
								disableUnderline: true,
								sx: {
									height: "48px",
									border: "none",
									width: "100%",
									borderRadius: "6px",
									padding: "12px",
									backgroundColor: "rgb(250, 250, 250)",
								},
							}}
							sx={{
								"& .MuiInputBase-root": {
									border: "none",
								},
							}}
						/>
					</Box>
					<CustomBox>
						{/* Book Appointment Button */}
						<Button
							variant="contained"
							color="primary"
							onClick={handlePatients}
							sx={{
								backgroundColor: "#CF2128",
								color: "#FFE0E1",
								":hover": {
									backgroundColor: "#FFE0E1",
									color: "#CF2128",
								},
							}}
						>
							Add Patient
						</Button>
						<ProfileCard onClick={handleClick}>
							<Typography color={"white"} variant="h3">
								{getInitials(user?.PatientName)}
							</Typography>
						</ProfileCard>
						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleClose}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
						>
							{/* <MenuItem onClick={handleClose}>
								Manage Patients
							</MenuItem> */}
							<MenuItem onClick={handleClose}>Logout</MenuItem>
						</Menu>

						<DropdownMenu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleClose}
							menuItems={dropDownMenuItem}
						/>
					</CustomBox>
				</Toolbar>
			</AppBar>
			<Box
				sx={{
					display: "flex",
					flex: 1,
					flexDirection: "row",
					marginTop: "80px",
				}}
			>
				<Drawer
					PaperProps={{
						sx: {
							height: "100%",
							display: "flex",
							flexDirection: "column",
						},
					}}
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						"& .MuiDrawer-paper": {
							width: drawerWidth,
							boxSizing: "border-box",
							border: "none",
							height: "100%", // Full height of the column
						},
						...(isMdOrSmaller && {
							position: "fixed",
							top: 0,
							left: 0,
							zIndex: (theme) => theme.zIndex.drawer + 1,
						}),
					}}
					variant={isMdOrSmaller ? "temporary" : "permanent"}
					anchor="left"
					open={sidebarOpen}
					onClose={toggleSidebar}
				>
					{/* Logo inside the Sidebar */}
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							padding: "15px",
							marginLeft: "5px"
						}}
					>
						<img style={{ width: "190px", height: "80" }} src={Logo} alt="Logo" />
					</Box>

					<PatientListContainer
						patients={patients}
						initialSelection={user?.PatientMrno}
					/>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							flexGrow: 1,
							paddingLeft: "7px",
						}}
					>
						<List>
							{menuItems.map((menuItem) => (
								<ListItem
									sx={{
										height: "55px",
										marginBottom: "2px",
										borderRadius: "6px",
										padding: "0.5px",
									}}
									key={menuItem.title}
								>
									<ListItemButton
										onClick={() =>
											handleMenuItemClick(menuItem.route)
										}
										sx={{
											backgroundColor:
												"background.default",
											"&:hover": {
												backgroundColor: "primary.main",
												"& .MuiListItemText-primary": {
													color: "white",
												},
											},
											borderRadius: "6px",
											display: "flex",
											alignItems: "center",
											padding: "10px", // Adjust padding here
											minWidth: "200px", // Set a minimum width if needed
										}}
									>
										<img
											src={icons[menuItem.icon]}
											width={24}
											height={24}
											alt={menuItem.icon}
										/>
										<ListItemText
											sx={{
												marginLeft: "10px",
												fontSize: "16px",
												color: "black",
											}}
											primary={menuItem.title}
										/>
									</ListItemButton>
								</ListItem>
							))}
						</List>
						<Box
							// sx={{
							// 	display: "flex",
							// 	flexGrow: 1,
							// 	flexDirection: "column",
							// 	justifyContent: "flex-end", // Pushes the logout button to the bottom
							// 	marginBottom: { xs: "30px", md: "60px" }, // Responsive margin
							// }}
						>
							<List>
								<ListItem
									// sx={{
									// 	height: "55px",
									// 	marginBottom: "8px",
									// 	borderRadius: "6px",
									// 	backgroundColor:
									// 		"rgba(250, 250, 250, 1)",
									// }}
									// disablePadding
								>
									{/* <ListItemButton
										onClick={logout}
										sx={{
											backgroundColor:
												"background.default",
											"&:hover": {
												backgroundColor: "primary.main",
											},
											borderRadius: "6px",
											display: "flex",
											alignItems: "center",
											padding: "10px", // Adjust padding here
											minWidth: "200px", // Set a minimum width if needed
										}}
									>
										<img
											src={icons["logout"]}
											width={24}
											height={24}
											alt="logout"
										/>
										<ListItemText
											sx={{
												marginLeft: "10px",
												fontSize: "16px",
												justifyContent: "flex-start",
											}}
											primary={"Logout"}
										/>
									</ListItemButton> */}
								</ListItem>
							</List>
						</Box>
					</Box>
				</Drawer>
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						p: 3,
						width: { xs: "100%", sm: "calc(100% - 240px)" },
					}}
				>
					{generateBreadcrumbs()}
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							padding: 1,
							backgroundColor: "background.default",
						}}
					>
						<Outlet />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default MainLayout;
