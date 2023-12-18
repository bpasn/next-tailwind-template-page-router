import type { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export const middleware = async (req: NextRequest, res: NextResponse) => {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log(token)
}