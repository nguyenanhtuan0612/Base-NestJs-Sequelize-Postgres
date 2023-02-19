import {
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt,
} from 'sequelize-typescript';

@Table({
    tableName: 'users',
    timestamps: true,
})
export class User extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column
    password: string;

    @Unique
    @Column
    phone_number: string;

    @Column({
        defaultValue: true,
    })
    active: boolean;

    @Column
    otp: string;

    @Column({
        defaultValue: 'customer',
    })
    role: string;

    @Column
    otp_time: string;

    @Column
    @CreatedAt
    created_at: Date;

    @Column
    @UpdatedAt
    updated_at: Date;
}
