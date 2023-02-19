import { IsOptional, IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    public password: string;

    @IsOptional()
    public phone_number: string;
}

export class LoginWithOTPDto {
    @IsString()
    public otp: string;

    @IsOptional()
    public phone_number: string;
}
