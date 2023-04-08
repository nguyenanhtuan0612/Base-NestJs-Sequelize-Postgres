import {
    AutoIncrement,
    Column,
    CreatedAt,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';

@Table({
    tableName: 'products',
    timestamps: true,
})
export class Product extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    name: string;

    @Column
    link: string;

    @Column
    unitPrice: number;

    @Column
    discount: number;

    @Column
    description: string;

    @Column
    location: string;

    @Column
    @CreatedAt
    createdAt: Date;

    @Column
    @UpdatedAt
    updatedAt: Date;
}
