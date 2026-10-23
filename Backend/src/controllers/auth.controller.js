import userModel from '../models/user.model.js';
import sendEmail from '../services/email.service.js';
import { AppError } from '../utils/AppError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

async function register(req, res) {
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
        const message = `${existingUser.username === username ? "username" : "email"} already registered`;
        throw new AppError(message, 409, "USER_ALREADY_EXISTS");
    }

    const user = await userModel.create({ username, email, password });

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);

    const html = `
        <h3>Welcome to Perlexity</h3>
        <p>Please click on below link for Email verification</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${token}">Verify Email</a>
        `

    await sendEmail(email, "Verify Your Email Address", html);

    return res.status(201).json({
        success: true,
        code: "REGISTRATION_SUCCESS",
        message: "Your account has been created. Please verify your email address.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            verified: user.verified
        }
    });

}

async function login(req, res) {
    const { userId, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username: userId },
            { email: userId }
        ]
    }).select("+password");

    if (!user) {
        throw new AppError("Invalid username/email or password", 400, "INVALID_CREDENTIALS");
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
        throw new AppError("Invalid credentials provided", 400, "INVALID_CREDENTIALS");
    }

    const isVerified = user.verified;
    if (!isVerified) {
        throw new AppError("Please verify your email address before logging in",
            403,
            "EMAIL_NOT_VERIFIED");
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
        success: true,
        code: "LOGIN_SUCCESS",
        message: "You have logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });

}

async function logout(req, res) {
    try {
        const token = req.cookies.auth_token;
        res.clearCookie(token);

        res.status(200).json({
            success: true,
            code: "LOGGEDOUT",
            message: "user logout successfully"
        });
    } catch (err) {
        throw err;
    }
}

async function getMe(req, res) {
    try {
        const user = await userModel.findById(req.user.id);

        return res.status(200).json({
            success: true,
            code: "USER",
            message: "user data fetched successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        throw err;
    }
}

async function verifyEmail(req, res) {

    const { token } = req.query;
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(userId);

    if (!user) {
        throw new AppError("No account was found for this verification link", 404, "USER_NOT_FOUND");
    }

    if (user.verified) {
        return res.status(200).send(
            "<p>Your email address is already verified.</p>"
        )
    }

    user.verified = true;
    await user.save();

    return res.status(200)
        .send("<p>Your email address has been verified successfully.</p>")
}

async function resendEmail(req, res) {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        throw new AppError(
            "No account found with this email address",
            404,
            "USER_NOT_FOUND");
    }

    if (user.verified) {
        return res.status(200).send(
            "<p>Your email address is already verified.</p>"
        )
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);

    const html = `
        <h3>Welcome to Perlexity</h3>
        <p>Please click on below link for Email verification</p>
        <a href="http://localhost:3000/api/auth/verify-email?token=${token}">Verify Email</a>
        `

    await sendEmail(user.email, "Verify Your Email Address", html);

    return res.status(200).json({
        success: true,
        code: "VERIFICATION_EMAIL_SENT",
        message: "A new verification email has been sent to your email address"
    })
}

export { register, login, logout, getMe, verifyEmail, resendEmail };