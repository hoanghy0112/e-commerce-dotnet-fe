import { API_URLS } from "@/config/api-urls";
import axios from "axios";

export const getSimilarProducts = async (
  productId: string
): Promise<IProduct[]> => {
  return axios
    .get(API_URLS.product.getSimilarProducts.replace("{productId}", productId))
    .then((res) => res.data);
};
