export interface ReportItemDto {
    TestID: string;
    Date: string;
    InvoiceNo: string;
    ReportType: number;
    Department: string;
    DoctorName: string;
    Investigations: string[];
    ServiceID: string;
    ImgPath: string;
    IsSeen: boolean;
}