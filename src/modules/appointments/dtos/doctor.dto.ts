export interface DoctorDto {
	Sr: number;
	Type: string;
	DeptCode: string;
	ID: number;
	FullName: string;
	Specilality?: string;
	Edu: string;
	Exp: string;
	Seq: number;
	ExpDate: string;
	PicPath: string;
	Searching_In: string | null;
	Expr: string;
	AvailbaleDays: string;
}
