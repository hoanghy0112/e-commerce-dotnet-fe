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

  if (!product) return <p>Loading...</p>;


  return (
    <div className="container mx-auto px-4 py-6">
      <nav className="text-sm text-gray-500 mb-4">
        Home {'>'} Iphone {'>'} Iphone 15 Series {'>'} {product.name}
      </nav>
      <div className="flex flex-wrap md:flex-nowrap md:space-x-6">
        <div className="w-full md:w-1/2">
          <img src={product.images[0]} alt={product.name} className="w-full h-auto rounded-lg shadow-md border border-gray-300" />
        </div>

        <div className="w-full md:w-1/2 px-4">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{product.name}</h1>
          <p className="text-3xl font-semibold text-red-600 mb-2">{product.price.toLocaleString()} đ</p>
          <p className="line-through text-gray-500 mb-4">{product.discount_price.toLocaleString()} đ</p>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Choose Option</h2>
            <div className="flex gap-2">
              {product.storage.map((option: string) => (
                <button key={option} className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 hover:bg-gray-200">{option}</button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Choose Color</h2>
            <div className="flex gap-2">
              {product.colors.map((color: string) => (
                <button key={color} className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 hover:bg-gray-200">{color}</button>
              ))}
            </div>
          </div>

          <div className="flex items-center mt-6">
            <button className="border px-4 py-2 bg-gray-100 hover:bg-gray-200">-</button>
            <span className="px-4">1</span>
            <button className="border px-4 py-2 bg-gray-100 hover:bg-gray-200">+</button>
            <button className="bg-blue-600 text-white px-6 py-2 ml-4 rounded-lg w-full md:w-auto flex items-center justify-center hover:bg-blue-700">
              Add to cart <span className="ml-2">🛒</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Product Details</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <button className="border px-4 py-2 rounded-lg bg-white hover:bg-gray-200">View detailed</button>
        </div>

        <div className="p-6 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-2xl font-bold mb-4 bg-gray-200  text-gray-800">Specifications</h2>
          <div className="grid grid-cols gap-x-4 gap-y-2">
            {product.specifications.map((spec: string, index: number) => (
              <div key={index} className="flex">
                <span className="font-semibold text-gray-800 w-1/3">{spec.split(":")[0]}</span>
                <span className="text-gray-700 w-2/3">{spec.split(":")[1]}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 border px-6 py-3 rounded-lg bg-white hover:bg-black-600 text-black text-sm font-medium">View detailed</button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Similar Products</h2>
        
      </div>
    </div>
  );
}