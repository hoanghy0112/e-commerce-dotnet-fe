/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import { API_URLS } from '@/config/api-urls';

interface Product {
  id: string;
  name: string;
  price: number;
  discount_price?: number;
  images: string[];
  colors: string[];
  storage: string[];
  specifications: string[];
  description: string;
}

const ProductDetail = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(API_URLS.product.productDetail(productId));
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error('Failed to fetch product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <nav className="text-sm text-gray-500 mb-4">
        <a href="#" className="hover:underline">Home</a> &gt; 
        <a href="#" className="hover:underline">Phones</a> &gt; 
        <a href="#" className="hover:underline">iPhone 15 Series</a> &gt; 
        <span>{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-auto"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <div className="text-2xl text-red-500 font-bold mb-2">
            {product.price.toLocaleString()}₫
          </div>

          {product.discount_price && (
            <span className="line-through text-gray-400 text-lg ml-2">
              {product.discount_price.toLocaleString()}₫
            </span>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Choose Option</label>
            <div className="flex space-x-2">
              {product.storage.map((option) => (
                <button 
                  key={option} 
                  className="px-4 py-2 border border-gray-300 rounded"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Choose Color</label>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
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

          <button className="w-full bg-black text-white py-2 rounded mt-4">Add to cart</button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Specifications</h2>
        <ul className="list-disc pl-5">
          {product.specifications.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;

