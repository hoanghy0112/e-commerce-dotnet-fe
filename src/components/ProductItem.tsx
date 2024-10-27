import Image from "next/image";

import DISCOUNT_TAG from "@/assets/icons/discount-tag.svg";
import { currencyFormatter } from "@/utils/formatter";

type Props = {
	product: IProduct;
};

export default function ProductItem({ product }: Props) {
	const priceOffPercent = (
		(1 - product.discount_price / product.price) *
		100
	).toFixed(0);

	return (
		<div className=" w-[185px] relative duration-200">
			<Image
				src={product.image}
				width={185}
				height={200}
				objectFit="cover"
				alt="product preview"
			/>
			<Image
				className=" absolute -left-1 top-0"
				src={DISCOUNT_TAG}
				width={50}
				height={25}
				alt="discount tag"
			/>
			<p className=" absolute top-[0.1rem] left-1 text-white text-[0.6rem]">
				{priceOffPercent}% Off
			</p>
			<div className=" pt-2 flex flex-col gap-4">
				<p className=" text-lg text-black-300"> {product.name} </p>
				<div>
					<div className=" flex gap-2">
						<p className=" line-through text-sm text-black-200">
							{currencyFormatter.format(product.discount_price)}{" "}
						</p>
						<p className=" text-sm text-danger">-{priceOffPercent}%</p>
					</div>
					<p className=" text-black-500 font-medium text-lg">
						{currencyFormatter.format(product.price)}
					</p>
				</div>
			</div>
		</div>
	);
}
