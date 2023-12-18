import axios from "axios"
import { getServerSession } from "next-auth"
import { authOption } from "./auth/[...nextauth]/authOption"

export const GenerateClient = async (req: Request) => {
    const session = await getServerSession(authOption);
    const axiosInstance = axios.create({
        baseURL: process.env.APP_API,
        timeout: 5 * 1000,
    });

    if (session) {
        axiosInstance.interceptors.request.use(
            config => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${session.token}`
                }
                return config
            }
        );
    }
    return axiosInstance;
}