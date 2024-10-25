/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"
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
    // Gọi API để lấy dữ liệu chi tiết sản phẩm
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
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-4">
        <a href="/product-lis" className="hover:underline">Home</a> &gt;
        <a href="/products" className="hover:underline">Products</a> &gt;
        <span>{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <img src={product.images[0]} alt={product.name} className="w-full h-auto" />
        </div>

        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <div className="text-2xl text-red-500 font-bold mb-2">{product.price}đ</div>
          <div className="line-through text-gray-400 text-lg">{product.discount_price}đ</div>

          {/* Choose Storage */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Choose Storage</label>
            <div className="flex space-x-2">
              {product.storage.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  className={`px-4 py-2 border ${selectedOption === option ? 'border-black' : 'border-gray-300'} rounded`}
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
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border ${selectedColor === color ? 'border-black' : 'border-gray-300'} rounded`}
                  style={{ backgroundColor: color.toLowerCase() }}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center mb-4">
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="px-2 py-1 border rounded-l">-</button>
            <span className="px-4 py-1 border-t border-b">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-2 py-1 border rounded-r">+</button>
          </div>

          {/* Add to Cart */}
          <button className="w-full bg-black text-white py-2 rounded mt-4">Add to Cart</button>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Specifications</h2>
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

