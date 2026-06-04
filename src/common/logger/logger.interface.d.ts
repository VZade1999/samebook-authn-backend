export interface LogMeta {
    requestId?: string;
    userId?: string | number;
    email?: string;
    ip?: string;
    companyId?: string | number;
    [key: string]: any;
}
