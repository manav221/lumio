import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 5
    },
    verified: {
        type: Boolean,
        default: false,
        enum: [true, false]
    }
}, { timestamps: true });

userSchema.index({ username: 1, email: 1 }, { unique: true });

userSchema.pre("save", async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (rawPassword) {
    return await bcrypt.compare(rawPassword, this.password);
}

const userModel = mongoose.model("users", userSchema);

export default userModel;