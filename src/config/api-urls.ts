import { API_BASE_URL } from "./environment";

export const API_URLS = {
  product: {
    getProductList: `${API_BASE_URL}/products`,
    getTodayBestDeal: `${API_BASE_URL}/products/deals`,
    getNewArrivals: `${API_BASE_URL}/products/new-arrivals`,
    getBestSeller: `${API_BASE_URL}/products/bestsellers`,
    getCategories: `${API_BASE_URL}/products/categories`,
    getAdminProducts: `${API_BASE_URL}/products/admin-get`,
  },
  auth: {
    register: `${API_BASE_URL}/register`,
    signin: `${API_BASE_URL}/auth/login`,
    // Get info about the user with the token. Used to get roles
    me: `${API_BASE_URL}/auth/me`,
  },
  admin: {
    addProduct: `${API_BASE_URL}/products/`, // POST
    updateProduct: `${API_BASE_URL}/products/`, // PUT + id
    deleteProduct: `${API_BASE_URL}/products/`, // DELETE + id
  },
};
