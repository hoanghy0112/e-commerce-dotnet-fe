/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, useEffect } from "react";

import { getProductDetailAPI } from "@/services/api/product/product-detail";

interface ProductDetailProps {
  productId: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetchProductDetail(productId);
  }, [productId]);

  const fetchProductDetail = async (productId: string) => {
    const data = await getProductDetailAPI(productId);
    if (data) setProduct(data);
  };

 

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  // Hàm tăng/giảm số lượng
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (!product) return <p>Loading...</p>;


  return (
    <div className="container mx-auto px-4 py-6">
      <nav className="text-sm text-gray-500 mb-4">
        Home {'>'} Iphone {'>'} Iphone 15 Series {'>'} {product.name}
      </nav>
      <div className="flex flex-wrap md:flex-nowrap md:space-x-6">
          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            {/* Product Price */}
            <div className="flex items-baseline space-x-2 mb-2">
              <p className="text-4xl font-bold text-black">
                {product.price.toLocaleString()} đ
              </p>
              <p className="line-through text-gray-500 text-lg">
                {product.discount_price.toLocaleString()} đ
              </p>
            </div>

            {/* Star Rating */}
            <div className="flex space-x-1 mb-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 2l3 7h7l-5.6 4.4 2.4 7L12 16l-5.8 4 2.4-7L3 9h7l3-7z"
                    />
                  </svg>
                ))}
            </div>

            {/* Choose Option */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Choose Option</h2>
            <div className="flex gap-2">
            {product.storage.map((option: string) => (
            <button
              key={option}
              className={`border px-4 py-2 rounded-lg ${
                selectedOption === option ? 'border-black bg-gray-100' : 'bg-white hover:bg-gray-200'
              } focus:outline-none`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </button>
          ))}
            </div>
          </div>

          {/* Choose Color */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Choose Color</h2>
            <div className="flex gap-2">
            {product.colors.map((color: string) => (
            <button
              key={color}
              className={`flex items-center gap-2 border px-4 py-2 rounded-lg ${
                selectedColor === color ? 'border-black bg-gray-100' : 'bg-white hover:bg-gray-200'
              } focus:outline-none`}
              onClick={() => setSelectedColor(color)}
            >
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></span>
              {color}
            </button>
          ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center mt-6 space-x-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>

                {/* Add to Cart Button */}
                <button className="bg-black text-white px-6 py-2 rounded-lg flex items-center justify-center w-full md:w-auto hover:bg-gray-700">
                  Add to cart <span className="ml-2">🛒</span>
                </button>
              </div>
            </div>
        </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <div className="bg-gray-200 py-2 rounded-t-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center">
              Product Details
            </h2>
          </div>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="flex justify-center mt-auto">
            <button className="flex items-center gap-2 border-2 border-gray-800 px-10 py-2 rounded-full bg-white hover:bg-gray-800 hover:text-white text-gray-800 mt-4 font-medium transition-colors duration-200">
              <span>View detailed</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6 rounded-lg shadow-md border border-gray-300">
        <div className="bg-gray-200 py-2 rounded-t-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center">
              Product Details
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-y-3">
            {product.specifications.map((spec:string, index: number) => (
              <div key={index} className="flex">
                <span className="font-semibold text-gray-800 w-1/3">
                  {spec.split(":")[0]}
                </span>
                <span className="text-gray-700 w-2/3">{spec.split(":")[1]}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button className="flex items-center border-2 border-gray-800 gap-2 px-10 py-2 rounded-full bg-white hover:bg-gray-800 hover:text-white text-gray-800 transition-colors duration-200 font-medium">
              <span>View detailed</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

  
      </div>


      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Similar Products</h2>
        
      </div>
    </div>
  );
}