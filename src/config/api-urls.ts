import { API_BASE_URL } from "./environment";

export const API_URLS = {
	product: {
		getProductList: `${API_BASE_URL}/products`,
	},
	auth: {
		register: `${API_BASE_URL}/register`,
		signin: `${API_BASE_URL}/auth/login`,
	},
};
