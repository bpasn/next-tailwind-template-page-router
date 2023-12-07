import { Metadata } from 'next'
import React from 'react'
import BrandClient from './components/BrandClient'
export const metadata: Metadata = {
  title: 'Brand',
  description: '...',
}

const BrandPage = async () => {
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-0 md:p-8 pt-6">
        <BrandClient />
      </div>
    </div>
  )
}

export default BrandPage