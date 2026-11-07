import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    phone: {
        type: Number
    },
    headline: {
        type: String
    },
    bio: {
        type: String
    },
    skills: [
        {
            type: String,
            trim: true
        }
    ],
    experience: [
        {
            company: String,
            position: String,
            StateDate: Date,
            endDate: Date,
            currentlyWorking: {
                type: Boolean,
                default: false
            },
            discription: String
        }
    ],
    education: [
        {
            institution: String,
            degree: String,
            fildOfStudy: String,
            startYear: Number,
            endYear: Number
        }
    ],
    resume: {
        url: String,
        publicId: String,
        fileName: String,
        uploadAt: Date
    },
    location: {
        city: String,
        state: String,
        country: String
    },
    portfolio: {
        type: String
    },
    linkedIn: {
        type: String
    }
}, { timestamps: true })

export default mongoose.model('candidate', candidateSchema);