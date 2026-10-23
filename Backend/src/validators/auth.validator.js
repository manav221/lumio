import { body, validationResult } from 'express-validator';
import { AppError } from '../utils/AppError.js';

const validate = async (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }

    const allErrors = result.array().reduce((acc, currentValue) => {
        if (acc[currentValue.path]) {
            return acc;
        }

        acc[currentValue.path] = currentValue.msg;
        return acc;
    }, {})

    next(new AppError("Validation Error", 422, "INVALID_CREDS_FORMAT", allErrors));
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/;

const validationErrors = {
    email: {
        empty: "Email is required",
        format: "Enter valid email"
    },
    username: {
        empty: "Username is required",
        format: "Username only contain letters,numbers, _ and .",
        length: "Username length must be 6-12 character"
    },
    password: {
        empty: "Password is Required",
        length: "Password length must be 6-18 character",
        format: "Password contain at least one Uppercase,lowercase,number and symbol"
    }
}

const registerValidation = [
    body('username')
        .trim().isLength({ min: 6, max: 12 }).withMessage(validationErrors.username.length)
        .notEmpty().withMessage(validationErrors.username.empty)
        .matches(/^[a-zA-Z0-9_.]+$/).withMessage(validationErrors.username.format),
    body('email')
        .notEmpty().withMessage(validationErrors.email.empty)
        .isEmail().withMessage(validationErrors.email.format),
    body('password')
        .notEmpty().withMessage(validationErrors.password.empty)
        .isLength({ min: 5, max: 12 }).withMessage(validationErrors.password.length)
        .matches(passwordRegex).withMessage(validationErrors.password.format),
    validate
]

export default registerValidation;