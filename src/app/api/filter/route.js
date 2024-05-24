import { NextResponse } from "next/server";
import { connectDb } from "../../../../lib/connectDB";
import Package from "../modal/packageModal"

export async function GET() {
    await connectDb()
    try {
        const { location, price } = req.query;
        console.log(location)

        const packages = await Package.find({})
        
        return NextResponse.json(packages)
    } catch (error) {
        return NextResponse.json(error)
    }
}