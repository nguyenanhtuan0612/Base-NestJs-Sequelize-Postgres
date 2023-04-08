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
    phoneNumber: string;

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
    otpTime: string;

    @Column
    @CreatedAt
    createdAt: Date;

    @Column
    @UpdatedAt
    updatedAt: Date;
}
