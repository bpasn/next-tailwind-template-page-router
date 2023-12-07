import React from 'react'
import ProductForm from '../component/ProductForm';

const ProductPageWithId = async ({
    params: {
        productId
    }
}: {
    params: {
        productId: string
    }
}) => {
    const result = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await result.json();
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm initialState={data as ProductModel} />
            </div>
        </div>
    )
}

export default ProductPageWithId