import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    type: {
        type: String,
        enum: [
            "APPLICATION_RECEIVED",
            "APPLICATION_SUBMITTED",
            "STATUS_UPDATED",
            "JOB_CLOSED",
            "GENERAL",
        ],
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    relatedApplication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "application"
    },
    relatedJob: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job"
    },
    isRead: {
        type: Boolean,
        default: false
    },
    readAt: {
        type: Date
    },
    emailStatus: {
        type: String,
        enum: ["PENDING", "SENT", "FAILED", "NOT_REQUIRED"],
        default: "PENDING"
    },
    emailSendAt: {
        type: Date
    }
}, { timestamps: true })

export default mongoose.model('notification', notificationSchema);