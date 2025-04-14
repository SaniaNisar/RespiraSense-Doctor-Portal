import { DashboardItemInputDto } from "./dashboard-item-input.dto";

export interface GraphItemInputDto extends DashboardItemInputDto {
    dashboardItemId: number;
}