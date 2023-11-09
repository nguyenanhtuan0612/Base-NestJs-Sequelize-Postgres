export interface ICassoNewPaymentData {
    id: number;
    tid: string;
    description: string;
    amount: number;
    cusum_balance: number;
    when: Date;
    bank_sub_acc_id: string;
    subAccId: string;
    virtualAccount: string;
    virtualAccountName: string;
    corresponsiveName: string;
    corresponsiveAccount: string;
    corresponsiveBankId: string;
    corresponsiveBankName: string;
}
export interface ICassoPaymentHookData {
    error: number;
    data: ICassoNewPaymentData[];
}
