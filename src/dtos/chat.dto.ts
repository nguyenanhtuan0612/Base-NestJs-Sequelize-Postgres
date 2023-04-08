import { IsString } from 'class-validator';

// create-message.dto.ts
export class CreateMessageDto {
    @IsString()
    public content: string;

    @IsString()
    public chatId: string;

    @IsString()
    public userId: string;
}
