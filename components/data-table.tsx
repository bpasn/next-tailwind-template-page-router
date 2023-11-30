'use client';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from '@tanstack/react-table';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
export interface IDataTable<TData> {
    count: number;
    data: TData[];
    page: number;
    pageSize: number;
}
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    dataTable: IDataTable<TData>;
    loading: boolean;
    setDataTable: React.Dispatch<React.SetStateAction<IDataTable<TData>>>;

}
export default function DataTable<TData, TValue>({
    columns,
    dataTable,
    loading = false,
    setDataTable
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data: dataTable.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: dataTable.pageSize
            }
        },
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters
        }
    });

    const onPageChange = (e: React.ChangeEvent<unknown>, p: number) => {
        if (p - 1 === dataTable.page) return;
        setDataTable(prv => ({ ...prv, page: p - 1, }));
        // onPaginationChange?.(p);
    };

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead {...header.getLeafHeaders} rowSpan={2} key={header.id} >
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : !dataTable.data?.length ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    {loading ? "loading..." : "No Results."}
                                </TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows.map(row => (
                                <TableRow key={row.id}
                                    data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4 gap-2">
                <div className="flex justify-between space-x-2 items-center">
                    <p className="text-sm">showing</p>
                    <div className="w-20">
                        <Select
                            disabled={!dataTable.data.length}
                            onValueChange={(e) => {
                                setDataTable(prv => ({
                                    ...prv,
                                    pageSize: Number(e)
                                }));
                                // onChangePageSize?.();
                            }}
                            defaultValue={dataTable.pageSize?.toString()}
                            value={dataTable.pageSize?.toString()}
                        >
                            <SelectTrigger value={dataTable.pageSize?.toString()} defaultValue={dataTable.pageSize?.toString()}>
                                <SelectValue
                                    defaultValue={dataTable.pageSize?.toString()}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {[].map((o: any) => (
                                    <SelectItem
                                        key={o.toString()}
                                        value={o.toString()}
                                        className="cursor-pointer"
                                    >
                                        {o}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <p className="text-sm">of {dataTable.count}</p>
                </div>
                {/* <Pagination size='small' boundaryCount={2} siblingCount={-1} count={Math.ceil(dataTable.count / Number(dataTable.pageSize))} onChange={onPageChange} /> */}
            </div>
        </div>
    )
}