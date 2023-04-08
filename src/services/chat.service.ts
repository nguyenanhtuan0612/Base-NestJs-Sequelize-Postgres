// messages.service.ts
import { CreateMessageDto } from '@/dtos/chat.dto';
import { Message } from '@/entities/message.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Message)
        private readonly messageModel: typeof Message,
    ) {}

    create(createMessageDto: CreateMessageDto): Promise<Message> {
        return new Promise(async (resolve, reject) => {
            try {
                const message = new Message();
                message.content = createMessageDto.content;
                message.chatId = createMessageDto.chatId;
                message.userId = createMessageDto.userId;
                await message.save();
                resolve(message);
            } catch (error) {
                reject(error);
            }
        });
    }
}
