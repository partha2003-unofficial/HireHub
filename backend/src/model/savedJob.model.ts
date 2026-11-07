import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'candidate',
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
        required: true
    }
}, { timestamps: true })

export default mongoose.model('savedjob', savedJobSchema);