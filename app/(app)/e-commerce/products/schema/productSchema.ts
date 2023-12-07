import zod from 'zod';
export const ImagesSchema = zod.object({
    image: typeof window !== "undefined" ? zod.instanceof(File) : zod.string()
}).array().nullable();

export const ProductFormSchema = zod.object({
    name: zod.string().min(1),
    title: zod.string().min(1),
    categoryId: zod.string({ required_error: "Category is required" }).min(1),
    brandId: zod.string().min(1),
    price: zod.coerce.number(),
    qualtity: zod.coerce.number(),
    sku: zod.string(),
    images: ImagesSchema,
    description: zod.string().nullable(),
    additionals: zod.object({
        title: zod.string().min(1),
        detail: zod.string().min(1)
    }).array().nullable()

});


export type ProductFormInfer = zod.infer<typeof ProductFormSchema>;