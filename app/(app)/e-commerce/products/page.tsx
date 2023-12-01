import { Metadata } from 'next';
import ProductClient from './component/product-client';
export const metadata: Metadata = {
  title: 'Product',
  description: '...',
}
const Product = async () => {
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-0 md:p-8 pt-6">
        <ProductClient />
      </div>
    </div>
  );
};

export default Product;