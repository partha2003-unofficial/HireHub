import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        selected: false
    },
    role: {
        type: String,
        required: true,
        enum: ["EMPLOYER", "CANDIDATE"]
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

export default mongoose.model('user', userSchema);