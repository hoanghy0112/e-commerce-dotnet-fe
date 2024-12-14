import axios from "axios";
import { API_URLS } from "@/config/api-urls";
import useAuthStore from "@/stores/auth.store";

export const getPromotionsFromAdmin = async () => {
  const token = useAuthStore.getState().token;
  const response = await axios.get(API_URLS.admin.getPromotionsFromAdmin, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

interface AddPromotionParams {
  name: string;
  description: string;
  image: string;
  discountPercentage: number;
  validUntil: string;
  priority: number;
  applicableProductIds: number[];
}

// Edit promotion params is the same

export const addPromotion = async (params: AddPromotionParams) => {
  const token = useAuthStore.getState().token;
  const response = await axios.post(API_URLS.admin.addPromotion, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const editPromotion = async (id: number, params: AddPromotionParams) => {
  const token = useAuthStore.getState().token;
  const response = await axios.put(
    `${API_URLS.admin.editPromotion}${id}`,
    params,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deletePromotion = async (id: number) => {
  const token = useAuthStore.getState().token;
  const response = await axios.delete(
    `${API_URLS.admin.deletePromotion}${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("deleteing promotion response", response.data);
  return response.data;
};

export const clearExpiredPromotions = async () => {
  const token = useAuthStore.getState().token;
  const response = await axios.delete(API_URLS.admin.clearExpiredPromotions, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const applyPromotion = async (promotionId: number) => {
  const token = useAuthStore.getState().token;
  const response = await axios.post(
    API_URLS.admin.applyPromotion,
    { promotionId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deactivatePromotion = async (promotionId: number) => {
  const token = useAuthStore.getState().token;
  const response = await axios.post(
    API_URLS.admin.deactivatePromotion,
    { promotionId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getActivePromotions = async () => {
  const token = useAuthStore.getState().token;
  const response = await axios.get(API_URLS.admin.getActivePromotions, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
