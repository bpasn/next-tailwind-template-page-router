'use client';

import { ColumnDef} from "@tanstack/react-table";

const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "id",
        header: "Id"
    },
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "price",
        header: "Price"
    },
    {
        accessorKey: "category",
        header: "Category"
    },
    {
        accessorKey: "description",
        header: "Description",
    },
]

export default columns;