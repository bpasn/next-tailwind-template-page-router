import { Metadata } from 'next'
import React from 'react'
import CategoryClient from './components/categoryClient'
import { ModalProvider } from '@/provider/modal-provider'
import CategoryForm from './components/categoryForm'
export const metadata: Metadata = {
  title: 'Categories',
  description: '...',
}
const CategoryPage = () => {
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-0 md:p-8 pt-6">
        <ModalProvider title={'Create category'} children={<CategoryForm />} className='w-[500px]'/>
        <CategoryClient />
      </div>
    </div>
  )
}

export default CategoryPage