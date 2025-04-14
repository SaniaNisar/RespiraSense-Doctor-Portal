import React, { FC } from "react";
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserDto } from "../../auth/dtos";
import styled from "@emotion/styled";
import {
	Column,
	MUICard,
} from "../../../core/theme/components/custom.components";

type Props = {
	patient: UserDto;
	onDelete: (patient: UserDto) => void;
	isRemoveable?: boolean;
	isDefault?: boolean;
};

const PatientCard: React.FC<Props> = ({
	patient,
	onDelete,
	isRemoveable,
	isDefault,
}) => {
	return (
		<MUICard
			sx={{
				backgroundColor: !isRemoveable ? "primary.light" : "white",
				flexDirection: "row",
				border: isDefault ? "1px solid" : "none",
				borderColor: "primary.main",
			}}
		>
			<CardContent
				sx={{
					width: "74%",
				}}
			>
				<Typography
					gutterBottom
					variant="h2"
					overflow="hidden"
					textOverflow="ellipsis"
					whiteSpace="nowrap"
					width="100%"
				> 
					{patient?.PatientName ?? " - "} 
				</Typography>
				<Typography variant="h6" color="text.secondary"> MR#: 
					{patient?.PatientMrno ?? " - "}
				</Typography>
				<Typography variant="h6" color="text.secondary"> Father Name: 
					{patient?.FatherName ?? " - "}
				</Typography>
				<Typography variant="h6" color="text.secondary"> Phone Number: 
					{patient?.Phone ?? " - "}
				</Typography>
				{/* <Typography variant="h6" color="text.secondary">
					{patient?.Relation == "" ? " - " : patient?.Relation}
				</Typography> */}
			</CardContent>
			<Column
				sx={{
					justifyContent: "flex-end",
					alignItems: "flex-end",
					display: isRemoveable && !isDefault ? "contents" : "none",
				}}
			>
				<Button
					size="large"
					endIcon={<DeleteIcon />}
					onClick={() => {
						onDelete(patient);
					}}
				/>
			</Column>
		</MUICard>
	);
};

export default PatientCard;
