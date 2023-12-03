import zod from 'zod';
export const ProductFormSchema  = zod.object({
    name: zod.string().min(1),
    title: zod.string().min(1),
    categoryId: zod.string({ required_error: "Category is required" }),
    brandId: zod.string(),
    price: zod.coerce.number(),
    qualtity: zod.coerce.number(),
    sku: zod.string(),
    description: zod.string().nullable(),
    images: zod.object({
        image: zod.string()
    }).array().nullable()

});

export type ProductFormInfer = zod.infer<typeof ProductFormSchema>;