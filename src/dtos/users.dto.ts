import { IsOptional } from 'class-validator';

export class RegisterDto {
    @IsOptional()
    public phone_number: string;

    @IsOptional()
    public password: string;
}

export class CreateUserDto {
    @IsOptional()
    public password: string;

    @IsOptional()
    public phone_number: string;
}
