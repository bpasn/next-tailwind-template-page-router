import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

export const CategorySchema = z.object({
    name: z.string().min(1),
});

export const SubCategorySchema = z.object({
    name: z.string().min(1),
    categoryId: z.string().min(1).refine((value) => value.length <= 0, "Please enter your category!")
});


export const CategoryResolver = zodResolver(CategorySchema);
export const SubCategoryResolver = zodResolver(SubCategorySchema);

export type CategoryInfer = z.infer<typeof CategorySchema>;
export type SubCategoryInfer = z.infer<typeof SubCategorySchema>;