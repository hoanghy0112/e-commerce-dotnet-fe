import { CheckBox, CheckBoxGroup } from "@/components/CheckBox";
import ProductItem from "@/components/ProductItem";
import { getProductListAPI } from "@/services/api/product/product-list";

export default async function Page() {
	const productResponse = await getProductListAPI();
	const productList = productResponse.products;

	return (
		<div className=" px-24 pt-10">
			<div>
				<CheckBoxGroup className=" flex gap-5">
					<CheckBox title="Price: Low to High" name="price-low-to-high" />
					<CheckBox title="Price: High to Low" name="price-high-to-low" />
				</CheckBoxGroup>
			</div>
			<div className=" mt-10 grid grid-cols-6 gap-5">
				{productList.map((product) => (
					<ProductItem key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
