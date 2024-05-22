import { NextResponse } from "next/server"
import { connectDb } from "../../../../lib/connectDB"
import Package from "../modal/packageModal"

export async function POST(req) {
    await connectDb()
    const { data } = await req.json()
    try {
        const result = await Package.create(data)
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function GET() {
    await connectDb()
    try {
        const packages = await Package.find({})
        return NextResponse.json(packages)
    } catch (error) {
        return NextResponse.json(error)
    }
}