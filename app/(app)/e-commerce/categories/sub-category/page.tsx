import StoreModal from '@/components/modal/storeModel'
import { Metadata } from 'next'
import React from 'react'
import SubCategoryForm from './components/subCategoryForm'
import SubCategoryClient from './components/subCategoryClient'
export const metadata: Metadata = {
  title: 'Sub Category',
  description: '...',
}
type Props = {}

const SubCategoryPage = (props: Props) => {
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-0 md:p-8 pt-6">
        <StoreModal
          title={'Create category'}
          children={<SubCategoryForm />}
          className='w-full max-w-[500px]'
        />
        <SubCategoryClient />
      </div>
    </div>
  )
}

export default SubCategoryPage