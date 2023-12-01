import { ColumnDef } from "@tanstack/react-table";

export const categoryColumn: ColumnDef<CategoryModel>[] = [
    {
        accessorKey: "id",
        header: "Id"
    },
    {
        accessorKey: "name",
        header: "Category Name"
    }
];