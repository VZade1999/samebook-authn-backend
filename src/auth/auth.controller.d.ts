import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import { AppLogger } from 'src/common/logger/logger.service';
export declare class AuthController {
    private readonly authService;
    private readonly appLogger;
    constructor(authService: AuthService, appLogger: AppLogger);
    login(req: Request, res: Response, body: AuthDto): Promise<any>;
    register(req: Request, res: Response, body: RegisterDto): Promise<any>;
    logout(req: Request, res: Response): Promise<any>;
}
