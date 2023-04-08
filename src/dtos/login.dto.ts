import { IsOptional, IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    public password: string;

    @IsOptional()
    public phoneNumber: string;
}

export class LoginWithOTPDto {
    @IsString()
    public otp: string;

    @IsOptional()
    public phoneNumber: string;
}
