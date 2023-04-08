import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { User } from './users.entity';

@Table({
    tableName: 'userOrders',
    timestamps: true,
})
export class UserOrder extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId: string;

    @Column
    orderId: number;

    @Column
    isPaid: boolean;

    @Column
    @CreatedAt
    createdAt: Date;

    @Column
    @CreatedAt
    updatedAt: Date;

    @BelongsTo(() => User)
    user: User;
}
