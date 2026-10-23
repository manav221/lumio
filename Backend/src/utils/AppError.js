export class AppError extends Error {
    constructor(message, statusCode, code, details) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.details = details || {};
    }
}