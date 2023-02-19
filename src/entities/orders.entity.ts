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
    UpdatedAt,
} from 'sequelize-typescript';
import { Product } from './product.entity';
import { User } from './users.entity';

@Table({
    tableName: 'orders',
    timestamps: true,
})
export class Orders extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    title: string;

    @Column
    quantity: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
    })
    traders: string;

    @Column
    total_price: number;

    @ForeignKey(() => Product)
    @Column
    product_id: number;

    @Column
    @CreatedAt
    created_at: Date;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
    })
    created_by: string;

    @Column
    @UpdatedAt
    updated_at: Date;

    @BelongsTo(() => Product)
    product: Product;

    @BelongsTo(() => User, 'created_by')
    user: User;

    @BelongsTo(() => User, 'trader_id')
    trader: User;
}
