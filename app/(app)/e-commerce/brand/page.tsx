import Heading from '@/components/ui/heading'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'Brand',
  description: '...',
}
type Props = {}

const BrandPage = (props: Props) => {
  return (
    <div>
      <Heading title={'BrandPage'} description={'This will display the BrandPage page'} />
    </div>
  )
}

export default BrandPage