import { AppointmentSlotDto } from "./appointment-slot.dto";

export interface SlotsListDto {
    morningSlots: AppointmentSlotDto[];
    eveningSlots: AppointmentSlotDto[];
}