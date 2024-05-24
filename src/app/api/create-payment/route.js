import { NextResponse } from "next/server";

const Stripe = require("stripe")
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-04-10"
})

export async function POST(req) {
    const { amount } = await req.json()
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'usd',
        });

        NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        return NextResponse.json({ error: error.message, message: "error" });
    }

}