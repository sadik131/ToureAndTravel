const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package",
        required: true
    },
    fullName: {
        type: String,
        required: true,
    },
    phonNumber: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirm', "cencel"],
        default: "pending"
    }
})

export const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema)