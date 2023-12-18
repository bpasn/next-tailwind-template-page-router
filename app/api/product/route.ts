import { ProductFormSchema } from "@/app/(app)/e-commerce/products/schema/productSchema";
import { NextResponse } from "next/server";
import { MyRequest, middleware } from "../auth/[...nextauth]/middleware";
export const POST = async (
    req: Request
) => {
    const formData = await req.formData();
    const validate = ProductFormSchema.safeParse(formData);
    if (!validate.success) {
        return NextResponse.json({
            status: 400,
            validation: validate.error.formErrors.fieldErrors
        }, { status: 200 })
    }
    return NextResponse.json(true)
}

interface ParamGet {
    params: {
        page: string;
        pageSize: string;
    }
}
export const GET = middleware(async <ParamGet>(req: MyRequest, param: ParamGet) => {
    return NextResponse.json(req.client);
})