import { IsString } from 'class-validator';

// create-message.dto.ts
export class CreateMessageDto {
    @IsString()
    public content: string;

    @IsString()
    public chat_id: string;

    @IsString()
    public user_id: string;
}
