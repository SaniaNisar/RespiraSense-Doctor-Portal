import AuthRoutes from "../modules/auth/routes";
import DashboardRoutes from "../modules/dashboard/routes";
import PatientRoutes from "../modules/patients/routes";
import DoctorRoutes from "../modules/appointments/routes";
import ReportRoutes from "../modules/reports/routes";
import AppointmentRoutes from "../modules/appointments/routes";
import ChatbotRoutes from "../modules/chatbot/routes";
import ModelRoutes from "../modules/model/routes";


const routes = [
	AuthRoutes,
	DashboardRoutes,
	PatientRoutes,
	DoctorRoutes,
	ReportRoutes,
	AppointmentRoutes,
	ChatbotRoutes,
	ModelRoutes
];

export default routes;
