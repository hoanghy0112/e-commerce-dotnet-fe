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
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="flex flex-wrap md:flex-nowrap md:space-x-6">
        <div className="w-full md:w-1/2">
          <img src={product.images[0]} alt={product.name} className="w-full h-auto" />
        </div>

        <div className="w-full md:w-1/2 px-4">
          <p className="text-2xl font-semibold mb-2">{product.price.toLocaleString()} đ</p>
          <p className="line-through text-gray-500">{product.discount_price.toLocaleString()} đ</p>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Choose Option</h2>
            <div className="flex gap-2">
              {product.storage.map((option: string) => (
                <button key={option} className="border px-3 py-1 rounded-lg">{option}</button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Choose Color</h2>
            <div className="flex gap-2">
              {product.colors.map((color: string) => (
                <button key={color} className="border px-3 py-1 rounded-lg">{color}</button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-black text-white px-6 py-2 rounded-lg w-full md:w-auto">Add to cart</button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p>{product.description}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(product.specifications).map((spec) => (
            <div key={spec} className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold">{spec}</h3>
              <p>{product.specifications[spec]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
        
      </div>
    </div>
  );
}