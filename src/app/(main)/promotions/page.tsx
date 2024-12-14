"use client";

import React, { useEffect, useState } from "react";
import ProductItem from "@/components/ProductItem";
import { getHomePromotions } from "@/services/api/product/getHomePromotions";
type Promotion = {
  id: number;
  name: string;
  image: string;
  discountPercentage: number;
  validUntil: string;
  products: {
    id: number;
    name: string;
    image: string;
    price: number;
    discount_price: number;
    rating: number;
  }[];
};

const samplePromotions: Promotion[] = [
  {
    id: 1,
    name: "Summer Sale",
    image:
      "https://res.cloudinary.com/de0lj9ydr/image/upload/v1733734530/phones-revised/samsung1.png",
    discountPercentage: 30,
    validUntil: "2022-07-31",
    products: [
      {
        id: 1,
        name: "Product 1",
        image:
          "https://res.cloudinary.com/de0lj9ydr/image/upload/v1733734530/phones-revised/samsung1.png",
        price: 100,
        discount_price: 70,
        rating: 4.5,
      },
      {
        id: 2,
        name: "Product 2",
        image:
          "https://res.cloudinary.com/de0lj9ydr/image/upload/v1733734530/phones-revised/samsung1.png",
        price: 200,
        discount_price: 140,
        rating: 4.0,
      },
      {
        id: 3,
        name: "Product 3",
        image:
          "https://res.cloudinary.com/de0lj9ydr/image/upload/v1733734530/phones-revised/samsung1.png0",
        price: 150,
        discount_price: 105,
        rating: 3.5,
      },
      {
        id: 3,
        name: "Product 3",
        image:
          "https://res.cloudinary.com/de0lj9ydr/image/upload/v1733734530/phones-revised/samsung1.png0",
        price: 150,
        discount_price: 105,
        rating: 3.5,
      },
      {
        id: 3,
        name: "Product 3",
        image:
          "https://res.cloudinary.com/de0lj9ydr/image/upload/v1733734530/phones-revised/samsung1.png0",
        price: 150,
        discount_price: 105,
        rating: 3.5,
      },
    ],
  },
  {
    id: 2,
    name: "Winter Sale",
    image:
      "https://res.cloudinary.com/de0lj9ydr/image/upload/v1733734530/phones-revised/samsung1.png",
    discountPercentage: 20,
    validUntil: "2022-01-31",
    products: [
      {
        id: 4,
        name: "Product 4",
        image:
          "https://res.cloudinary.com/de0lj9ydr/image/upload/v1733734530/phones-revised/samsung1.png",
        price: 80,
        discount_price: 64,
        rating: 4.0,
      },
      {
        id: 5,
        name: "Product 5",
        image:
          "https://res.cloudinary.com/de0lj9ydr/image/upload/v1733734530/phones-revised/samsung1.png",
        price: 120,
        discount_price: 96,
        rating: 3.5,
      },
      {
        id: 6,
        name: "Product 6",
        image:
          "https://res.cloudinary.com/de0lj9ydr/image/upload/v1733734530/phones-revised/samsung1.png",
        price: 150,
        discount_price: 120,
        rating: 4.5,
      },
    ],
  },
];
export default function PromotionsSection() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const data = await getHomePromotions();
        setPromotions(data);
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
        setPromotions(samplePromotions);
      }
    };
    fetchPromotions();
  }, []);

  return (
    <div className="promotions-section px-6 py-8 lg:px-12">
      {promotions.map((promotion) => (
        <div
          key={promotion.id}
          className="promotion-item mb-12 bg-white shadow rounded-lg p-4"
        >
          {/* Promotion Banner */}
          <div className="promotion-banner relative mb-6 rounded-lg overflow-hidden">
            <img
              src={promotion.image}
              alt={promotion.name}
              className="w-full h-[200px] object-cover"
            />
            <div className="absolute bottom-3 left-4 text-white">
              <h2 className="text-2xl font-semibold">{promotion.name}</h2>
              <p className="text-sm">
                {promotion.discountPercentage}% off until{" "}
                {new Date(promotion.validUntil).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Associated Products. Maximum 6 items per row*/}
          <div className="products-grid grid grid-cols-6  gap-6">
            {promotion.products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
