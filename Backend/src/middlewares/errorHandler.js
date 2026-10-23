export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        code: err.code,
        message: err.message >= 500 ? "Internal server error" : err.message,
        details: err.details
    });
};