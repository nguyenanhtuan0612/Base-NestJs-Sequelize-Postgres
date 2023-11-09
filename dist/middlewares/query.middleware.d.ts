import { NextFunction, Response } from 'express';
import { RequestWithOptions } from '@/interfaces/request.interface';
import { NestMiddleware } from '@nestjs/common';
export declare class QueryMiddleware implements NestMiddleware {
    use(req: RequestWithOptions, res: Response, next: NextFunction): Promise<void>;
}
