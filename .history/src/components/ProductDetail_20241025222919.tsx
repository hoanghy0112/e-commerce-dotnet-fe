import React, { useEffect, useState } from 'react';
import { fetchProductDetails } from '../../services/api/product/product-list';

interface ProductDetailProps {
  productId: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const loadProductDetails = async () => {
      const productData = await fetchProductDetails(productId);
      setProduct(productData);
    };
    
    loadProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="breadcrumb">Home > iPhone > iPhone 15 Series > iPhone 15 Plus</div>
      
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <div className="flex">
        {/* Image slider */}
        <div className="w-1/2">
          <img src={product.images[0]} alt={product.name} className="w-full" />
        </div>
        
        {/* Product details */}
        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-semibold">
            {product.price}₫ <span className="line-through text-gray-500">{product.discount_price}₫</span>
          </h2>
          
          {/* Choose Option */}
          <div className="mt-4">
            <label className="font-semibold">Choose Option</label>
            <div className="flex space-x-2 mt-2">
              {product.storage.map((option: string) => (
                <button key={option} className="border px-4 py-2">{option}</button>
              ))}
            </div>
          </div>
          
          {/* Choose Color */}
          <div className="mt-4">
            <label className="font-semibold">Choose Color</label>
            <div className="flex space-x-2 mt-2">
              {product.colors.map((color: string) => (
                <div key={color} className="border rounded-full w-8 h-8" style={{ backgroundColor: color }}></div>
              ))}
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <button className="mt-4 bg-black text-white px-4 py-2">Add to cart</button>
        </div>
      </div>

      {/* Product Description and Specifications */}
      <div className="mt-8">
        <h3 className="text-lg font-bold">Product Details</h3>
        <p>{product.description}</p>
        
        <h3 className="text-lg font-bold mt-4">Specifications</h3>
        <ul>
          {Object.keys(product.specifications).map((key) => (
            <li key={key}>
              <strong>{key}</strong>: {product.specifications[key]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;
