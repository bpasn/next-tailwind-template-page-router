'use client';
import DataTable from '@/components/data-table';
import StoreModal from '@/components/modal/storeModel';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import brandColumn from './BrandColumn';
import BrandForm from './BrandForm';
import { useStoreModalBase } from '@/hook/useStoreModel';
import { useStoreDataTableBase } from '@/hook/useStoreDataTable';

const BrandClient = () => {
    const [loading, setLoading] = useState(false);
    const storeModal = useStoreModalBase<BrandModel>();
    const { dataTable } = useStoreDataTableBase<BrandModel>();
    return (
        <>
            <StoreModal
                title={'Create Brand'}
                description='Create your Brand here.'
                children={<BrandForm />}
            />

            <div className="grid grid-cols-2 md:flex flex-1 items-center justify-between">
                <div className='col-span-2 mt-2 gap-2 md:gap-0'>
                    <Heading
                        title={`Brand(${0})`}
                        description='Brand info' />
                </div>
                <Button className="w-auto" onClick={() => storeModal.onOpen()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />

            <DataTable
                columns={brandColumn}
                loading={false}
                dataTable={dataTable}
                onSelectChange={(v) => {
                }} />
        </>
    )
}

export default BrandClient