import Heading from '@/components/ui/heading'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'Order History',
  description: '...',
}
type Props = {}

const HistoryPage = (props: Props) => {
  return (
    <div>
      <Heading title={'HistoryPage'} description={'This will display the HistoryPage page'} />
    </div>
  )
}

export default HistoryPage