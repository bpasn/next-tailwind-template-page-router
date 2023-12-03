import type { Metadata } from 'next';
import React from 'react';
import CategoryClient from './components/categoryClient';
import CategoryForm from './components/categoryForm';
import StoreModal from '@/components/modal/storeModel';
export const metadata: Metadata = {
  title: 'Categories',
  description: '...',
};
const CategoryPage = () => {
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-0 md:p-8 pt-6">
        <StoreModal
          title={'Create category'}
          component={<CategoryForm/>}
          className='w-[500px]'
        />
        <CategoryClient />
      </div>
    </div>
  );
};

export default CategoryPage;