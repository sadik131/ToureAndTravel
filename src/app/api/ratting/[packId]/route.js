import { NextResponse } from "next/server"
import Package from "../../modal/packageModal"
import { connectDb } from "../../../../../lib/connectDB"

export async function PATCH(req, { params }) {
    await connectDb()
    const packId = params.packId
    const data = await req.json()
    try {
        const result = await Package.findById({ _id: packId })
        if (!result) {
            return NextResponse.json({ message: "some thing went wrong" })
        }
        result.ratings.push(data)
        await result.save()
        return NextResponse.json({ success: true, result })
    } catch (error) {
        return NextResponse.json(error)
    }
}