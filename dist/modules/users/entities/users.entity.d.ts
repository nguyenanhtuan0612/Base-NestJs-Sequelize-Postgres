import { Model } from 'sequelize-typescript';
export declare class User extends Model {
    id: string;
    email: string;
    password: string;
    balance: number;
    role: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
