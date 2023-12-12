'use client';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import useEffectHook from '@/hook/useEffectHook';
import { Plus } from 'lucide-react';
import columns from './product-column';
import { useStoreDataTableBase } from '@/hook/useStoreDataTable';
import { useRouter } from 'next/navigation';
import { useStoreModalBase } from '@/hook/useStoreModel';
import StoreModal from '@/components/modal/storeModel';
import ProductForm from './ProductForm';
import { useAlertStore } from '@/hook/useStoreAlert';
export const ProductClient = () => {
    const router = useRouter();
    const {
        loading,
        dataTable,
        onSelectChange,
        setLoading,
        setData
    } = useStoreDataTableBase<ProductModel>();

    const storeModal = useStoreModalBase<ProductModel>();
    const storeAlert = useAlertStore();
    const fetchDataTable = async () => {
        setLoading(true);
        try {
            let result = await fetch("https://fakestoreapi.com/products");
            let json: ProductModel[] = await result.json();
            setData(json);
        } catch (error: any) {
            storeAlert.onShow(error.message);
        } finally {
            setLoading(false);
        }
    }
    useEffectHook(() => {
        fetchDataTable();
    });

    return (
        <>
            <StoreModal
                title='Product Create'
                children={<ProductForm initialState={storeModal.data!} />}
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
            <Button onClick={() => fetchDataTable()}>
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
