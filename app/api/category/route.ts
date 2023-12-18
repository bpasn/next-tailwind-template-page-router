import { NextResponse } from "next/server"
import { MyRequest, middleware } from "../auth/[...nextauth]/middleware";
import { GenerateClient } from "../generateClient";

export const GET = middleware(async (req: MyRequest) => {
    const client = await GenerateClient(req);
    const response = await client.get("https://fakestoreapi.com/products");
    return NextResponse.json(response.data);

})