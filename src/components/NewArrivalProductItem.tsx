"use client";

import Image from "next/image";
import DISCOUNT_TAG from "@/assets/icons/discount-tag.svg";
import { currencyFormatter } from "@/utils/formatter";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import PrimaryButton from "./PrimaryButton";
import { toast } from "react-toastify";
import CART_ICON from "@/assets/icons/cart-white.svg";
import StarRating from "./StarRating";
import AddToCartAPI from "@/services/api/addToCart";
type Props = React.ComponentPropsWithoutRef<"div"> & {
  product: IProduct;
};

export default function NewArrivalProductItem({ product, className }: Props) {
  const priceOffPercent = (
    (1 - product.discount_price / product.price) *
    100
  ).toFixed(0);
  const notify = () => toast.success("Product added to cart!");
  return (
    <div
      className={twMerge(
        "w-full flex gap-4 items-start p-4 bg-gray-100 rounded-lg shadow-md relative duration-200",
        className
      )}
    >
      {/* Left: Product Image */}
      <div className="relative w-[140px] h-[200px] bg-white rounded overflow-hidden flex items-center justify-center p-4">
        <Image
          src={product.image}
          width={140}
          height={160}
          className="object-contain"
          alt="product preview"
        />
        {priceOffPercent !== "0" && priceOffPercent !== "100" && (
          <>
            <Image
              className="absolute -left-2 top-0"
              src={DISCOUNT_TAG}
              width={40}
              height={20}
              alt="discount tag"
            />
            <p className="absolute top-[0.2rem] left-2 text-white text-[0.6rem]">
              {priceOffPercent}% Off
            </p>
          </>
        )}
      </div>

      {/* Right: Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Product Name */}
        <Link href={`/product/${product.id}`}>
          <p className="text-lg text-black-500 font-medium hover:underline">
            {product.name}
          </p>
        </Link>

        {/* Rating */}
        <div className="flex items-center text-gray-400 text-sm mt-2">
          <StarRating rating={product.rating} />
        </div>

        {/* Price Section */}
        <div className="mt-2">
          {product.discount_price !== null && product.discount_price !== 0 ? (
            <>
              <div className="flex items-baseline gap-2">
                <p className="text-black-500 font-medium text-lg">
                  {currencyFormatter.format(product.discount_price)}
                </p>
                <p className="line-through text-gray-400 text-sm">
                  {currencyFormatter.format(product.price)}
                </p>
              </div>
            </>
          ) : (
            <p className="text-black-500 font-medium text-lg">
              {currencyFormatter.format(product.price)}
            </p>
          )}
        </div>

        {/* Add to Cart Button */}
        <PrimaryButton
          className="mt-4 w-[140px] h-[40px] flex items-center justify-center gap-2"
          onClick={() => {
            AddToCartAPI(product.id.toString(), 1);
            notify();
          }}
        >
          Add to cart{" "}
          <Image src={CART_ICON} alt="cart" width={16} height={16} />
        </PrimaryButton>
      </div>
    </div>
  );
}
