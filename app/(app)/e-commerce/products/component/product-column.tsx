'use client';

import { ColumnDef } from "@tanstack/react-table";

export interface ProductColumn {
    id: string;
    name: string;
    createdAt: string;
}

const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "id",
        header: "Id"
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "createdAt",
        header: "Date"
    },

]

export default columns;