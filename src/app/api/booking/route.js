import { NextResponse } from "next/server"
import { connectDb } from "../../../../lib/connectDB"
import { Booking } from "../modal/bookingModal"
import Package from "../modal/packageModal"

export async function POST(req) {
    await connectDb()
    const data = await req.json()
    try {
        const result = await Booking.create(data)

        // Decrement the available room number
        const updatePack = await Package.findOne({ _id: data.packageId })
        if (updatePack) {
            updatePack.available -= 1
            await updatePack.save()
        }

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function GET() {
    await connectDb()
    try {
        const bookings = await Booking.find({}).populate("packageId").sort({ createdAt: -1 })
        return NextResponse.json(bookings)
    } catch (error) {
        return NextResponse.json(error)
    }
}