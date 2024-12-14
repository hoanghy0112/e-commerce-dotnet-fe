import { API_URLS } from "@/config/api-urls";
import axios from "axios";

export const getHomePromotions = async () => {
  return axios.get(API_URLS.product.getPromotions).then((res) => res.data);
};
