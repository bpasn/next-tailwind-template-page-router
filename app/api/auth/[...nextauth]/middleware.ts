import { getServerSession } from "next-auth"
import { authOption } from "./authOption";
import { NextResponse } from "next/server";
import axios, { AxiosInstance } from 'axios';
const axiosInstance = axios.create({
    baseURL: process.env.APP_API,
    timeout: 5 * 1000
});

interface ClientAxios extends AxiosInstance {

}

export interface MyRequest extends Request {
    client: ClientAxios
}
export const middleware = (
    handler: <P>(request: MyRequest, params?: P) => Promise<NextResponse>
) => async (req: MyRequest) => {
    const session = await getServerSession(authOption);
    if (!session) {
        req.client = axiosInstance;
        return handler(req);
    }
    return NextResponse.json({
        message: "Unauthorization",
        success: false,
        status: 401
    })
}