import { DoctorDto } from "./doctor.dto";
import { DepartmentDto } from "./department.dto";
import { AppointmentDateDto } from "./appointment-date.dto";
import { AppointmentSlotDto, SlotType } from "./appointment-slot.dto";
import { SlotInputDto } from "./slot-input.dto";
import { Appointment } from "./appointment.dto";
import { CancelAppointmentDto } from "./cancel-appointment.dto";

export type {
	DoctorDto,
	DepartmentDto,
	AppointmentDateDto,
	AppointmentSlotDto,
	SlotInputDto,
	Appointment,
	CancelAppointmentDto
};
export {
	SlotType
};