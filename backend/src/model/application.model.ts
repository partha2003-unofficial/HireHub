import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "candidate",
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
        required: true
    },
    resume: {
        url: {
            type: String,
            required: true
        },
        fileName: String
    },
    coverLetter: {
        type: String
    },
    status: {
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
        default: "APPLIED"
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    lastStatusUpdateAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

export default mongoose.model('application', applicationSchema);