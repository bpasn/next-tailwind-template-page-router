'use client';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import useEffectHook from '@/hook/useEffectHook';
import { useStoreModel } from '@/hook/useStoreModel';
import { Plus } from 'lucide-react';
import columns from './product-column';
import { useStoreDataTable } from '@/hook/useStoreDataTable';
import ProductForm from './ProductForm';
import StoreModal from '@/components/modal/storeModel';
const StoreDataTable = useStoreDataTable<ProductColumn>({ api: "https://fakestoreapi.com/products" });
export const ProductClient = () => {
    const {
        loading,
        dataTable,
        fetchDataTable,
        onSelectChange,
    } = StoreDataTable();

    const storeModal = useStoreModel();
    useEffectHook(() => {
        fetchDataTable();
    });

    return (
        <>
            <StoreModal
                title={'Create Product Store'}
                description='Create your product here.'
                className='w-full max-w-6xl'
                children={<ProductForm />}
            />

            <div className="grid grid-cols-2 md:flex flex-1 items-center justify-between">
                <div className='col-span-2 mt-2 gap-2 md:gap-0'>
                    <Heading
                        title={`Products(${0})`}
                        description='Product info' />
                </div>
                <Button className="w-auto" onClick={() => storeModal.onOpen()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <Button onClick={fetchDataTable}>
                Fetch Data
            </Button>
            <DataTable
                columns={columns}
                loading={loading}
                dataTable={dataTable}
                onSelectChange={(v) => {
                    onSelectChange(v);
                    fetchDataTable();
                }} />
        </>
    );
};
