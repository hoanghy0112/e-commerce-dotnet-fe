import { API_URLS } from "@/config/api-urls";
import axios from "axios";

const DEFAULT_PRODUCT_LIST_API_OPTIONS: ProductListAPIOptions = {
	category: undefined,
	keyword: undefined,
	price_min: 0,
	price_max: undefined,
	color: undefined,
	storage: undefined,
	sort: undefined,
	page: undefined,
	limit: 20,
};

export async function getProductListAPI(
	options: ProductListAPIOptions = DEFAULT_PRODUCT_LIST_API_OPTIONS
): Promise<ProductListAPIResponse> {
	const response = await axios.get(`${API_URLS.product.getProductList}`, {
		params: options,
	});

	return response.data;
}
