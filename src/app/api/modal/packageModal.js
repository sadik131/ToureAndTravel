import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: [true, "required"]
    }
}, { timestamps: true })

const packageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    thumbnil: {
        type: String,
        required: true
    },
    maxGust: {
        type: Number,
        required: true
    },
    ratings: [ratingSchema]

}, { timestamps: true });

const Package = mongoose.models.Package || mongoose.model("Package", packageSchema);

export default Package;
