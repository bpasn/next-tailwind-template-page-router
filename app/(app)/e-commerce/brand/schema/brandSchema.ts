import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const BrandSchema = z.object({
    name: z.string().min(1).toUpperCase(),
    logoImage: typeof window === "undefined" ? z.string().nullable() : z.instanceof(File).nullable()
});
export const BrandResover = zodResolver(BrandSchema);
export type BrandInfer = z.infer<typeof BrandSchema>;