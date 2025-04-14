export enum GraphType {
	Multi = "Multi",
	Line = "Line",
}

export enum DashboardItemType {
	HB = "HB",
	Platelets = "Platelets",
	BP = "Blood Pressure",
	WBC = "WBC",
	BMI = "BMI",
}

export interface DashboardItemDto {
	DashboardItemID: number;
	DashboardItem: string;
	GraphType: GraphType;
	MaxVal?: number;
	MinVal?: number;
	Unit: string;
}

export function getDashboardItemIcon(item: DashboardItemType) {
	// switch (item) {
	// 	case DashboardItemType.HB:
	// 		return require("../../../assets/images/hb.png");
	// 	case DashboardItemType.Platelets:
	// 		return require("../../../assets/images/platelets.png");
	// 	case DashboardItemType.BP:
	// 		return require("../../../assets/images/bp.png");
	// 	case DashboardItemType.WBC:
	// 		return require("../../../assets/images/wbc.png");
	// 	case DashboardItemType.BMI:
	// 		return require("../../../assets/images/bmi.png");
	// 	default:
	// 		return require("../../../assets/images/hb.png");
	// }
}

export function getDashboardItemBackgroundColor(
	item: DashboardItemType,
): string {
	switch (item) {
	case DashboardItemType.HB:
		return "rgba(0, 206, 110, 0.08)";
	case DashboardItemType.Platelets:
		return "rgba(236, 75, 0, 0.08)";
	case DashboardItemType.BP:
		return "rgba(0, 133, 127, 0.08)";
	case DashboardItemType.WBC:
		return "rgba(110, 195, 0, 0.08)";
	case DashboardItemType.BMI:
		return "rgba(237, 156, 0, 0.08)";
	default:
		return "rgba(0, 206, 110, 0.08)";
	}
}

export function getDashboardItemValueColor(
	item: DashboardItemType,
	isAbnormal?: boolean,
): string {
	return isAbnormal ? "red" : "green";
}

export function getBloodPressureFontSize(item: DashboardItemType): number {
	switch (item) {
	case DashboardItemType.BP:
		return 30;
	default:
		return 40;
	}
}
