import type { Metadata } from 'next';
import { ProductClient } from './component/ProductClient';
import { delay } from '@/hook/useStoreDataTable';
export const metadata: Metadata = {
  title: 'Product',
};
const Product = async () => {
  await delay(2 * 1000)
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-0 md:p-8 pt-6">
        <ProductClient />
      </div>
    </div>
  );
};

export default Product;