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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { PERPAGE_OPTION } from '@/hook/useStoreDataTable';


interface DataTableProps<TData extends BaseModel, TValue> {
    columns: ColumnDef<TData, TValue>[];
    dataTable: IDataTable<TData>;
    loading: boolean;
    onSelectChange?: (v: string) => void;
}

export default function DataTable<TData extends BaseModel, TValue>({
    columns,
    dataTable,
    loading = false,
    onSelectChange
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data: dataTable.data,
        columns,
        initialState: {
            pagination: {
                pageSize: dataTable.pageSize,
                pageIndex: dataTable.page
            }
        },
        state: {
            columnFilters,
            pagination: {
                pageSize: dataTable.pageSize,
                pageIndex: dataTable.page
            },
        },
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

    });

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
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        )
                                    })}
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
                                onSelectChange?.(e);
                            }}
                            defaultValue={dataTable.pageSize.toString()}
                            value={dataTable.pageSize.toString()}
                        >
                            <SelectTrigger value={dataTable.pageSize} defaultValue={dataTable.pageSize.toString()}>
                                <SelectValue
                                    defaultValue={dataTable.pageSize.toString()}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(PERPAGE_OPTION).filter(v => !isNaN(Number(v))).map((o) => (
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
                {/* <div className="flex items-center gap-4">
                    <Button variant="ghost"
                        className='flex items-center gap-2'
                        onClick={() => {
                            table.previousPage();
                            setPageIndex(dataTable.page - 1);
                        }}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ArrowLeftIcon className='h-4 w-4' /> Previous
                    </Button>

                    <div className="flex items-center gap-2">
                        {getPaginationItems({
                            currentPage: dataTable.page + 1,
                            lastPage: dataTable.count / dataTable.pageSize,
                            maxLength: 5
                        }).map(v => {
                            return (
                                <Button key={v} variant={(table.getState().pagination.pageIndex + 1) === v ? "default" : "ghost"}>{!isNaN(v) ? v : '...'}</Button>
                            )
                        })}
                    </div>

                    <Button variant={"ghost"}
                        className={`flex items-center gap-2 `}
                        onClick={() => {
                            table.nextPage();
                            setPageIndex(dataTable.page + 1)
                        }}
                        disabled={!table.getCanNextPage()}
                    >
                        <ArrowRightIcon className='h-4 w-4' /> Next
                    </Button>
                </div> */}
            </div>
        </div>
    )
}
