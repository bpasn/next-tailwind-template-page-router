import DataTable, { IDataTable } from '@/components/data-table'
import Heading from '@/components/ui/heading'
import React from 'react'
import columns, { ProductColumn } from './product-column'
import ProductClient from './product-client'

type Props = {}

const ProductPages = (props: Props) => {
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient />
      </div>
    </div>
  )
}

export default ProductPages