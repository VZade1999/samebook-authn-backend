export declare class DAOService {
    private model;
    constructor(model?: any);
    setModel(model: any): void;
    getAllRecords: (page: any, limit: any, sort: string, sortBy: string, condition: object, joins: object, fields?: string) => Promise<{
        success: boolean;
        data: {
            page: number;
            limit: number;
            records: any;
            totalCount: any;
        };
    } | undefined>;
    getRecordById: (id: number | string) => Promise<{
        success: boolean;
        data: any;
    } | {
        success: boolean;
        data?: undefined;
    }>;
    getRecordsByCondition: (condition: object, joins: any) => Promise<{
        success: boolean;
        data: any;
    } | {
        success: boolean;
        data?: undefined;
    }>;
    getRecordByCondition: (condition: object, joins?: object | never, sort?: string, sortBy?: string) => Promise<{
        success: boolean;
        data: any;
    } | {
        success: boolean;
        data?: undefined;
    }>;
    createRecord: (recordData: object) => Promise<{
        success: boolean;
        data: any;
    } | {
        success: boolean;
        data?: undefined;
    }>;
    createRecords: (recordsData: object) => Promise<{
        success: boolean;
        data: any;
    } | {
        success: boolean;
        data?: undefined;
    }>;
    updateRecordById: (id: number | string, updatedData: object) => Promise<{
        success: boolean;
        data: any;
    } | {
        success: boolean;
        data?: undefined;
    }>;
    updateRecordByCondition: (updatedData: object, condition: object) => Promise<{
        success: boolean;
        data: any;
    } | {
        success: boolean;
        data?: undefined;
    }>;
    deleteRecordById: (id: number | string) => Promise<{
        success: boolean;
    }>;
}
