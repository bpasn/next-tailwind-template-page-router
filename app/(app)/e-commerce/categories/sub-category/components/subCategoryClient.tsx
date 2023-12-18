'use client';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import React from 'react'
import { subCategoryColumn } from './subCategoryColumn';
import useEffectHook from '@/hook/useEffectHook';
import { useStoreModalBase } from '@/hook/useStoreModel';
import { useStoreDataTableBase } from '@/hook/useStoreDataTable';

const SubCategoryClient = () => {
    const {
        dataTable,
        loading,
        onSelectChange,
        setLoading,
        setData
    } = useStoreDataTableBase<SubCategoryModel>();
    const storeModel = useStoreModalBase<SubCategoryModel>();
    const fetchData = async () => {
        setLoading(true)
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
                        title={`Sub Category(${0})`}
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
                columns={subCategoryColumn}
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

export default SubCategoryClient