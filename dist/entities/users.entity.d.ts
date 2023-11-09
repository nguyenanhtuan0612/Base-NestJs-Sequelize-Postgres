import { Model } from 'sequelize-typescript';
export declare class User extends Model {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
