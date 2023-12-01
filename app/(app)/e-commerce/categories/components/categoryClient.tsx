'use client';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import React from 'react'
import { categoryColumn } from './category-column';
import { useStoreDataTable } from '@/hook/useStoreDataTable';
import useEffectHook from '@/hook/useEffectHook';
import { useStoreModel } from '@/hook/useStoreModel';

const storeDataTable = useStoreDataTable<CategoryModel>({
    api: 'https://fakestoreapi.com/products/categories'
});
const CategoryClient = () => {
    const {
        dataTable,
        loading,
        onSelectChange,
        setLoading,
        setData
    } = storeDataTable();
    const storeModel = useStoreModel();
    const fetchData = async () => {
        setLoading(true)
        let result = await fetch("https://fakestoreapi.com/products/categories");
        let json: string[] = await result.json();
        let data: CategoryModel[] = json.map((v: string, i: number) => ({ id: String(i + 1), name: v }));
        setData({
            ...dataTable,
            data
        });
        setLoading(false);
    }
    useEffectHook(() => {
        fetchData()
    })
    return (
        <>
            <div className="grid grid-cols-2 md:flex flex-1 items-center justify-between">
                <div className='col-span-2 mt-2 gap-2 md:gap-0'>
                    <Heading
                        title={`Category(${0})`}
                        description='Product info'
                    />
                </div>
                <Button className="w-auto" onClick={() => storeModel.onOpen()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable
                columns={categoryColumn}
                loading={loading}
                dataTable={dataTable}
                onSelectChange={(v) => {
                    onSelectChange(v);
                    fetchData();
                }}
            />
        </>
    )
}

export default CategoryClient