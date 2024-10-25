import { API_BASE_URL } from "./environment";

export const API_URLS = {
	product: {
		getProductList: `${API_BASE_URL}/products`,
		productDetail: (id: string) => `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`,
	},
};
