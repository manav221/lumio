import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js'

export const identifyUser = async (req, res, next) => {
    const token = req.cookies.auth_token;
    
    if (!token) {
        return res.status(401).json({
            success: false,
            code: "AUTH_TOKEN_MISSING",
            message: "Authentication token is required"
        })
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        let isJWTError = ["TokenExpiredError", "JsonWebTokenError", "NotBeforeToken"].includes(err?.name);

        if (isJWTError) {
            return next(new AppError("Invalid auth token", 401, "INVALID_AUTH_TOKEN"));
        }

        return next(err);
    }
}