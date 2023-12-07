'use client';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useStoreModel } from "@/hook/useStoreModel";
import { Copy, Edit2, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const CellAction: React.FC<{
    data: ProductModel
}> = ({
    data
}) => {
        const storeModel = useStoreModel();
        const router = useRouter();
        const [open, setOpen] = useState(false);
        const [loading, setLoading] = useState(false);
        const onCopy = (id: string) => {
            navigator.clipboard.writeText(id);
        };

        const onDelete = async () => {
            setLoading(true);
            try {
                // await axios.delete(`/api/products/${data.id}`);
                window.location.reload();
            } catch (error: any) {
                // if (axios.isAxiosError(error)) {
                //     toast.error(error.response?.data.message);
                // } else {
                //     toast.error(error.message)
                // }
            } finally {
                setLoading(false);
                setOpen(false)
            }
        };

        const onEdit = async (id: string) => {
            const result = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await result.json();
            
        }
        return (
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {/* Open menu */}
                        <Button
                            variant={"ghost"}
                            className="h-8 w-8 p-0 border"
                        >
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="h-4 w-4 " />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onCopy(data.id)}>
                            <Copy className="mr-2 h4 w-4" />
                            Copy Id
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            router.push(`/e-commerce/products/${data.id}`)
                        }}>
                            <Edit2 className="mr-2 h4 w-4" />
                            Update
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setOpen(!open)}>
                            <Trash className="mr-2 h4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </>
        );
    };