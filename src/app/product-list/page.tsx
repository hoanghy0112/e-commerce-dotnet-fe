import ProductItem from "@/components/ProductItem";
import { getProductListAPI } from "@/services/api/product/product-list";

export default async function Page() {
	const productResponse = await getProductListAPI();
	const productList = productResponse.products;

	return (
		<div className=" px-24 pt-10">
			<div className=" grid grid-cols-6 gap-5">
				{productList.map((product) => (
					<ProductItem key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
