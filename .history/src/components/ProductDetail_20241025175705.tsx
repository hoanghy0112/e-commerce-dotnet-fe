/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import { fetchProductDetails } from '../services/api/product/fetchProduct';

const ProductDetail = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const getProductDetails = async () => {
      const data = await fetchProductDetails(productId);
      if (data) {
        setProduct(data);
      }
    };

    getProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-4">
        <a href="#" className="hover:underline">Home</a> &gt; 
        <a href="#" className="hover:underline">Phones</a> &gt; 
        <a href="#" className="hover:underline">iPhone 15 Series</a> &gt; 
        <span>{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-auto"
          />
        </div>

        {/* Product Information */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <div className="text-2xl text-red-500 font-bold mb-2">
            {product.price}₫ 
            {product.discount_price && (
              <span className="line-through text-gray-400 text-lg ml-2">{product.discount_price}₫</span>
            )}
          </div>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400">★★★★★</span>
            <span className="ml-2 text-gray-600">(100 reviews)</span>
          </div>

          {/* Choose Option */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Choose Option</label>
            <div className="flex space-x-2">
              {product.storage.map((option: string) => (
                <button
                  key={option}
                  className="px-4 py-2 border border-gray-300 rounded"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Choose Color */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Choose Color</label>
            <div className="flex space-x-2">
              {product.colors.map((color: string) => (
                <button
                  key={color}
                  className="px-4 py-2 border border-gray-300 rounded"
                  style={{ backgroundColor: color.toLowerCase() }}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button className="w-full bg-black text-white py-2 rounded mt-4">Add to cart</button>
        </div>
      </div>

      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
        <ul className="list-disc pl-5">
          {product.specifications.map((spec: string) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
      </div>

      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
