import { NextResponse } from "next/server";
import { connectDb } from "../../../../lib/connectDB"
import User from "../modal/userModal";
const bcrypt = require("bcrypt")

export async function POST(req, res) {
    await connectDb()
    try {
        const { name, email, password } = await req.json();
        const hashPass = await bcrypt.hash(password, 10)

        const existingUser = await User.findOne({ email: email })
        if (existingUser) return NextResponse.json({ status: 400, messaage: "User already exist" })

        const user = await User.create({ name, email, password: hashPass })
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(error)
    }
}
