export type BillModel = {
    id: number;
    supplier: string;
    description: string;
    status: string;
    nextdate: string;
    nextinstallmentvalue: number;
}

export type BillSummary = {
    totalvalue: number;
    totalnotpaid: number;
    totalpayed: number;
    payedpercent: number;
}
