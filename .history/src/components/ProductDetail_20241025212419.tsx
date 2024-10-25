/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URLS } from '@/config/api-urls';

interface Product {
  id: string;
  name: string;
  price: string;
  discount_price: string;
  images: string[];
  colors: string[];
  storage: string[];
  specifications: any;
}

const ProductDetail = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(API_URLS.product.productDetail(productId))
      .then((response) => {
        const data = response.data;
        setProduct(data);
        setSelectedOption(data.storage[0]);
        setSelectedColor(data.colors[0]);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold">{product.name}</h1>
      <div className="text-2xl font-bold text-red-500">{product.price}đ</div>
      <div className="line-through text-gray-400">{product.discount_price}đ</div>

      <div className="flex mt-4">
        <img src={product.images[0]} alt={product.name} className="w-1/2 h-auto" />
        <div className="ml-4">
          <div>
            <h2 className="font-medium">Choose Storage</h2>
            <div className="flex space-x-2 mt-2">
              {product.storage.map((option) => (
                <button
                  key={option}
                  className={`px-4 py-2 border rounded ${selectedOption === option ? 'border-black' : 'border-gray-300'}`}
                  onClick={() => setSelectedOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="font-medium">Choose Color</h2>
            <div className="flex space-x-2 mt-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`px-4 py-2 border rounded ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="px-2 py-1 border rounded-l"
            >
              -
            </button>
            <div className="px-4 py-1 border-t border-b">{quantity}</div>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="px-2 py-1 border rounded-r"
            >
              +
            </button>
          </div>

          <button className="w-full mt-4 bg-black text-white py-2 rounded">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Specifications</h2>
        <ul className="list-disc ml-6">
          {Object.entries(product.specifications).map(([key, value]) => (
            <li key={key}>{`${key}: ${value}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;
