import { IsOptional } from 'class-validator';

export class RegisterDto {
    @IsOptional()
    public phoneNumber: string;

    @IsOptional()
    public password: string;
}

export class CreateUserDto {
    @IsOptional()
    public password: string;

    @IsOptional()
    public phoneNumber: string;
}
