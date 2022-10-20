export class HttpException extends Error {
    public status: number;
    public message: string;
    public code: number;
    public detail?: string;

    constructor(
        status: number,
        message: string,
        code: number,
        detail?: string,
    ) {
        super(message);
        this.status = status;
        this.message = message;
        this.code = code;
        this.detail = detail;
    }
}
