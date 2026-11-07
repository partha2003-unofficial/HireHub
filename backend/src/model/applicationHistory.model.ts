import mongoose from "mongoose";

const applicationHistorySchema = new mongoose.Schema({
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "application",
        required: true
    },
    previousStatus: {
        type: String,
        enum: [
            "APPLIED",
            "UNDER_REVIEW",
            "SHORTLISTED",
            "INTERVIEW",
            "HIRED",
            "REJECTED",
            "WITHDRAWN",
        ]
    },
    newStatus: {
        type: String,
        enum: [
            "APPLIED",
            "UNDER_REVIEW",
            "SHORTLISTED",
            "INTERVIEW",
            "HIRED",
            "REJECTED",
            "WITHDRAWN",
        ],
        required: true
    },
    changeBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    note: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model('applicationHistory', applicationHistorySchema);