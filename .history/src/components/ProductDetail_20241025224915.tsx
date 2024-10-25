/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: string;
  discount_price: string;
  images: string[];
  colors: string[];
  storage: string[];
  specifications: Record<string, string>;
  description: string;
}

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    if (productId) {
      // Gọi API để lấy dữ liệu sản phẩm
      axios.get(`/api/product/${productId}`)
        .then(response => setProduct(response.data))
        .catch(error => console.error('Error fetching product details:', error));
    }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm mb-4">
        Home &gt; iPhone &gt; iPhone 15 Series &gt; {product.name}
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="flex-1">
          <img src={product.images[0]} alt={product.name} className="w-full h-auto rounded-lg" />
        </div>

        {/* Product Details */}
        <div className="flex-1 md:pl-8">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-2xl text-red-500 font-semibold">{product.price}</div>
          <div className="text-gray-500 line-through">{product.discount_price}</div>

          {/* Storage Options */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Choose Option</h2>
            <div className="flex space-x-2 mt-2">
              {product.storage.map((option) => (
                <button key={option} className="border px-4 py-2 rounded-lg">
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Color Options */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Choose Color</h2>
            <div className="flex space-x-2 mt-2">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-6 flex items-center space-x-4">
            <button className="bg-black text-white px-6 py-2 rounded-lg">Add to cart</button>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <p>{product.description}</p>
      </div>

      {/* Specifications */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Specifications</h2>
        <table className="w-full text-left">
          <tbody>
            {Object.keys(product.specifications).map((key) => (
              <tr key={key} className="border-b">
                <th className="px-4 py-2 font-medium">{key}</th>
                <td className="px-4 py-2">{product.specifications[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;
