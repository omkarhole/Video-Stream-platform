'use server'

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;
//server side code to generate stream token
export const tokenProvider = async () => {
    const user = await currentUser();

    if (!user) {
        throw new Error("User is Not Logged In");
    }
    if (!apiKey) {
        throw new Error("Stream API key Missing");
    }
    if (!apiSecret) {
        throw new Error("Stream API Secret Missing");
    }

    const client = new StreamClient(apiKey, apiSecret);
const validity = 60 * 60;
const issued = Math.floor(Date.now() / 1000) - 60;
const token = client.createToken(user.id, validity, issued);

    return token;
}