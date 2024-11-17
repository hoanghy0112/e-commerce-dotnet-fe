import { API_BASE_URL } from "./environment";

export const API_URLS = {
	product: {
		getProductList: `${API_BASE_URL}/products`,
		getTodayBestDeal: `${API_BASE_URL}/products/deals`,
		getNewArrivals: `${API_BASE_URL}/products/new-arrivals`,
		getBestSeller: `${API_BASE_URL}/products/bestsellers`,
	},
	auth: {
		register: `${API_BASE_URL}/register`,
		signin: `${API_BASE_URL}/auth/login`,
	},
};
