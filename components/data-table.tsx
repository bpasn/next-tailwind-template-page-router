'use client';
import {
    ColumnDef,
    ColumnFiltersState,
    Pagination,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from './ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
export enum PERPAGE_OPTION {
    TEN = 10,
    TWENTY_FIVE = 25,
    FIFTY = 50,
    ONE_HUNDRED = 100
}
export interface IDataTable<TData> {
    count: number;
    data: TData[];
    page: number;
    pageSize: PERPAGE_OPTION;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    dataTable: IDataTable<TData>;
    loading: boolean;
    onSelectChange?: (v: string) => void;
}

export default function DataTable<TData, TValue>({
    columns,
    dataTable,
    loading = false,
    onSelectChange
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data: dataTable.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: dataTable.pageSize,
                pageIndex: dataTable.page
            }
        },
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
            pagination: {
                pageSize: dataTable.pageSize,
                pageIndex: dataTable.page
            }
        }
    });
    const onPageChange = (e: React.ChangeEvent<unknown>, p: number) => {
        if (p - 1 === dataTable.page) return;
        // setDataTable(prv => ({ ...prv, page: p - 1, }));
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
                                // setDataTable(prv => ({
                                //     ...prv,
                                //     pageSize: Number(e)
                                // }));
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
                <div className="flex items-center gap-4">
                    <Button variant="ghost"
                        className='flex items-center gap-2'
                        onClick={() => {
                            table.previousPage()
                        }}
                    >
                        <ArrowLeftIcon className='h-4 w-4' /> Previous
                    </Button>

                    <div className="flex items-center gap-2">
                        {Array.from(Array(table.getPageCount()).keys()).map(v => {
                            if (v > 3 && v < table.getPageCount() - 2) {
                                return <span key={v}>...</span>
                            }
                            return (
                                <Button key={v} variant={(dataTable.page) === v ? "default" : "ghost"}>{v + 1}</Button>
                            )
                        })}
                    </div>

                    <Button variant={"ghost"}
                        className={`flex items-center gap-2 `}
                        onClick={() => table.nextPage()}
                        disabled={false}
                    >
                        <ArrowRightIcon className='h-4 w-4' /> Next
                    </Button>
                </div>
                {/* <Pagination size='small' boundaryCount={2} siblingCount={-1} count={Math.ceil(dataTable.count / Number(dataTable.pageSize))} onChange={onPageChange} /> */}
            </div>
        </div>
    )
}
