import Image from "next/image";
import DISCOUNT_TAG from "@/assets/icons/discount-tag.svg";
import { currencyFormatter } from "@/utils/formatter";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import StarRating from "./StarRating";

type Props = React.ComponentPropsWithoutRef<"div"> & {
  product: IProduct;
};

export default function ProductItem({ product, className }: Props) {
  const priceOffPercent = (
    (1 - product.discount_price / product.price) *
    100
  ).toFixed(0);

  return (
    <div
      className={twMerge(
        "w-[185px] relative duration-200 flex flex-col items-center",
        className
      )}
    >
      <div className="relative w-[180px] h-[240px] overflow-hidden bg-gray-200 flex items-center justify-center p-8 rounded">
        <Image
          src={product.image}
          width={180}
          height={240}
          className="object-contain"
          alt="product preview"
        />
        {product.discount_price !== null && product.discount_price !== 0 && (
          <>
            <Image
              className="absolute -left-1 top-0"
              src={DISCOUNT_TAG}
              width={60}
              height={30}
              alt="discount tag"
            />
            <p className="absolute top-[0.1rem] left-1 text-white text-[0.6rem]">
              {priceOffPercent}% Off
            </p>
          </>
        )}
      </div>

      <div className="pt-2 w-full flex flex-col gap-2">
        <Link href={`/product/${product.id}`}>
          <p className="mt-2 text-lg text-black-300 hover:underline truncate text-center">
            {product.name}
          </p>
        </Link>

        {/* Star Rating */}
        <div className="flex justify-center">
          <StarRating rating={product.rating} />
        </div>

        {/* Price Section */}
        <div className="text-center">
          {product.discount_price !== null && product.discount_price !== 0 ? (
            <>
              <div className="flex justify-center gap-2 text-sm text-black-200">
                <p className="line-through">
                  {currencyFormatter.format(product.price)}
                </p>
                <p className="text-danger">-{priceOffPercent}%</p>
              </div>
              <p className="text-black-500 font-medium text-lg">
                {currencyFormatter.format(product.discount_price)}
              </p>
            </>
          ) : (
            <p className="text-black-500 font-medium text-lg">
              {currencyFormatter.format(product.price)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
