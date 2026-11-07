import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    discription: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    logo: {
        type: String
    },
    industry: {
        type: String,
        required: true
    },
    conpanySize: {
        type: String,
        enum: [
            "1-10",
            "11-50",
            "51-200",
            "201-500",
            "501-1000",
            "1000+",
        ]
    },
    location: {
        city: String,
        state: String,
        country: String,
        address: String
    },
    foundedYear: {
        type: Number
    }
}, { timestamps: true })

export default mongoose.model('company', companySchema);