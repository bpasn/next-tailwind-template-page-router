import DataTable from '@/components/data-table'
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/router'
import React from 'react'
import columns from './product-column'

type Props = {}

const ProductClient = (props: Props) => {
    const router = useRouter();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Products(${0})`}
                    description='Product info'
                />
                <Button onClick={() => router.push(`/admin/sub-categories/new`)}>
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
    )
}

export default ProductClient