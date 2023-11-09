import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto, LoginDto, RegisterDto, UserResponeWithToken, UserResponse } from '@/dtos/users.dto';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<UserResponse>;
    login(dto: LoginDto): Promise<UserResponeWithToken>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<UserResponse>;
}
