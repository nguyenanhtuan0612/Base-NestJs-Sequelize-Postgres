import { HttpException } from '@nestjs/common';
export declare class ExceptionWithMessage extends HttpException {
    message: string;
    code: number;
    detail: string;
    constructor(error: {
        detail: string;
        code: number;
        message?: string;
    }, status: number, message?: string);
}
