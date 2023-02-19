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
    tableName: 'user_orders',
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
    user_id: string;

    @Column
    order_id: number;

    @Column
    is_paid: boolean;

    @Column
    @CreatedAt
    created_at: Date;

    @Column
    @CreatedAt
    updated_at: Date;

    @BelongsTo(() => User)
    user: User;
}
