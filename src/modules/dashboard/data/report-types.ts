import { ReportTypesEnum } from "../../reports/dtos";

export default [
	{ tabId: 0, icon: "reports", title: "Lab", type: ReportTypesEnum.Lab },
	{ tabId: 1, icon: "admissions", title: "Admission", type: ReportTypesEnum.Admission },
	// { tabId: 2, icon: "cardiology", title: "Cardiology", type: ReportTypesEnum.Cardiology },
	// { tabId: 3, icon: "gastro", title: "Gastro", type: ReportTypesEnum.Gastro },
	{ tabId: 4, icon: "prescription", title: "Prescription", type: ReportTypesEnum.Prescription },
	{ tabId: 5, icon: "radiology", title: "Radiology", type: ReportTypesEnum.Radiology }
];
