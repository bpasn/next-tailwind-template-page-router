'use client';

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./productCellAction";

const columns: ColumnDef<ProductModel>[] = [
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
    {
        header: "Action",
        cell: (data) => <CellAction data={data.row.original} />
    }
]

export default columns;