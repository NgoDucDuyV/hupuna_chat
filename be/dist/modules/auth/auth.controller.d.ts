import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        data: {
            id: string;
            email: string;
            fullName: string;
            avatar?: string;
            role: import("../../common/enums/role.enum").Role;
            createdAt: Date;
            updatedAt: Date;
        };
        message: string;
    }>;
    login(req: any): Promise<{
        data: {
            access_token: string;
            user: any;
        };
        message: string;
    }>;
    getProfile(user: any): {
        data: any;
        message: string;
    };
}
