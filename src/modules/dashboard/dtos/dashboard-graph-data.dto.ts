import moment from "moment";

export enum BloodPressureReadings {
	Systolic = "Sys",
	Diastolic = "Dia"
}

export interface DashboardGraphDataDto {
	Title: string;
	theDate: string;
	Value: string;
	isManual: boolean;
	isAbnormal: boolean;
}

export class DashboardGraphData implements DashboardGraphDataDto {
	Title: string;
	theDate: string;
	Value: string;
	isManual: boolean;
	isAbnormal: boolean;

	get formattedDate() {
		return moment(this.theDate).format("DD/MMM/YY");
	}

	constructor(Title: string, theDate: string, Value: string, isManual: boolean, isAbnormal: boolean) {
		this.Title = Title;
		this.theDate = theDate;
		this.Value = Value;
		this.isManual = isManual;
		this.isAbnormal = isAbnormal;
	}

	static fromDto(dto: DashboardGraphDataDto, second?: DashboardGraphDataDto): DashboardGraphData {
		return new DashboardGraphData(
			dto.Title,
			dto.theDate,
			second ? (dto.Title === "Sys" ? `${dto.Value}/${second?.Value}` : `${second.Value}/${dto.Value}`) : dto.Value,
			dto.isManual,
			dto.isAbnormal
		);
	}

}