import { NextResponse } from "next/server"
import { connectDb } from "../../../../../lib/connectDB"
import User from "../../modal/userModal"

export async function GET(req, { params }) {
  const id = params.id
  try {
      await connectDb()
      const user = await User.findOne({ email: id }, { password: 0 })
      return NextResponse.json({
          status: true,
            user
        })
  } catch (error) {
      return NextResponse.json({
          status: false,
          error: error.message
      })
  }

}
  