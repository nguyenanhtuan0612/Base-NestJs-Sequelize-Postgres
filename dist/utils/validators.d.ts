import { ValidatorConstraintInterface } from 'class-validator';
export declare class IsValueFilter implements ValidatorConstraintInterface {
    validate(data: any): boolean;
    defaultMessage(): string;
}
export declare const validation: (type: any, value: string | number | object, skipMissingProperties?: boolean, whitelist?: boolean, forbidNonWhitelisted?: boolean) => Promise<{
    valid: boolean;
    message: string;
}>;
