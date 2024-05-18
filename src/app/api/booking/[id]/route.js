import { NextResponse } from "next/server"
import { Booking } from "../../modal/bookingModal"
import { connectDb } from "../../../../../lib/connectDB"

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

export async function DELETE(req, { params }) {
    await connectDb()
    const id = params.id
    console.log(id)
    try {
        // const result = await Booking.find({ userId: id }).populate("packageId")
        return NextResponse.json({
            status: true,
            // result
        })
    } catch (error) {
        return NextResponse.json({
            status: false,
            error: error.message
        })
    }

}
