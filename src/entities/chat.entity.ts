import {
    Column,
    DataType,
    Model,
    Table,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { Message } from './message.entity';
import { User } from './users.entity';

@Table({
    tableName: 'chats',
    timestamps: true,
})
export class Chat extends Model<Chat> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false,
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false,
    })
    updatedAt: Date;

    @BelongsTo(() => User, 'creatorId')
    creator: User;

    @HasMany(() => Message, 'chatId')
    messages: Message[];
}
