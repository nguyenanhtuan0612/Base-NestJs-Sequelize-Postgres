import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { Chat } from './chat.entity';
import { User } from './users.entity';

@Table({
    tableName: 'messages',
    timestamps: true,
})
export class Message extends Model<Message> {
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
    content: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false,
    })
    created_at: Date;

    @ForeignKey(() => Chat)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    chat_id: string;

    @BelongsTo(() => Chat, 'chat_id')
    chat: Chat;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    user_id: string;

    @BelongsTo(() => User, 'user_id')
    user: User;
}
