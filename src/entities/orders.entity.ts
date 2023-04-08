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
    totalPrice: number;

    @ForeignKey(() => Product)
    @Column
    productId: number;

    @Column
    @CreatedAt
    createdAt: Date;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
    })
    createdBy: string;

    @Column
    @UpdatedAt
    updatedAt: Date;

    @BelongsTo(() => Product)
    product: Product;

    @BelongsTo(() => User, 'createdBy')
    user: User;

    @BelongsTo(() => User, 'traderId')
    trader: User;
}
