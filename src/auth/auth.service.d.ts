import { AppLogger } from 'src/common/logger/logger.service';
export declare class AuthService {
    private dbProvider;
    private readonly appLogger;
    private readonly Users;
    private readonly UserRole;
    private readonly RolePermissions;
    private readonly Permissions;
    private readonly Roles;
    private readonly Companies;
    constructor(dbProvider: any, appLogger: AppLogger);
    login(username: string, password: string): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            accessToken: string;
            refreshToken: string;
            user: {
                id: any;
                company_id: any;
                first_name: any;
                last_name: any;
                email: any;
                phone: any;
                company: {
                    id: any;
                    name: any;
                    email: any;
                    phone: any;
                    address: any;
                    logo: any;
                    is_active: any;
                } | null;
                roles: string[];
                permissions: string[];
            };
        };
    }>;
    register(first_name: string, last_name: string, email: string, phone: string, password: string): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            id: any;
            first_name: any;
            last_name: any;
            email: any;
            phone: any;
            company_id: any;
        };
    }>;
    logout(userId?: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
