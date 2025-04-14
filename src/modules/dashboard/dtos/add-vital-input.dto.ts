import { GraphItemInputDto } from "./graph-item-input.dto";

export interface AddVitalInputDto extends GraphItemInputDto {
    date: string;
    values: string[];
}