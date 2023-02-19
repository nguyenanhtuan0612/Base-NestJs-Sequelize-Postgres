// messages.controller.ts
import { CreateMessageDto } from '@/dtos/chat.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('chats')
export class ChatController {
    constructor() {}

    @Post()
    async createChat(@Body() body: CreateMessageDto) {
        try {
            return body;
        } catch (error) {
            throw error;
        }
    }
}
