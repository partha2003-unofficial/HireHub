import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    discription: {
        type: String,
        required: true
    },
    requirements: [
        {
            type: String
        }
    ],
    responsibilities: [
        {
            type: String
        }
    ],
    skills: [
        {
            type: String,
            trim: true
        }
    ],
    employmentType: {
        type: String,
        enum: [
            "FULL_TIME",
            "PART_TIME",
            "CONTRACT",
            "INTERNSHIP",
            "FREELANCE",
        ],
        required: true
    },
    experienceLevel: {
        type: String,
        enum: [
            "FRESHER",
            "ENTRY_LEVEL",
            "MID_LEVEL",
            "SENIOR_LEVEL",
            "EXPERT",
        ],
        required: true
    },
    salary: {
        min: Number,
        max: Number,
        currency: {
            type: String,
            default: 'INR',
        },
        isNegotiable: {
            type: Boolean,
            default: false
        }
    },
    location: {
        city: String,
        state: String,
        contry: String,
    },
    workMode: {
        type: String,
        enum: ["ONSITE", "REMOTE", "HYBRID"],
        default: "ONSITE",
    },
    vacancies: {
        type: Number,
        default: 1,
        min: 1
    },
    applicationDeadline: {
        type: Date
    },
    status: {
        type: String,
        enum: ["OPEN", "CLOSED", "DRAFT"],
        default: "DRAFT"
    }
}, { timestamps: true })

export default mongoose.model('job', jobSchema);