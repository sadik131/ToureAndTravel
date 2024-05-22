import { NextResponse } from "next/server"
import { connectDb } from "../../../../../lib/connectDB"
import Package from "../../modal/packageModal"

export async function GET(req, { params }) {
    await connectDb()
    const id = params.id
    try {
        const result = await Package.findOne({ _id: id })
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
    const body = await req.json()
    try {
        const result = await Package.findOneAndUpdate({ _id: id }, body, { new: true })
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
    try {
        const result = await Package.findOneAndDelete({ _id: id })
        return NextResponse.json({
            status: true,
            id
        })
    } catch (error) {
        return NextResponse.json({
            status: false,
            error: error.message
        })
    }
}
