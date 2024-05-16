import { NextResponse } from "next/server"
import { connectDb } from "../../../../../lib/connectDB"
import Package from "../../modal/packageModal"

export async function GET(req, { params }) {
  const id = params.id
  try {
      await connectDb()
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
  