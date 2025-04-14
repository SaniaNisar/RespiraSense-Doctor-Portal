import React from "react";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { Column, Row } from "../../theme/components/custom.components";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Divider from "@mui/material/Divider";

type Props = {
	anchorEl: any;
	open: boolean;
	onClose: () => void;
	anchorOrigin?: any;
	transformOrigin?: any;
	menuItems: MenuItemProps[];
};
type MenuItemProps = {
	label: string;
	onClick: () => void;
};
const DropdownMenu: React.FC<Props> = ({
	anchorEl,
	open,
	onClose,
	anchorOrigin = { vertical: "bottom", horizontal: "right" },
	transformOrigin = { vertical: "top", horizontal: "right" },
	menuItems = [],
}) => {
	return (
		<Menu
			anchorEl={anchorEl}
			open={open}
			onClose={onClose}
			anchorOrigin={anchorOrigin}
			transformOrigin={transformOrigin}
		>
			{menuItems.map((item, index) => (
				<MenuItem
					sx={{ cursor: "pointer", height: 60 }}
					key={index}
					onClick={() => {
						item.onClick();
						onClose();
					}}
				>
					<Row justifyContent={"flex-start"} alignItems={"center"}>
						{index === 0 ? (
							<PersonAddAltOutlinedIcon color="primary" />
						) : (
							<LogoutTwoToneIcon color="primary" />
						)}
						<Typography marginLeft={"10px"} variant="h6">
							{item.label}
						</Typography>
					</Row>
					<Divider />
				</MenuItem>
			))}
		</Menu>
	);
};

export default DropdownMenu;
