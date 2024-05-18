import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDb } from "../../../../../lib/connectDB";
import User from "../../modal/userModal";
const bcrypt = require('bcrypt');



export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    await connectDb();
                    const user = await User.findOne({ email: email });
                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (!passwordsMatch) {
                        return null;
                    }
                    return user;
                } catch (error) {
                    console.log("Error: ", error);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        jwt: true,
        maxAge: 60 * 60,
    },
    secret: process.env.nextAuth,
    pages: {
        signIn: "/",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };