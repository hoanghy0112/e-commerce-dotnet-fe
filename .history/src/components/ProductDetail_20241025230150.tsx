/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getProductDetailAPI } from "@/services/api/product/product-detail"

export default function ProductDetail() {
  const [product, setProduct] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchProductDetail(id as string);
    }
  }, [id]);

  const fetchProductDetail = async (productId: string) => {
    const data = await getProductDetailAPI(productId);
    if (data) setProduct(data);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="flex flex-wrap -mx-4">
        {/* Image Section */}
        <div className="w-full md:w-1/2 px-4">
          <img src={product.images[0]} alt={product.name} className="w-full h-auto"/>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 px-4">
          <p className="text-2xl font-semibold mb-2">{product.price.toLocaleString()} đ</p>
          <p className="line-through text-gray-500">{product.discount_price.toLocaleString()} đ</p>

          {/* Storage Options */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Choose Option</h2>
            <div className="flex gap-2">
              {product.storage.map((option: string) => (
                <button key={option} className="border px-3 py-1">{option}</button>
              ))}
            </div>
          </div>

          {/* Color Options */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Choose Color</h2>
            <div className="flex gap-2">
              {product.colors.map((color: string) => (
                <button key={color} className="border px-3 py-1">{color}</button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-6">
            <button className="bg-black text-white px-6 py-2">Add to cart</button>
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
        <ul>
          {product.specifications.map((spec: string, index: number) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
