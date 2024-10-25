import { API_BASE_URL } from "./environment";

export const API_URLS = {
	product: {
		getProductList: `${API_BASE_URL}/products`,
		productDetail: (id: string) => `/api/product/${id}`,
	},
};
