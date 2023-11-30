'use client';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import columns from './product-column';

const ProductClient = () => {
    const router = useRouter();
    return (
        <>
            <div className="grid grid-cols-2 md:flex flex-1 items-center justify-between">
                <div className='col-span-2 mt-2 gap-2 md:gap-0'>
                <Heading
                    title={`Products(${0})`}
                    description='Product info'
                />
                </div>
                <Button className="w-auto" onClick={() => router.push(`/admin/sub-categories/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            {/* <Separator /> */}
            <DataTable
                setDataTable={() => { }}
                columns={columns}
                loading={false}
                dataTable={{
                    data: [],
                    count: 0,
                    page: 0,
                    pageSize: 10
                }}
            />
        </>
    );
};

export default ProductClient;