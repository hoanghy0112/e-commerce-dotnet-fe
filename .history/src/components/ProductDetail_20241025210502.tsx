/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URLS } from '../../cs';

const ProductDetail = () => {
  const [product, setProduct] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const productId = '1'; // Thay bằng ID sản phẩm thực tế hoặc lấy từ URL nếu cần
    axios.get(API_URLS.product.productDetail(productId))
      .then((response) => {
        setProduct(response.data);
        setSelectedOption(response.data.storage[0]);
        setSelectedColor(response.data.colors[0]);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, []);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (action: string) => {
    if (action === 'increase') {
      setQuantity(quantity + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-4">
        <a href="#" className="hover:underline">Home</a> &gt; 
        <a href="#" className="hover:underline">Phones</a> &gt; 
        <a href="#" className="hover:underline">{product.name}</a>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <img src={product.images[0]} alt={product.name} className="w-full h-auto" />
        </div>

        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <div className="text-2xl text-red-500 font-bold mb-2">{product.price}đ</div>
          <div className="line-through text-gray-400 text-lg ml-2">{product.discount_price}đ</div>
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
                  onClick={() => handleOptionChange(option)}
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
              {product.colors.map((color: string) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
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
            <button onClick={() => handleQuantityChange('decrease')} className="px-2 py-1 border rounded-l">-</button>
            <span className="px-4 py-1 border-t border-b">{quantity}</span>
            <button onClick={() => handleQuantityChange('increase')} className="px-2 py-1 border rounded-r">+</button>
          </div>

          {/* Add to Cart */}
          <button className="w-full bg-black text-white py-2 rounded mt-4">Add to cart</button>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(product => (
            <div key={product} className="border p-4 rounded">
              <img src={`/assets/similar-product-${product}.jpg`} alt="Product" className="w-full h-auto mb-2" />
              <h3 className="text-lg font-semibold">iPhone 15 Plus 64GB</h3>
              <p className="text-red-500 font-bold">22.000.000đ</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
