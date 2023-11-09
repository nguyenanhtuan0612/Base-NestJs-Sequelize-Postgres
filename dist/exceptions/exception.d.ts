import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class AllExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor();
    catch(exception: HttpException | Error, host: ArgumentsHost): void;
    private static handleResponse;
    private handleLogger;
}
