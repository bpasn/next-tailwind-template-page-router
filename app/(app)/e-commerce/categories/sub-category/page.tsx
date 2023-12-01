import Heading from '@/components/ui/heading'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'Sub Category',
  description: '...',
}
type Props = {}

const SubCategoryPage = (props: Props) => {
  return (
    <div>
      <Heading title={'SubCategory'} description={'This will display the SubCategory page'} />
    </div>
  )
}

export default SubCategoryPage