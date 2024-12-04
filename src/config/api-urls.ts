import canUsePromoCode from "@/services/api/order/canUsePromoCode";
import { API_BASE_URL } from "./environment";
import { get } from "http";

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
    register: `${API_BASE_URL}/auth/register`,
    signin: `${API_BASE_URL}/auth/login`,
    // Get info about the user with the token. Used to get roles
    me: `${API_BASE_URL}/auth/me`,
  },
  admin: {
    addProduct: `${API_BASE_URL}/products/`, // POST
    updateProduct: `${API_BASE_URL}/products/`, // PUT + id
    deleteProduct: `${API_BASE_URL}/products/`, // DELETE + id

    // Category
    addCategory: `${API_BASE_URL}/products/category`, // POST
    updateCategory: `${API_BASE_URL}/products/category`, // PUT + id
    deleteCategory: `${API_BASE_URL}/products/category`, // DELETE + id

    // Order ops
    getOrders: `${API_BASE_URL}/order/admin`, // GET
    processOrder: `${API_BASE_URL}/order/orderId/process`,
    processDelivered: `${API_BASE_URL}/order/orderId/process-delivered`,
    cancelOrder: `${API_BASE_URL}/order/orderId/cancel`,

    // User ops
    getUsers: `${API_BASE_URL}/user/search`, // GET
    deleteUser: `${API_BASE_URL}/user/`, // DELETE + id
    updateUser: `${API_BASE_URL}/user/`, // PUT + id
  },
  cart: {
    createOrder: `${API_BASE_URL}/order`, //  POST
    getPromoCodeValue: `${API_BASE_URL}/voucher/code/discount-amount`, // GET
    canUsePromoCode: `${API_BASE_URL}/voucher/code/can-use`, // GET
  },
};
