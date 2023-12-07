'use client';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import columns from './product-column';
import { useStoreDataTable } from '@/hook/useStoreDataTable';
import { Separator } from '@/components/ui/separator';
import useEffectHook from '@/hook/useEffectHook';
import { useStoreModel } from '@/hook/useStoreModel';
import StoreModal from '@/components/modal/storeModel';
import ProductForm from './ProductForm';

const StoreDataTable = useStoreDataTable<ProductModel>({ api: `https://fakestoreapi.com/products` });
const ProductClient = () => {
    const router = useRouter();
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
                className='w-full md:w-[500px]'
                component={<ProductForm />}
            />
            <div className="grid grid-cols-2 md:flex flex-1 items-center justify-between">
                <div className='col-span-2 mt-2 gap-2 md:gap-0'>
                    <Heading
                        title={`Products(${0})`}
                        description='Product info'
                    />
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
                }}
            />
        </>
    );
};

export default ProductClient;