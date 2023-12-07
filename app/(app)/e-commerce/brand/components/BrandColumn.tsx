'use client';
import { ColumnDef} from "@tanstack/react-table";

const brandColumn: ColumnDef<BrandModel>[] = [
    {
        accessorKey: "name",
        header: "Nam"
    },
    {
        accessorKey: "logoImage",
        header: "Brand Logo"
    },

]

export default brandColumn;