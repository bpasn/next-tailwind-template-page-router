import Heading from '@/components/ui/heading'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'Order',
  description: '...',
}
type Props = {}

const OrdersPage = (props: Props) => {
  return (
    <div>
      <Heading title={'OrderPage'} description={'This will display the OrderPage page'} />
    </div>
  )
}

export default OrdersPage