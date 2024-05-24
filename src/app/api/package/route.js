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

export async function GET(req) {
    await connectDb()
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams
        const location = searchParams.get("location")
        const sortByPrice = searchParams.get("price")
        const query = {}

        if (location) query.location = location
        const sortOption = {}

        if (sortByPrice === "asc") {
            sortOption.price = 1; 
        } else if (sortByPrice === "desc") {
            sortOption.price = -1; 
        }
        const result = await Package.find(query).sort(sortOption);
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(error)
    }
}