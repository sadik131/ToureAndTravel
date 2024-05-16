import { NextResponse } from "next/server"
import { connectDb } from "../../../../lib/connectDB"
import { Booking } from "../modal/bookingModal"

export async function POST(req) {
    await connectDb()
    const data = await req.json()
    try {
        const result = await Booking.create(data)
        console.log(result)
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function GET() {
    await connectDb()
    try {
        const bookings = await Booking.find({}).populate("packageId")
        return NextResponse.json(bookings)
    } catch (error) {
        return NextResponse.json(error)
    }
}