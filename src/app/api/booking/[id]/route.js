import { NextResponse } from "next/server"
import { Booking } from "../../modal/bookingModal"
import { connectDb } from "../../../../../lib/connectDB"
import { getServerSession } from "next-auth"

export async function GET(req, { params }) {
    
    await connectDb()
    const id = params.id
    try {
        const result = await Booking.find({ userId: id }).populate("packageId")
        return NextResponse.json({
            status: true,
            result
        })
    } catch (error) {
        return NextResponse.json({
            status: false,
            error: error.message
        })
    }
}

export async function PATCH(req, { params }) {
    await connectDb()
    const id = params.id
    const update = await req.json()
    try {
        const result = await Booking.findOneAndUpdate({ _id: id }, update, { new: true })
        return NextResponse.json({
            status: true,
            result
        })
    } catch (error) {
        return NextResponse.json({
            status: false,
            error: error.message
        })
    }

}
