import { ColumnDef } from "@tanstack/react-table";

export const subCategoryColumn: ColumnDef<SubCategoryModel>[] = [
    {
        accessorKey: "id",
        header: "Id"
    },
    {
        accessorKey: "name",
        header: "Sub Category Name"
    },
    {
        accessorKey: "categoryId",
        header: "Category"
    }
];