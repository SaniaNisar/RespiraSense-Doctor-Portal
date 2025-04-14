export enum SlotType {
    morning = "Morning",
    evening = "Evening"
}

export interface AppointmentSlotDto {
    SlotID: number;
    SlotNo: string;
    StartTime: string;
    EndTime: string;
    SlotFromTo: string;
    BookedCnt: number;
    BookedStr: string;
    SlotType: SlotType;
    M_Fee: string;
    E_Fee: string;
    SlotStatus: string;
    isReserved: number;
    isOn_Leave: boolean;
    LeaveDescp: string;
}